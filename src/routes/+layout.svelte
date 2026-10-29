<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { nav, site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: site.name,
		url: site.url,
		foundingDate: String(site.founded),
		telephone: site.phone.tel,
		founder: { '@type': 'Person', name: 'Jason P. Kwon', jobTitle: 'President and CEO' },
		location: site.offices.map((o) => ({
			'@type': 'LocalBusiness',
			name: `${site.name} (${o.locality})`,
			telephone: o.phone.tel,
			address: {
				'@type': 'PostalAddress',
				streetAddress: o.street,
				addressLocality: o.locality,
				addressRegion: o.region,
				postalCode: o.postalCode,
				addressCountry: 'US'
			}
		}))
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
	{@html `<script type="application/ld+json">${jsonLd.replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<header class="banner padding-global">
	<div class="container banner_inner">
		<a class="banner_name" href="/">{site.name}</a>
		<nav aria-label="Main">
			<ul class="nav">
				{#each nav as item (item.href)}
					<li><a href={item.href} aria-current={page.url.pathname === item.href ? 'page' : undefined}>{item.label}</a></li>
				{/each}
			</ul>
		</nav>
		<span class="banner_contact">Call <a href="tel:{site.phone.tel}">{site.phone.display}</a></span>
	</div>
</header>

<main>
	{@render children()}
</main>

<footer class="footer padding-global">
	<div class="container">
		<div class="footer_offices">
			{#each site.offices as office (office.city)}
				<div class="office">
					<h2 class="h3">{office.city}</h2>
					<dl>
						<dt>Address</dt>
						<dd>{office.street}<br />{office.locality}, {office.region} {office.postalCode}</dd>
						<dt>Phone</dt>
						<dd><a href="tel:{office.phone.tel}">{office.phone.display}</a></dd>
					</dl>
				</div>
			{/each}
		</div>
		<div class="footer_bottom">
			<span>© {new Date().getFullYear()} {site.name}</span>
		</div>
	</div>
</footer>

<style>
	.banner { background: var(--color-surface); border-bottom: 1px solid var(--color-line); font-size: 14px; }
	.banner_inner { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 6px 24px; min-height: 52px; padding-block: 10px; }
	.banner_name { color: var(--color-black); text-decoration: none; }
	.nav { display: flex; flex-wrap: wrap; gap: 4px 20px; list-style: none; margin: 0; padding: 0; }
	.nav a { color: var(--color-text); text-decoration: none; }
	.nav a:hover, .nav a[aria-current='page'] { color: var(--color-black); text-decoration: underline; text-decoration-color: var(--color-black); }
	.banner_contact { color: var(--color-meta); font-variant-numeric: tabular-nums; }
	.banner_contact a { color: var(--color-black); text-decoration: none; }
	.banner_contact a:hover { text-decoration: underline; }

	.footer { border-top: 1px solid var(--color-line); background: var(--color-surface); font-size: 14px; }
	.footer_offices { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding-block: 48px 32px; }
	.office dl { display: grid; grid-template-columns: 4rem minmax(0, 1fr); gap: 4px 12px; margin: 10px 0 0; color: var(--color-text); font-variant-numeric: tabular-nums; }
	.office dt { color: var(--color-meta); font-size: 13px; padding-top: 1px; }
	.office dd { margin: 0; }
	.footer_bottom { border-top: 1px solid var(--color-line); padding-block: 18px 28px; color: var(--color-meta); font-size: 13px; }
	@media (max-width: 767px) { .footer_offices { grid-template-columns: 1fr; gap: 28px; } }
</style>
