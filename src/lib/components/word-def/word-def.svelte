<script lang="ts">
    import type { WordDefinition } from "$lib/types"

    export let wordDefinition: WordDefinition = {}
    let clazz = ""
    export { clazz as class }
</script>

<article class="{clazz} w-full bg-sand-300 px-2 shadow-md shadow-black rounded">
    <table>
        <tr>
            <td class="italic align-top text-left">
                {wordDefinition.partOfSpeech}
            </td>

            <td>
                {wordDefinition.definition}
            </td>
        </tr>
        {#if wordDefinition?.synonyms?.length}
            <tr>
                <th class="align-top text-left"> synonyms: </th>

                <td>
                    {#each wordDefinition.synonyms as synonym (synonym)}
                        <i>
                            {synonym}
                        </i>
                    {/each}
                </td>
            </tr>
        {/if}

        {#if wordDefinition?.derivation?.length}
            <tr>
                <th class="align-top text-left"> derivation: </th>

                <td>
                    {#each wordDefinition.derivation as deriv (deriv)}
                        <i>
                            {deriv}
                        </i>
                    {/each}
                </td>
            </tr>
        {/if}
    </table>
</article>
