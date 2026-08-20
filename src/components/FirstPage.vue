<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

interface Movie {
  title: string,
  year: string,
  plot: string
}
const movies = ref<Movie[]>([])
const newMovie = ref('')

const showMovies = ref<boolean>(false);
function toggleMovies() {
  if (movies.value.length < 1) return;
  showMovies.value = !showMovies.value;
}

const isDark = ref<boolean>(false);
function toggleTheme() {
  isDark.value = !isDark.value;
}

async function addMovie() {
  if (newMovie.value.trim() === '') return;
  // Part which I in school will look into more later
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
  if (movies.value.length >= 1 && movies.value.length < 2) {
    toggleMovies();
  }
}

watch(isDark, function (newValue) {
  document.body.className = newValue ? 'dark-mode' : 'light-mode'
}, {immediate: true});

// @ts-ignore
window.movies = movies;

</script>

<template>
  <main class="page" id="center">
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
          <li v-for="movie in movies">
            <article class="movie-card base-card">
              <p>Titel: {{ movie.title }}</p>
              <p>Release: {{ movie.year }}</p>
              <p>Plot: {{ movie.plot }}</p>
            </article>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
