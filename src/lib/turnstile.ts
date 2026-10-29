// Loads Cloudflare Turnstile once and renders it explicitly, so the widget also
// appears after client-side navigation. Runs in "interaction-only" mode: invisible
// unless Cloudflare decides a visitor must click.
type Turnstile = {
	render(el: HTMLElement, options: Record<string, unknown>): string;
	reset(id: string): void;
	remove(id: string): void;
};

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

let loading: Promise<Turnstile> | undefined;

function load(): Promise<Turnstile> {
	loading ??= new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		script.async = true;
		script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject());
		script.onerror = () => {
			loading = undefined;
			reject(new Error('Turnstile failed to load'));
		};
		document.head.appendChild(script);
	});
	return loading;
}

export type TurnstileHandle = { reset(): void };

export function turnstile(sitekey: string, handle: (h: TurnstileHandle) => void) {
	return (el: HTMLElement) => {
		let id: string | undefined;
		let api: Turnstile | undefined;
		let destroyed = false;
		load()
			.then((t) => {
				if (destroyed) return;
				api = t;
				id = t.render(el, { sitekey, appearance: 'interaction-only' });
				handle({ reset: () => id && t.reset(id) });
			})
			.catch((e) => console.error(e));
		return () => {
			destroyed = true;
			if (api && id) api.remove(id);
		};
	};
}
