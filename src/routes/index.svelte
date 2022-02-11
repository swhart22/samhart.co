<script context="module">
	import {marked} from 'marked';
	import page from '../page.json';
	import Intro from '$lib/intro/Intro.svelte';

	console.log(page);

	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="intro">
	<Intro header={page.header} />
</section>
<section>
	
</section>

<style>
	.intro {
		max-width:800px;
		margin-left:auto;
		margin-right:auto;
		/* margin-top: 14rem; */
		padding: 12rem 1rem;
	}
	
</style>
