<!--
 * @Author: feizzer
 * @Date: 2021-11-04 16:23:38
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-04 17:28:17
 * @Description: 
-->
<template>
  <div style="padding: 20px">
      <p style="margin-bottom: 50px;font-size: 24px">当前招标产品信息表</p>
    <el-input style="margin-bottom: 30px; width: 60%" placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select style="width: 130px;" v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="产品名" value="1"></el-option>
            <el-option label="需求数量" value="2"></el-option>
            <el-option label="采购商名" value="3"></el-option>
        </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="发布日期" width="150"></el-table-column>
        <el-table-column prop="name" label="产品名" width="120"></el-table-column>
        <el-table-column prop="province" label="需求量" width="120"></el-table-column>
        <el-table-column prop="address" label="采购主体" width="300"></el-table-column>
        <el-table-column prop="zip" label="联系电话" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "PurchasingPlatformVueProductinneedTable",

  data() {
    return {
        tableData: [{
          date: '2016-05-02',
          name: '泡面',
          province: '20',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '西瓜',
          province: '100',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '快乐水',
          province: '90',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '魔法棒',
          province: '222',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
    };
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="css" scoped>
    p{
    }
</style>
