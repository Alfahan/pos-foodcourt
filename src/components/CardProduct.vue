<template>
    <div class="row">
        <div class="col-md-12 mt-4">
          <form v-on:submit.prevent="">
            <input type="text" name="search" @keyup="sortSearchData(search)" v-model="search" class="form-control" placeholder="Search...">
          </form>
        </div>
        <div class="col-md-12">
            <div class="row" v-if="allProducts.isLoading">
                <div class="col-md-12 text-center mt-5">
                   <b-icon icon="circle-fill" animation="throb" font-scale="4"></b-icon>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-md-12 pl-4 pt-3">
                    <div class="row">
                        <div class="card m-2 shadow" style="width: 14rem;" v-for="(item, index) in allProducts.dataProducts " :key="index">
                            <img :src="`http://54.164.193.160:3007/${item.img}`" alt="">
                            <div class="card-body p-2">
                                <h5 class="card-title">{{ item.nameproduct }}</h5>
                                <p class="card-text">Rp. {{ item.price }}</p>
                                <div v-if="level == 0">
                                  <b-button class="btn btn-pesan mr-2" @click="$emit('addtocart', item.idproduct, index)">
                                    <b-icon-cart></b-icon-cart>
                                  </b-button>
                                  <router-link class="btn btn-edit mr-2" :to="`ProductDetail/${item.idproduct}`">
                                    <b-icon-pencil></b-icon-pencil>
                                  </router-link>
                                  <b-button class="btn btn-trash" @click="onDelete(item.idproduct)">
                                    <b-icon-trash></b-icon-trash>
                                  </b-button>
                                </div>
                                <div v-else>
                                  <b-button class="btn btn-pesan mr-2" @click="$emit('addtocart', item.idproduct, index)">
                                    <b-icon-cart></b-icon-cart>
                                  </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 text-center">
          <button class="btn btn-primary" @click="paginationBack()">Back</button>
          <button class="ml-2 btn btn-primary">{{page}}</button>
          <button class="ml-2 btn btn-primary" @click="paginationNext()">Next</button>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      level: localStorage.getItem('level'),
      search: '',
      page: 1
    }
  },
  name: 'CardProduct',
  computed: {
    ...mapGetters({
      allProducts: 'products/getProducts'
    })
  },
  methods: {
    pagi () {
      const fd = {
        page: this.currentPage
      }
      this.actionGetAllProducts(fd)
    },
    onDelete (key) {
      const askConfirm = confirm('Do you want to delete this product data?')
      if (askConfirm === true) {
        this.actDeleteProduct(key)
          .then((response) => {
            this.alertSuccesDel()
            window.location = '/'
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert('Cancel')
      }
    },
    ...mapActions({
      actionGetAllProducts: 'products/getProducts',
      actDeleteProduct: 'products/delProducts',
      sortSearchData: 'products/sortSearch'
    }),
    paginationNext () {
      if (this.page >= this.allProducts.meta.totalPage) {
        alert('Last Page')
      } else {
        this.page += 1
        const fd = {
          page: this.page
        }
        this.actionGetAllProducts(fd)
      }
    },
    paginationBack () {
      if (this.page <= 1) {
        alert('First Page')
      } else {
        this.page -= 1
        const fd = {
          page: this.page
        }
        this.actionGetAllProducts(fd)
      }
    },
    alertSuccesDel () {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Delete Product Success'
      })
    }
  },
  mounted () {
    this.actionGetAllProducts(' ')
  }
}
</script>

<style scoped>
.const-pagination {
  margin-top:10vh;
  display: flex;
  justify-content: center;
}
</style>
