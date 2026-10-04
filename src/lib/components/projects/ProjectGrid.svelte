<script>
    let { projects } = $props();
</script>

<div class="project-grid">
    {#each projects as project}
        <a
            class="tile"
            href={project.URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.name}
        >
            {#if project.image}
                <img src="/thumbs/{project.image}" alt={project.name} loading="lazy" />
            {/if}
            <div class="overlay">
                <span class="title">{project.name}</span>
            </div>
        </a>
    {/each}
</div>

<style lang="scss">
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 0.4rem;
    }
    .tile {
        position: relative;
        display: block;
        overflow: hidden;
        border-radius: 3px;
        aspect-ratio: 16 / 10;
        background: var(--accent-light-gray);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: flex-end;
            padding: 0.75rem;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 60%);
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .title {
            color: #fff;
            font-weight: 700;
            font-size: 1rem;
            line-height: 1.2;
        }

        &:hover .overlay,
        &:focus-visible .overlay {
            opacity: 1;
        }
    }

    @media screen and (max-width: 500px) {
        .project-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
</style>
