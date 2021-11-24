<!--
 * @Author: feizzer
 * @Date: 2021-11-24 19:17:48
 * @LastEditors: feizzer
 * @LastEditTime: 2021-11-24 20:59:35
 * @Description: 
-->
<template>
  <div style="width: 100%;display:flex; ">
    <div class="product-tree">
      <el-tree :data="productData" node-key="id" :expand-on-click-node="false">
        <span slot-scope="{ node, data }">
          {{node.label}}
          <el-button v-if="data.status == 0" type="text" size="mini" @click="() => append(data)">
              发起审核
          </el-button>
          <el-button v-if="data.status == 1" type="text" plain disabled="" size="mini">审核已开通</el-button>
        </span>
      </el-tree>
    </div>
    <div class="authorized-area">
        <el-table :data="authorizingTable">
            <el-table-column prop="date" label="发起日期" width="180">
            </el-table-column>
            <el-table-column prop="provider" label="供应商"></el-table-column>
            <el-table-column prop="product" label="产品"></el-table-column>
            <el-table-column prop="status" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="scope.row.status == -1">通过</el-button>
                    <el-button type="warning" size="mini" v-if="scope.row.status == -1">拒绝</el-button>
                    <el-button type="info" disabled size="mini" v-if="scope.row.status == 1">以通过</el-button>
                    <el-button type="danger" size="mini" v-if="scope.row.status == 1">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form ref="dialogForm" :model="formData" :rules="dialogRules">
        <el-form-item label="选择审核日期" label-width="110px" prop="startendTime">
          <el-date-picker type="daterange" unlink-panels v-model="formData.startendTime" 
                    start-placeholder="选择开始日期" end-placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PurchasingPlatformVueAuthorized",

  data() {
    return {
        dialogVisible: false,
        dialogTitle: '',
        dialogRules: {
            startendTime: [
                { required: true, message: '请选择审核开启日期', trigger: 'blur'}
            ]
        },
        productData: [
            { label: "鸡蛋", id: 1 , status: '0'},
            { label: "泡面", id: 3 , status: '0'},
            {  label: "西瓜", id: 2 ,status: '1'},
        ],
        authorizingTable: [
            {date: '2021-11-1', provider: '霍格沃兹魔法部', product: '魔法棒', status: -1},
            {date: '2021-11-2', provider: '美团总部', product: '泡面', status: 1},
        ],
        productID: '',
        formData: {
            startendTime: '',
        }
    };
  },

  mounted() {},

  methods: {
    append(data) {
      this.productID = data.id
      this.dialogTitle = `开启${data.label}商品的审核`
      this.dialogVisible = true
    },
    dialogPost() {
        this.$refs.dialogForm.validate( res => {
            if (res) {
                console.log(this.productID, this.formData.startendTime)
            } else{
                
            }
        })
    }
  }
};
</script>

<style lang="css" scoped>
.product-tree {
  width: 20%;
}
.authorized-area {
  width: 80%;
}
</style>
