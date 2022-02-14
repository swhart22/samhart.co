<script>
    import {marked} from 'marked';
    import Icon from '@iconify/svelte';
    // import Fa from 'svelte-fa/src/fa.svelte';
    // import solid from '@fortawesome/free-solid-svg-icons';
    // // import { faHandPointRight, faHandPointDown } from '@fortawesome/free-regular-svg-icons';
    // import brands from '@fortawesome/free-brands-svg-icons';

    // import FaLinkedin from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg';
    export let block;
</script>

{@html marked(block.text)}
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
    <!-- <a href="mailto:s.w.hart22@gmail.com">
        <Fa size="2x" icon={solid.faAt} />
    </a>
    <a href="https://www.linkedin.com/in/sam-hart-ab065376/" target="_blank">
        <Fa size="2x"  icon={brands.faLinkedin} />
    </a>
    <a href="https://twitter.com/heysamhart" target="_blank">
        <Fa size="2x"  icon={brands.faTwitter} />
    </a> -->
</p>

<style lang='scss'>
    a {
        margin-right:0.5rem;
    }
    .contact {
        margin-top:1.5rem;
    }
</style>