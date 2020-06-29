<a href={ page.path } on:click|preventDefault={ redirectTo }>{ page.name }</a>

<script>
  import { curRoute } from '../router'

  export let page = {
    path: '/#/home',
    name: 'home'
  }

  function redirectTo(evt) {
    curRoute.set(event.target.pathname + evt.target.hash)
    console.log('event pathname', evt.target.hash)
    window.history.pushState({ path: page.path }, '', `${window.location.origin}${page.path}`)
  }
</script>