import _ from 'lodash'

export default {
   data() {
      return {
         page: +this.$route.query.page || 1,
         pageSize: 4,
         pageCount: 0,
         allItems: [],
         items: [],
      }
   },
   methods: {
      changePageHandler(page) {
         this.$router.push(`${this.$route.path}?page=${page}`)
         this.items = this.allItems[page] || this.allItems[0]
      },

      setupPagination(allItems) {
         this.allItems = _.chunk(allItems, this.pageSize)
         this.pageCount = _.size(this.allItems)
         this.items = this.allItems[this.pageCount - 1] || this.allItems[0]
      }
   },
   mounted() {
      
   },
}