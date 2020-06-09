<template>
  <div class="app-page">
    <Loader v-if="isLoading"/>
    <div v-else>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <div class="row">

        <HomeBill
          :rates='currency.rates'
        />

        <HomeCurrency 
          :rates='currency.rates'
          :date='currency.date'
        />
        
      </div>
    </div>
  </div>
</template>
<script>
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'

export default {
  data() {
    return {
      isLoading: true,
      currency: null,
    }
  },

  components: {
    HomeBill, HomeCurrency
  },
  methods: {
    async refresh() {
      this.isLoading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.isLoading = false
    }
  },  
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.isLoading = false
    
  }
}
</script>