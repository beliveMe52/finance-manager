<template>
  <div>
    <loader v-if="isLoader"/>
    <div v-else>
      <div class="page-title" >
      <h3>Категорії</h3>
    </div>
    <section>
      <div class="row">

        <CreateCategory  @created="addNewCategory"/>

        <ChangeCategory 
          :categories="categories"
          @updated="updatedCategories"
        />

      </div>
    </section>
    </div>
  </div>
</template>
<script>
import ChangeCategory from '@/components/categories/ChangeCategory'
import CreateCategory from '@/components/categories/CreateCategory'

export default {
  components: {ChangeCategory,CreateCategory},
  data() {
    return {
      categories: [],
      isLoader: true,
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    },
    updatedCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit

    }
  },
  async mounted() {
   this.categories = await this.$store.dispatch('fetchCategory');

   console.log(this.categories)
   if(this.categories)
   this.isLoader = false
  },
}
</script>
