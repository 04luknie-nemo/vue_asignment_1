<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

interface Movie {
  title: string,
  year: string,
  plot: string
}
const movies = ref<Movie[]>([])
const newMovie = ref('')

async function addMovie() {
  if (newMovie.value.trim() === '') return;
  const response = await fetch(`https://www.omdbapi.com/?apikey=5be74358&t=${newMovie.value}`);
  const data = await response.json();

  if (data.response === 'False') {
    console.log('Filmen hittades inte');
  }
  movies.value.push({
    title: data.Title,
    year: data.Year,
    plot: data.Plot
  })
  newMovie.value = ''
}
// @ts-ignore
window.movies = movies;

</script>

<template>
  <section id="center">
    <article>
      <button type="button" class="counter" @click="count++">
        Count is {{ count }}
      </button>
      <form @submit.prevent="addMovie">
        <h2>Lägg Till Film</h2>
        <div>
          <input v-model="newMovie" placeholder="Skriv här">
          <button type="submit">Lägg Till</button>
        </div>  
      </form>
    </article>
  </section>
</template>
