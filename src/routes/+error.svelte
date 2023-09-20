<script lang="ts">
    import { page } from "$app/stores"
</script>

<section>
    <div>
        <h1>{$page.status}</h1>
        <p>{$page.error.message}</p>
        <p>go <a href="/">home</a></p>
    </div>
</section>
