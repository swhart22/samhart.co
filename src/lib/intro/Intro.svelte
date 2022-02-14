<script>
    import {marked} from 'marked';
    // import Fa from 'svelte-fa/src/fa.svelte';
    // import solid from '@fortawesome/free-solid-svg-icons';
    // import { faHandPointRight, faHandPointDown } from '@fortawesome/free-regular-svg-icons';
    // import brands from '@fortawesome/free-brands-svg-icons';
    import Icon from '@iconify/svelte';


    export let header;

</script>
<h1>{header.text}</h1>
<p class="title"><span>{header.title}</span></p>
<p class="bio">{@html marked.parseInline(header.bio)}</p>
<p class="contact">
    <a href="mailto:s.w.hart22@gmail.com">
        <Icon size="2x" icon="fa-solid:at" />
    </a>
    <a href="https://www.linkedin.com/in/sam-hart-ab065376/" target="_blank">
        <Icon size="2x"  icon="fa-brands:linkedin" />
    </a>
    <a href="https://twitter.com/heysamhart" target="_blank">
        <Icon size="2x"  icon="fa-brands:twitter" />
    </a>
</p>

<style lang='scss'>

    @media screen and (max-width: 500px) {
        h1 {
            font-size:4.5rem !important;
        }
    }
   
    h1 {
        font-family: var(--font-serif);
        font-size:6rem;
        font-weight: 900;
        margin:0;
        text-align:left;
        line-height:1;
        margin-bottom:1.5rem;
    }
    a {
        margin-right:0.5rem;
    }
    .title, .bio {
        /* text-align: center; */
    }
    .title {
        text-transform: uppercase;
        /* font-weight:700; */
        font-size: 1rem;
        margin-bottom:3rem;
        line-height:1;
        color: var(--accent-mid-gray);
        letter-spacing: 0.5px;
        span{
            border-top: 2px solid var(--accent-dark-blue);
            padding-top: 0.25rem;
        }
        
    }
    .bio {
        font-weight:400;
        font-size:1.6rem;
        margin-bottom: 3rem;
    }
</style>
