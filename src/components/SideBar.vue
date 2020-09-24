<template>
  <div class="sidebar">
        <b-button class="button-vue" v-b-toggle.sidebar-1>
            <img src="../assets/img/menu.png" alt="Fork">
        </b-button>
        <b-sidebar id="sidebar-1" width="80px" shadow>
        <div class="px-1 py-1">
            <div class="row mt-4">
                <div class="col-md-12">
                    <router-link class="nav-link" to="/Home">
                        <img src="../assets/img/fork.jpg" alt="Fork">
                    </router-link>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <router-link class="nav-link" to="/History">
                    <img src="../assets/img/clipboard.png" alt="Fork">
                    </router-link>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <b-button class="button-vue" v-b-modal.modal-1><img src="../assets/img/add.png" alt="Fork"></b-button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <b-button class="button-vue" @click="actLogout()"><img src="../assets/img/Logout.png" width="170%" alt="Fork"></b-button>
                </div>
            </div>
        </div>
    </b-sidebar>

    <!-- Modal -->
     <b-modal id="modal-1" title="" hide-header hide-footer>
        <div class="container">
            <h4>Add Item</h4>
            <form v-on:submit.prevent="onAddProduct"  enctype="multipart/form-data">
                <div class="form-group row">
                    <label for="name">Name</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="nameproduct" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="price">Price </label>
                    <div class="col-sm-10">
                        <input type="number" v-model="price" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="category">Category</label>
                    <div class="col-sm-10">
                        <b-form-select v-model="idcategory" class="mb-3 category-select">
                            <b-form-select-option >Please select an option</b-form-select-option>
                            <b-form-select-option v-for="(item, index) in allCategories" :key="index" :value="item.idcategory" > {{item.idcategory}}|{{item.namecategory}}</b-form-select-option>
                        </b-form-select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="image">Image</label>
                    <div class="col-sm-10">
                        <input type="file" class="form-control" @change="processFile($event)">
                    </div>
                </div>
                <div class="text-right">
                    <input type="reset" value="Cancel" class="btn-cancel mb-2 mr-2 p-2" >
                    <input type="submit" value="Send" class="btn-add mb-2 p-2">
                </div>
            </form>
        </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  data () {
    return {
      nameproduct: null,
      price: null,
      img: null,
      idcategory: null
    }
  },
  computed: {
    ...mapGetters({
      allCategories: 'categories/getCategory'
    })
  },
  methods: {
    processFile (event) {
      this.img = event.target.files[0]
    },
    ...mapActions({
      onLogout: 'auth/logout',
      actGetAllCategory: 'categories/getCategory',
      actAddProducts: 'products/addProducts'
    }),
    actLogout () {
      const askConfirm = confirm('Do you want to leave ?')
      if (askConfirm === true) {
        this.onLogout()
          .then(() => {
            window.location = '/Login'
          })
      } else {
        alert('Cancel')
      }
    },
    onAddProduct () {
      const fdat = new FormData()
      fdat.append('nameproduct', this.nameproduct)
      fdat.append('price', this.price)
      fdat.append('img', this.img)
      fdat.append('idcategory', this.idcategory)

      this.actAddProducts(fdat)
        .then((response) => {
          console.log(response)
          window.location = '/Home'
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.actGetAllCategory()
  }

}
</script>

<style>

</style>
