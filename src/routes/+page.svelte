<script lang="ts">
	import AboutSection from '#lib/AboutSection.svelte';
	import ContactForm from '#lib/ContactForm.svelte';
	import hero from '#lib/assets/hero-port.jpg';
	import { site } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Global Shipping Partners | International freight forwarding, Fort Lee, NJ</title>
	<meta name="description" content="International freight forwarding from Fort Lee, New Jersey, since 2011. Call 201.351.2453 or send us a message." />
</svelte:head>

<section class="hero padding-global" style="--hero: url({hero})">
	<div class="container stack-l">
		<h1 class="h1">Simplifying logistics with great service.</h1>
		<p class="lead">International freight forwarding from Fort Lee, New Jersey, since 2011.</p>
		<div class="button-group">
			<a href="tel:{site.phone.tel}" class="button">Call {site.phone.display}</a>
			<a href="#contact" class="button is-secondary">Contact us</a>
		</div>
	</div>
</section>

<section class="section padding-global" id="about">
	<AboutSection />
</section>

<section class="section padding-global" id="contact">
	<div class="container-narrow">
		<div class="stack-s">
			<p class="label">Contact</p>
			<h2 class="h2">Contact us</h2>
			<p class="body">Use the form below for general inquiries and quotes. We reply within 24 hours. Prefer the phone? Call <a href="tel:{site.phone.tel}">{site.phone.display}</a>.</p>
		</div>
		<ContactForm {form} siteKey={data.siteKey} />
	</div>
</section>

<style>
	.hero { position: relative; padding-block: 112px 104px; text-align: center; color: #ffffff; background-color: #1b1d21; background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), var(--hero); background-size: cover; background-position: center; }
	.hero .h1 { color: #ffffff; margin-inline: auto; max-width: 40rem; }
	.hero .lead { color: rgba(255, 255, 255, 0.86); margin-inline: auto; max-width: 34rem; }
	.hero .button-group { justify-content: center; }
	.hero .is-secondary { background: rgba(255, 255, 255, 0.92); }
	.hero .is-secondary:hover { background: #ffffff; }
	@media (max-width: 767px) { .hero { padding-block: 72px 64px; } }
</style>
