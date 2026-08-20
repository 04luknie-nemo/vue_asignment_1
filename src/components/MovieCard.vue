<script setup lang="ts">

interface Movie {
    title: string,
    year: string,
    plot: string
}

const props = defineProps({
    movie: {
        type: Object as () => Movie,
        required: true
    }
})
</script>
<template>
    <article class="movie-card base-card">
        <p>Titel: {{ movie.title }}</p>
        <p>Release: {{ movie.year }}</p>
        <p>Plot: {{ movie.plot }}</p>
    </article>
</template>