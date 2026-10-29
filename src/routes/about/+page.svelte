<script lang="ts">
	import AboutSection from '#lib/AboutSection.svelte';
</script>

<svelte:head>
	<title>About | Global Shipping Partners</title>
	<meta name="description" content="Global Shipping Partners was founded in 2011 by Jason P. Kwon in Fort Lee, NJ: an international freight forwarder and full-service logistics company." />
</svelte:head>

<h1 class="visually-hidden">About Global Shipping Partners</h1>

<section class="section padding-global first">
	<AboutSection values />
</section>

<style>
	.first { border-top: 0; }
	.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
