<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
     <router-link
         tag="li"
         active-class="active"
         class="aaaaa"
         :to="link.url"
         v-for="link of links"
         :key="link.url"
         :exact="link.exact"
         >
         {{link.title}}
      </router-link>
  </ul>  
</template>
<script>
export default {
   props: ['value'],
   data() {
      return {
         links: [
            {
               title: 'Рахунок',
               url: '/',
               exact: true,
            },
            {
               title: 'Історія',
               url: '/history',
            },
            {
               title: 'Планування',
               url: '/plaining',
            },
            {
               title: 'Новий запис',
               url: '/record',
            },
            {
               title: 'Категорії',
               url: '/categories',
            },
            {
               title: 'Test page',
               url: '/test-page'
            }
         ]
      }
   },
   
  }

</script>
