<script>
    import {marked} from 'marked';
    export let header;

</script>
<h1>{header.text}</h1>
<p class="title">{header.title}</p>
<p class="bio">{@html marked.parseInline(header.bio)}</p>
<style>
    p{
        margin:0;
    }
    h1 {
        font-family: var(--font-family-sans-serif);
        font-size:6rem;
        font-weight: 900;
        margin:0;
        text-align:left;
        line-height:1;
        margin-bottom:1.5rem;
    }
    .title, .bio {
        /* text-align: center; */
    }
    .title {
        text-transform: uppercase;
        font-weight:700;
        font-size: 1rem;
        margin-bottom:3rem;
        line-height:1;
        /* color: var(--accent-mid-blue); */
    }
    .bio {
        font-weight:400;
        font-size:1.6rem;
    }
</style>
