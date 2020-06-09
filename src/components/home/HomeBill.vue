<template>
   <div>
      <div class="col s12 m6 l4">
          <div class="card light-blue bill-card">
            <div class="card-content white-text">
              <span class="card-title">Рахуннок у валюті</span>

              <p class="currency-line" v-for="item of currencies" :key="item">
                <span>{{getCurrency(item)}} {{item}}</span>
              </p>
            </div>
          </div>
        </div>
   </div>
</template>
<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['UAH','EUR','USD']
    }
  },
  computed: {
    base() {
      return this.$store.getters.info.account / (this.rates['UAH'] / this.rates['EUR'])
    },

  },
  
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>