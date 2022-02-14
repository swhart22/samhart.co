<script>
import { marked } from "marked";

export let projects;

</script>

<div class="featured-project-flex">
    {#each projects as project}
    <div class="featured-project">
        {#if project.image}
        <div class="img-wrap">
            <a href="{project.URL}" target="_blank">
                <img src="thumbs/{project.image}" alt="{project.description}">
            </a>
        </div>
        {/if}
        <div class="text-wrap">
            <h3> {project.name}</h3>
            {@html marked(project.description)}
        </div>
    </div>
    {/each}
</div>

<style lang='scss'>
    :global {
        .featured-project, .top-featured-project {
            p {
                font-size: 1.2rem !important;
            }
        }
    }
    // .featured-project-flex {
    //     display:flex;
    //     flex-wrap:wrap;
    // }
    .featured-project{
        width:100%;
        display:flex;
        flex-wrap: wrap;
        align-items:center;
        margin-bottom:2rem;
       .img-wrap {
           width:60%;
           margin-right:2rem;
           a {
               width:100%;
                img {
                    width:100%;
                }
           } 
       }
       .text-wrap {
           width: 35%;
       }
       
    }  
    h3 {
        font-size:1.5rem;
    }
    img {
        filter: drop-shadow(2px 2px 2px var(--accent-mid-gray));
        border-radius:2px;
        margin-bottom:1rem;
    }
    @media screen and (max-width: 700px) {
        .featured-project {
            margin-bottom: 4rem;
            .img-wrap {
                width:auto;
                max-width: 400px;
                margin-left:auto;
                margin-right:auto;
            }
            .text-wrap {
                width:100%;
            }
        }
        
    }
</style>