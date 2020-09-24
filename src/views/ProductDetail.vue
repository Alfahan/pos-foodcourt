<template>
    <div class="container">
        <div class="row mt-5 shadow">
          <div class="col-md-12 text-center">
            <h1>Detail Product</h1>
          </div>
        </div>
        <div class="row mt-5 p-4 shadow">
            <div class="col-md-4">
              <img :src="`http://54.164.193.160:3000/${detailProduct.img}`" class="img-fluid" alt="Picture Product">
            </div>
            <div class="col-md-8">
                <form v-on:submit.prevent="onUpdate">
                    <div class="form-group">
                      <input type="hidden" class="form-control"  v-model="detailProduct.idproduct" required>
                    </div>
                    <div class="form-group">
                      <label for="NameProduct">Name Product</label>
                      <input type="text" class="form-control" v-model="detailProduct.nameproduct" required>
                    </div>
                    <div class="form-group">
                      <label for="Price">Price</label>
                      <input type="number" class="form-control" v-model="detailProduct.price" required>
                    </div>
                    <div class="form-group">
                      <label for="Category">Categoey</label>
                        <b-form-select class="mb-3 category-select" required v-model="idcategory">
                            <b-form-select-option >Please select an option</b-form-select-option>
                            <b-form-select-option v-for="(item, index) in allCategories" :key="index" :value="item.idcategory" >{{ item.idcategory }} | {{ item.namecategory }}</b-form-select-option>
                        </b-form-select>
                    </div>
                    <div class="form-group">
                      <label for="image">Image</label>
                        <input type="file" class="form-control" @change="processFile($event)" required>
                    </div>
                    <router-link class="btn btn-add mr-2" :to="'/Home'">
                      Cancel
                    </router-link>
                    <button type="submit" class="btn btn-create btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductDetail',
  data () {
    return {
      detail: this.$route.params.idproduct,
      img: null,
      idcategory: null
    }
  },
  computed: {
    ...mapGetters({
      detailProduct: 'products/getDetailProduct',
      allCategories: 'categories/getCategory'
    })
  },
  methods: {
    sendParam () {
      this.actgetDetail(this.detail)
    },
    ...mapActions({
      actgetDetail: 'products/getDetailProduct',
      actGetAllCategory: 'categories/getCatgory',
      actUpdateProduct: 'products/updateProducts'
    }),
    processFile (event) {
      this.img = event.target.files[0]
    },
    onUpdate () {
      const fdat = new FormData()
      fdat.append('nameproduct', this.detailProduct.nameproduct)
      fdat.append('price', this.detailProduct.price)
      fdat.append('img', this.img)
      fdat.append('idcategory', this.idcategory)

      const data = {
        id: this.detailProduct.idproduct,
        form: fdat
      }

      this.actUpdateProduct(data)
        .then((response) => {
          console.log(response)
          window.location = '/Home'
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.sendParam()
    this.actGetAllCategory()
  }
}
</script>

<style>

</style>
