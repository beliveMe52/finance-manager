<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    
  </div>
</template>
<script>
import MainLayout from './layouts/Main-layout'
import EmptyLayout from './layouts/Empty-layout'
export default {
  computed: { 
    layout() { 
      return `${(this.$route.meta.layout || 'empty')}-layout`
    },
  },
  components: {
      MainLayout,
      EmptyLayout
    }
}
</script>
<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
