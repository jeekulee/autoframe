let tabel = function () {

  return `
<template>
  <div>
    <el-table
      :data="listData"
      height="250"
      border
      style="width: 100%">
      <el-table-column v-for="(item, index) in tableKey" :key='index'
        :prop="item"
        :label="item"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tableComponent',
  data () {
    return {
      tableKey: [],
      filters: {},
      listData: []
    }
  },
  props: ['curData'],
  watch: {
    'curData': {
      deep: true,
      handler (newval, oldval) {
        if (newval.length > 0) {
          Object.assign(this.$data, this.$options.data())
          for (let key in newval[0]) {
            this.$set(this.filters, key, '')
            this.tableKey.push(key)
          }
        }
        this.listData = newval
      }
    }
  }
}
</script>
`
}

module.exports = tabel()