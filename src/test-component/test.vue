<template>
   <div>
      <div class="title center">
         Test page for learning! :)
      </div>
      <ul>
         <router-link tag="li" exact-active-class="red" to='/test-page/comp1' aria-current-value="page">Ссилка 1</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=2' aria-current-value="page">Ссилка 2</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=3' aria-current-value="step">Ссилка 3</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=4' aria-current-value="step">Ссилка 4</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=5' aria-current-value="location">Ссилка 5</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=6' aria-current-value="date">Ссилка 6</router-link>
         <router-link tag="li" exact-active-class="red" to='/test-page?id=7' aria-current-value="time">Ссилка 7</router-link>
      </ul>
      <router-view></router-view>
   </div>
</template>
<script>
export default {
   
}
</script>
<style>

</style>