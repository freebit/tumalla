<svelte:window on:popstate={ handlerBackNavigation }/>
<div class="app">
  <!-- <header>
    <RouterLink page={{ path: '/', name: 'Home' }}/>
    <RouterLink page={{ path: '/#/admin', name: 'Auth' }}/>
  </header> -->
  <main>
    <svelte:component this={router[$curRoute]}/>
  </main>
  <footer></footer>
</div>

<script>
  import router, { curRoute } from './router'
  import RouterLink from './components/RouterLink.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    const path = `${window.location.pathname}${window.location.hash}`
    curRoute.set(path)

    if (!history.state) {
      window.history.replaceState({ path: path }, '', window.location.href)
    }
  })

  function handlerBackNavigation(evt) {
    curRoute.set(evt.state.path)
  }
</script>

<style>
  .app {
    position: relative;
    height: 100vh;
  }
	main {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 100%;
		margin: 0 auto;
	}

	h2 {
    margin: 0;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>