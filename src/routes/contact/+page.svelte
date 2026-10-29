<script lang="ts">
	import ContactForm from '#lib/ContactForm.svelte';
	import { site } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Contact | Global Shipping Partners</title>
	<meta name="description" content="Contact Global Shipping Partners in Fort Lee, NJ and Schaumburg, IL. Call 201.351.2453 or send a message; we reply within 24 hours." />
</svelte:head>

<section class="section padding-global first">
	<div class="container-narrow">
		<div class="stack-s">
			<p class="label">Contact</p>
			<h1 class="h2">Contact us</h1>
			<p class="body">Use the form below for general inquiries and quotes. We reply within 24 hours. Prefer the phone? Call <a href="tel:{site.phone.tel}">{site.phone.display}</a>.</p>
		</div>
		<ContactForm {form} siteKey={data.siteKey} />
	</div>
</section>

<style>
	.first { border-top: 0; }
</style>
