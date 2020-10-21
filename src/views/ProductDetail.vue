<template>
    <div class="container">
        <div class="row mt-5 shadow">
          <div class="col-md-12 text-center">
            <h1>Detail Product</h1>
          </div>
        </div>
        <div class="row mt-5 p-4 shadow">
            <div class="col-md-4">
              <img :src="`http://54.164.193.160:3007/${detailProduct.img}`" class="img-fluid" alt="Picture Product">
            </div>
            <div class="col-md-8">
                <form v-on:submit.prevent="onUpdate">
                    <div class="form-group">
                      <input type="hidden" class="form-control" required  v-model="detailProduct.idproduct" >
                    </div>
                    <div class="form-group">
                      <label for="NameProduct">Name Product</label>
                      <input type="text" class="form-control" required v-model="detailProduct.nameproduct" >
                    </div>
                    <div class="form-group">
                      <label for="Price">Price</label>
                      <input type="number" class="form-control" required v-model="detailProduct.price" >
                    </div>
                    <div class="form-group">
                      <label for="Category">Categoey</label>
                        <select id="category" class="form-control shadow-input" v-model="idcategory">
                          <option selected value disabled>Choose Category</option>
                          <option v-for="(item, index) in allCategories" :value="item.idcategory" :key="index"> {{item.namecategory}}
                          </option>
                        </select>
                    </div>
                    <div class="form-group">
                      <label for="image">Image</label>
                        <input type="file" class="form-control" @change="processFile($event)" required>
                    </div>
                    <router-link class="btn btn-add mr-2" :to="'/'">
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
import Swal from 'sweetalert2'

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
      actGetAllCategory: 'categories/getCategory',
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
          if (response === 'Image type must JPG ,JPEG, PNG') {
            this.alertValidation()
          } else if (response === 'Image size is too big! Please upload another one with size <200kb') {
            this.alertSize()
          } else {
            // console.log(response)
            this.alertSuccesUpdate()
            window.location = '/'
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    alertSuccesUpdate () {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Update Product Success'
      })
    },
    alertValidation () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Image type must be JPG  JPEG, PNG'
      })
    },
    alertSize () {
      Swal.fire({
        icon: 'error',
        title: 'Image size is too big!',
        text: 'Please upload another one with size < 200kb'
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
