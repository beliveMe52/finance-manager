<template>
  <div class="app-page">
    <Loader v-if="isLoading" />
    <div v-else-if="record">
      <div>
        <div class="breadcrumb-wrap">
          <router-link to="/history" class="breadcrumb">Історія</router-link>
          <a @click.prevent class="breadcrumb">
            {{record.type === 'income' ? 'Дохід' : 'Витрати'}}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card" :class="{'red': record.type === 'outcome', 'green': record.type === 'income'}">
              <div class="card-content white-text">
                <p>Опис: {{record.description}}</p>
                <p>Сумма: {{record.count}} UAH</p>
                <p>Категорія: {{record.categoryName}}</p>

                <small>{{record.date}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Категорії з id <strong>{{$route.params.id}}</strong> не знайденно.</p>
  </div>
</template>
<script>
export default {
  name: "detail-record",
  data() {
    return {
      record: null,
      isLoading: true,
      
    };
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById',record.categoryId)
    
    this.record = {
      ...record,
      categoryName: category.title,

    }

    this.isLoading = false


  },
};
</script>
