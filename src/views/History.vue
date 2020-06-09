<template>
  <div class="app-page">
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!records.length">
      Записів поки що немає. Щоб створити запис перейдіть
      <router-link to="/record">СЮДИ</router-link>
    </p>
    <div v-else>
      <div class="page-title">
        <h3>Історія записів</h3>
      </div>
      <Pie :dataPie="dataPie" />
      <section>
        <HistoryTable :records="items" />
      </section>
      <Paginate
        :page-count="pageCount"
        :click-handler="changePageHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        class="center"
      />
    </div>
  </div>
</template>
<script>
import HistoryTable from "@/components/history/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import Pie from "@/components/history/HistoryPai"
export default {
  name: "HIstory",
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    Pie
  },
  data() {
    return {
      isLoading: true,
      records: [],
      categories: [],
      dataPie: null,
    };
  },

  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategory");
    this.dataPie = this.getPieData(this.records,this.categories)
    this.setup(this.categories);
    
    this.isLoading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((key) => key.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Дохід" : "Витрата",
          };
        })
      );

    },
    getPieData(records,categories) {
      return {
          labels: categories.map(key => key.title),
          datasets: [
            {
              label: "Витрати по категоріям",
              data: this.categories.map(key => {
                return records.reduce((total, record) => {
                  if(record.categoryId === key.id && record.type === 'outcome') {
                    total += +record.count
                  }
                  return total
                },0)
          }),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            }
          ]
        }
    }
  }
};
</script>
