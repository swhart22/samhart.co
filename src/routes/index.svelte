<script context="module">
	import {marked} from 'marked';
	import page from '../page.json';
	import Intro from '$lib/intro/Intro.svelte';
	import Featured from '$lib/projects/Featured.svelte';
	import Archive from '$lib/projects/Archive.svelte';
	import Footer from '$lib/Footer/Footer.svelte';


	
	export const prerender = true;
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-LD8Y748M5B"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-LD8Y748M5B');
	</script>
	<title>Sam Hart | Journalist</title>
</svelte:head>

<section class="intro">
	<div class='dummy-wrap'>
		<Intro header={page.header} />
	</div>
</section>

{#each page.blocks as block}
	{#if block.type === 'text'}
	<section class="text">
		{@html marked(block.text)}
	</section>
	{:else if block.type === 'project-block' && block.id === 'featured'}
	<section class="featured-projects wide">
		<Featured projects={page.projects.filter(d => d.featured === 'true')}/>
	</section>
	{:else if block.type === 'project-block' && block.id === 'archives'}
	<section class="archive-projects">
		<Archive projects={page.projects.filter(d => !d.featured || d.featured !== 'true')}/>
	</section>
	{:else if block.type === 'footer-block'}
	<section class="footer">
		<Footer block={block} />
	</section>
	{/if}
{/each}



<style lang='scss'>
	:global {
		h2 {
			color: var(--text-color);
			font-weight:700 !important;
			font-size: 2rem;
		}
	}
	section {
		max-width:800px;
		margin-left:auto;
		margin-right:auto;
		margin-bottom:3rem;
		padding:1rem;
	}
	section.wide {
		max-width:1000px;
	}
	.intro {
		padding: 0rem 1rem;
		min-height:100vh;
		display:flex;
		align-items:center;
		margin-bottom: 3rem !important;
	}
	.dummy-wrap {
		// height: 80%;
	}
	
</style>
