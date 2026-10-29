// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}

	// Set in Cloudflare Pages (Settings > Variables and Secrets), not in wrangler.jsonc.
	interface Env {
		TURNSTILE_SITE_KEY?: string;
		TURNSTILE_SECRET_KEY?: string;
		RESEND_API_KEY?: string;
		/** Comma-separated inbox(es) that receive form messages. */
		CONTACT_TO?: string;
		/** Sender on a domain verified in Resend, e.g. "GSP website <website@gspforwarding.com>". */
		CONTACT_FROM?: string;
	}
}

export {};
