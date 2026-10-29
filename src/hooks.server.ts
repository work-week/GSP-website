import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';

// 301s from old WordPress URLs that are indexed or linked, so nothing breaks at cutover.
// See research/2026-10-19-current-site-audit.md and project/scope.md in the knowledge base.
const OLD_URLS: Record<string, string> = {
	'/contact-2-2': '/contact',
	'/request-a-quote': '/contact',
	'/services': '/',
	'/freight-forwarding': '/'
};

export const handle: Handle = ({ event, resolve }) => {
	const path = event.url.pathname.replace(/\/+$/, '') || '/';
	const target = OLD_URLS[path.toLowerCase()];
	if (target) redirect(301, target);
	return resolve(event);
};
