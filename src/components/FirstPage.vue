<script setup lang="ts">
import { ref, watch } from 'vue'
import MovieCard from './MovieCard.vue'

interface Movie {
  id: number,
  title: string,
  year: string,
  plot: string,
}
const count = ref(0)
const movies = ref<Movie[]>([])
const newMovie = ref<string>('')
const showMovies = ref<boolean>(false);
const isDark = ref<boolean>(false);
const latestAdded = ref<number|null>(null);

async function addMovie() {
  if (newMovie.value.trim() === '') return;
  // Part which I in school will look into more later
  const response = await fetch(`https://www.omdbapi.com/?apikey=5be74358&t=${newMovie.value}`);
  const data = await response.json();
  const newId = Date.now();

  if (data.response === 'False') {
    console.log('Filmen hittades inte');
  }
  movies.value.push({
    id: newId,
    title: data.Title,
    year: data.Year,
    plot: data.Plot,
  });
  latestAdded.value = newId;
  newMovie.value = ''
  if (movies.value.length >= 1 && movies.value.length < 2) {
    toggleMovies();
  }
}
function toggleMovies() {
  if (movies.value.length < 1) return;
  showMovies.value = !showMovies.value;
}
function toggleTheme(): void {
  isDark.value = !isDark.value;
}
// Också avancerat
watch(isDark, function (newValue: boolean) {
  document.body.className = newValue ? 'dark-mode' : 'light-mode'
}, {immediate: true});
//
// @ts-ignore
window.movies = movies;

</script>

<template>
  <main class="page" id="center">
    <nav>    
      <RouterLink to="/second_page">Andra Sidan</RouterLink>
    </nav>
    <section class="base-card">
      <div>
        <h2>Lägg Till Film</h2>
        <button @click="toggleTheme">{{ isDark ? 'Ljust Läge' : 'Mörkt Läge' }}</button>
      </div>
      <form @submit.prevent="addMovie">
        <div>
          <input v-model="newMovie" placeholder="Skriv här">
          <button type="submit">Lägg Till</button>
        </div>  
      </form>
      <button type="button" class="counter" @click="count++">
        Count is {{ count }}
      </button>
    </section>
    <section class="lower-section base-card">
      <button @click="toggleMovies">Visa/Dölj Filmer</button>
      <div v-if="showMovies">
        <h2>Tillagda Filmer</h2>
        <ul>
          <li v-for="movie in movies" v-bind:key="movie.title" v-bind:class="{newest: movie.id === latestAdded}">
            <MovieCard v-bind:movie="movie"/>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
