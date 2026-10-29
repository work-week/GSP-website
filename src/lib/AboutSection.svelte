<script lang="ts">
	// Corporate profile and mission from the live site's About page; founder facts from
	// Jason's profile (client/people.md in the knowledge base).
	let { values = false }: { values?: boolean } = $props();
</script>

<div class="container about_layout">
	<div class="about_col">
		<p class="label">About us</p>
		<h2 class="h2">Corporate profile</h2>
		<p class="body">Global Shipping Partners was founded in 2011. We began as an international freight forwarder and customs broker and have grown into a full-service logistics company, headquartered in Fort Lee, New Jersey, with a worldwide network of agents serving exporters and importers.</p>
		<h3 class="h3" style="padding-top:10px">Our mission</h3>
		<p class="body">To provide top-quality logistics services and the highest customer satisfaction, through attention to detail, creative solutions, teamwork, clear communication and integrity in everything we do.</p>
		{#if values}
			<h3 class="h3" style="padding-top:10px">Our values</h3>
			<p class="body">Honesty, urgency, experience and integrity.</p>
		{/if}
		<blockquote class="quote">"I know our product is in good hands when Jason Kwon at GSP arranges our freight."<br /><span class="small">Joan Bevis</span></blockquote>
	</div>
	<div class="about_col founder">
		<p class="label">Founder</p>
		<h2 class="h2">Jason P. Kwon</h2>
		<p class="small">President and CEO</p>
		<p class="body">Jason founded Global Shipping Partners in 2011 after more than two decades in international sales and shipping. He is known for close client relationships, and much of GSP's business comes through referrals from clients and agents.</p>
		<ul class="founder_list">
			<li>20+ years in international sales and shipping</li>
			<li>5+ years in logistics for U.S. food and technology suppliers before GSP</li>
			<li>B.A. International Business, North Central College, Naperville, IL</li>
			<li>Speaks English, Korean and Japanese</li>
		</ul>
	</div>
</div>
