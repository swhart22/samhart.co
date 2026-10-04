<script>
	import Intro from '#lib/components/intro/Intro.svelte';
    import Footer from '#lib/components/footer/Footer.svelte';
    import ProjectGrid from '#lib/components/projects/ProjectGrid.svelte';
    let { data } = $props();

    const page = data;

	export const prerender = true;
</script>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-PT9P5BESZP"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-PT9P5BESZP');
	</script>
	<title>Sam Hart | Journalist</title>
</svelte:head>

<section class="intro">
	<div class='dummy-wrap'>
		<Intro header={page.header} />
	</div>
</section>

{#each page.blocks as block}
    {#if block.type === 'project-block' && block.id === 'featured'}
    <section class="featured-projects wide">
        <ProjectGrid projects={page.projects}/>
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
		/* height: 80%; */
	}
	
</style>