
<template>
  <h1>Home page</h1>
  <button on:click={clickHandler}>fetch slides</button>
</template>

<script>
  import { onDestroy } from 'svelte'
  import api from '../api'

  onDestroy(() => {})

  async function clickHandler() {
    const response = await api.slides.get()
    const { data } = await response.json();
    console.log('slides get -', data)
  }
</script>

<style>
  code {
    color: cadetblue;
  }
</style>