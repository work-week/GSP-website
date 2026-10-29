<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ContactErrors, ContactValues } from '#lib/server/contact.ts';
	import { turnstile, type TurnstileHandle } from '#lib/turnstile.ts';

	type FormResult = { sent?: boolean; values?: ContactValues; errors?: ContactErrors } | null;

	let { form, siteKey }: { form: FormResult; siteKey: string } = $props();

	let sending = $state(false);
	let widget: TurnstileHandle | undefined;

	const values = $derived(form?.values);
	const errors = $derived(form?.errors ?? {});
</script>

{#if form?.sent}
	<p class="form_success" role="status">Thanks, your message was sent. We reply within 24 hours.</p>
{:else}
	<form
		class="form"
		method="POST"
		novalidate
		use:enhance={() => {
			sending = true;
			return async ({ update }) => {
				await update();
				sending = false;
				widget?.reset();
			};
		}}
	>
		<div class="form_field">
			<label class="form_label" for="f-name">Name <span class="req">*</span></label>
			<input class="form_input" class:is-error={errors.name} id="f-name" name="name" autocomplete="name" required maxlength="200" value={values?.name ?? ''} aria-describedby={errors.name ? 'f-name-error' : undefined} />
			{#if errors.name}<span class="form_error" id="f-name-error">{errors.name}</span>{/if}
		</div>
		<div class="form_field">
			<label class="form_label" for="f-email">Email <span class="req">*</span></label>
			<input class="form_input" class:is-error={errors.email} id="f-email" name="email" type="email" autocomplete="email" required maxlength="320" value={values?.email ?? ''} aria-describedby={errors.email ? 'f-email-error' : undefined} />
			{#if errors.email}<span class="form_error" id="f-email-error">{errors.email}</span>{/if}
		</div>
		<div class="form_field">
			<label class="form_label" for="f-subject">Subject <span class="req">*</span></label>
			<input class="form_input" class:is-error={errors.subject} id="f-subject" name="subject" autocomplete="off" required maxlength="200" value={values?.subject ?? ''} aria-describedby={errors.subject ? 'f-subject-error' : undefined} />
			{#if errors.subject}<span class="form_error" id="f-subject-error">{errors.subject}</span>{/if}
		</div>
		<div class="form_field">
			<label class="form_label" for="f-msg">Message <span class="req">*</span></label>
			<textarea class="form_input" class:is-error={errors.message} id="f-msg" name="message" required maxlength="5000" placeholder="For a quote: what you're shipping, from where to where, and when it's ready" value={values?.message ?? ''} aria-describedby={errors.message ? 'f-msg-error' : undefined}></textarea>
			{#if errors.message}<span class="form_error" id="f-msg-error">{errors.message}</span>{/if}
		</div>
		<div class="form_foot">
			<div {@attach turnstile(siteKey, (h) => (widget = h))}></div>
			{#if errors.form}<p class="form_error" role="alert">{errors.form}</p>{/if}
			<button type="submit" class="button is-primary is-full" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
		</div>
	</form>
{/if}
