<script lang="ts">
	// The company profile still lives on the old WordPress site; move it into
	// static/resources/ before the domain switches over, or this link breaks.
	const resources = [
		{
			title: 'Company profile',
			description: 'Who we are, our services and our offices.',
			href: 'https://gspforwarding.com/wp-content/uploads/2025/12/GSP-Profile-2025.pdf'
		},
		{
			title: 'Container specifications',
			description: 'Dimensions, weights and capacity for 20′, 40′ and 45′ containers.',
			href: '/resources/gsp-container-specifications.pdf'
		}
	];
</script>

<svelte:head>
	<title>Resources | Global Shipping Partners</title>
	<meta name="description" content="Downloads from Global Shipping Partners: company profile and container specifications (PDF)." />
</svelte:head>

<section class="section padding-global first">
	<div class="container-narrow">
		<div class="stack-s">
			<p class="label">Resources</p>
			<h1 class="h2">Resources</h1>
		</div>
		<ul class="list">
			{#each resources as r (r.href)}
				<li>
					<a href={r.href} class="h3">{r.title}</a>
					<span class="small">PDF</span>
					<p class="body">{r.description}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.first { border-top: 0; }
	.list { list-style: none; margin: 28px 0 0; padding: 0; border-top: 1px solid var(--color-line); }
	.list li { padding: 16px 0; border-bottom: 1px solid var(--color-line); }
	.list .small { margin-left: 8px; }
	.list .body { margin-top: 4px; }
</style>
