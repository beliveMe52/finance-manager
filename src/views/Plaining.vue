<template>
  <div class="app-page">
    <Loader v-if="isLoader"/>
    <!-- <p class="center" v-else-if="!categories.length">
      Котегорій поки що немає. Щоб створити категорію перейдіть
      <router-link to="/categories">СЮДИ</router-link>
    </p> -->
    <div v-else>
      <div class="page-title">
        <h3>Планування </h3>
        <h4>{{this.info.account}} UAH</h4>
      </div>

      <section>
        <div v-for="item of categories" :key="item.id">
          <p>
            <strong>{{item.title}}:</strong>
            {{item.spend}} UAH з {{item.limit}} UAH
          </p>
          <div class="progress" v-tooltip="item.tooltip">
            <div 
            class="determinate" 
            :class="[item.colorProgress]"
            :style="{width: item.progressPercent + '%'}"

            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'plaining',
  data() {
    return {
      isLoader: true,
      categories: [],

    }
  },
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const category = await this.$store.dispatch('fetchCategory');
    this.categories = category.map(key => {
      const spend = records
      .filter(r => r.categoryId === key.id)
      .filter(r => r.type === 'outcome')
      .reduce((total,record) => {
        return total += record.count
      }, 0)
      const percent = 100 * spend / key.limit
      const progressPercent = percent > 100 ? 100 : percent 
      const colorProgress = (percent < 60) ? 'green' : (percent < 100) ? 'yellow' : 'red'
      const tooltipValue = key.limit - spend
      const tooltip = `${ tooltipValue < 0 ? 'Перевищення на ' : 'Залишилось '} ${Math.abs(tooltipValue)} UAH`

      return {
        ...key, 
        progressPercent,
        colorProgress,
        spend,
        tooltip
      }
    })
    this.isLoader = false
  }
   
  
}
</script>
