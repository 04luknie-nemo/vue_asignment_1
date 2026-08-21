<script setup lang="ts">
import { KeepAlive } from 'vue';
</script>

<template>
  <nav>
    <RouterView v-slot="{Component}">
      <KeepAlive include="MovieList">
        <component :is="Component"/>
      </KeepAlive>
    </RouterView>
  </nav>
</template>