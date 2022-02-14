<script>
    export let projects;
</script>

{#each projects as project}
<div class="archive-project">
    {#if project.image}
        <div class="img-wrap">
            <img class="small-thumb" src="thumbs/{project.image}" alt="{project.description}">
        </div>
    {/if}
    <p class="project-title">
        <a href="{project.URL}" target="_blank">{project.name}</a>
    </p>
</div>
{/each}

<style lang='scss'>
    .archive-project {
        display:flex;
        align-items: center;
        // margin-bottom: 1rem;
        border-top: 1px solid var(--accent-light-gray);
    }
    .img-wrap {
        width:200px;
        margin-right:2rem;
    }
    .small-thumb {
        height: 100px;
        
    }
    .project-title {
        font-weight:700;
        font-size:1.1rem;
    }
    @media screen and (max-width: 700px) {
        .small-thumb {
            height:75px;
        }
        .img-wrap {
            width:150px;
            margin-right:1rem;
        }
        .project-title {
            font-size: 1rem;
            width: calc(100vw - 150px - 1rem);
        }
    }
   
</style>