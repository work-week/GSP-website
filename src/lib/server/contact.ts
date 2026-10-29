import { fail, type RequestEvent } from '@sveltejs/kit';

// Cloudflare's published Turnstile test keys (always pass). Used only when no real
// keys are configured, so local dev and unconfigured previews still work.
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TEST_SITE_KEY = '1x00000000000000000000AA';
const TEST_SECRET_KEY = '1x0000000000000000000000000000000AA';

export type ContactValues = { name: string; email: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues | 'form', string>>;

const LIMITS: Record<keyof ContactValues, number> = {
	name: 200,
	email: 320,
	subject: 200,
	message: 5000
};

export function turnstileSiteKey(platform: App.Platform | undefined): string {
	return platform?.env.TURNSTILE_SITE_KEY || TEST_SITE_KEY;
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
	const body = new FormData();
	body.append('secret', secret);
	body.append('response', token);
	if (ip) body.append('remoteip', ip);
	try {
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body
		});
		if (!res.ok) return false;
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch (e) {
		console.error('Turnstile verify failed', e);
		return false;
	}
}

type Mail = { apiKey: string; from: string; to: string };

async function sendEmail(mail: Mail, values: ContactValues): Promise<boolean> {
	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${mail.apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: mail.from,
				to: mail.to.split(',').map((a) => a.trim()),
				reply_to: values.email,
				subject: `Website inquiry: ${values.subject}`,
				text: `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}\n`
			})
		});
		if (!res.ok) console.error('Resend error', res.status, await res.text());
		return res.ok;
	} catch (e) {
		console.error('Resend request failed', e);
		return false;
	}
}

export async function sendContact({ request, platform, getClientAddress }: RequestEvent) {
	const data = await request.formData();
	const values: ContactValues = {
		name: String(data.get('name') ?? '').trim(),
		email: String(data.get('email') ?? '').trim(),
		subject: String(data.get('subject') ?? '').trim(),
		message: String(data.get('message') ?? '').trim()
	};

	const errors: ContactErrors = {};
	if (!values.name) errors.name = 'Add your name.';
	if (!values.email) errors.email = 'Add your email so we can reply.';
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Check your email address.';
	if (!values.subject) errors.subject = 'Add a subject.';
	if (!values.message) errors.message = 'Add a message.';
	for (const key of Object.keys(LIMITS) as (keyof ContactValues)[]) {
		if (values[key].length > LIMITS[key]) errors[key] = 'This is too long.';
	}
	if (Object.keys(errors).length) return fail(400, { values, errors });

	const env = platform?.env;
	const secret = env?.TURNSTILE_SECRET_KEY || TEST_SECRET_KEY;
	const token = String(data.get('cf-turnstile-response') ?? '');
	let ip: string | null = request.headers.get('CF-Connecting-IP');
	if (!ip) {
		try {
			ip = getClientAddress();
		} catch {
			ip = null;
		}
	}
	if (!token || !(await verifyTurnstile(token, secret, ip))) {
		return fail(400, {
			values,
			errors: { form: 'We could not confirm you are not a robot. Please try again.' } as ContactErrors
		});
	}

	if (!env?.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
		console.error('Contact form is not configured: set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM.');
		return fail(503, {
			values,
			errors: { form: 'Sorry, the form is not working right now. Please call us instead.' } as ContactErrors
		});
	}
	const mail = { apiKey: env.RESEND_API_KEY, from: env.CONTACT_FROM, to: env.CONTACT_TO };
	if (!(await sendEmail(mail, values))) {
		return fail(502, {
			values,
			errors: { form: 'Sorry, your message did not go through. Please try again or call us.' } as ContactErrors
		});
	}

	return { sent: true };
}
