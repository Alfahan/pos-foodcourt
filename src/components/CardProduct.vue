<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row" v-if="allProducts.isLoading">
                <div class="col-md-12 text-center">
                    <h2> ...LOADING... </h2>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-md-12 pl-4 pt-3">
                    <div class="row">
                        <div class="card m-2 shadow" style="width: 14rem;" v-for="(item, index) in allProducts.data " :key="index">
                            <img :src="`http://54.164.193.160:3000/${item.img}`" alt="">
                            <div class="card-body p-2">
                                <h5 class="card-title">{{ item.nameproduct }}</h5>
                                <p class="card-text">Rp. {{ item.price }}</p>
                                <b-button class="btn btn-pesan mr-2">
                                  <b-icon-cart></b-icon-cart>
                                </b-button>
                                <router-link class="btn btn-edit mr-2" :to="`ProductDetail/${item.idproduct}`">
                                  <b-icon-pencil></b-icon-pencil>
                                </router-link>
                                <b-button class="btn btn-trash" @click="onDelete(item.idproduct)">
                                  <b-icon-trash></b-icon-trash>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CardProduct',
  computed: {
    ...mapGetters({
      allProducts: 'products/getProducts'
    })
  },
  methods: {
    onDelete (key) {
      const askConfirm = confirm('Do you want to delete this product data?')
      if (askConfirm === true) {
        this.actDeleteProduct(key)
          .then((response) => {
            console.log(response)
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('Cancel')
      }
    },
    ...mapActions({
      actionGetAllProducts: 'products/getProducts',
      actDeleteProduct: 'products/delProducts'
    })
  },
  mounted () {
    this.actionGetAllProducts()
  }
}
</script>

<style>

</style>
