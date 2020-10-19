<template>
   <div class="home">
      <div class="container-fluid">
        <div class="row">

            <div class="col-md-1">
              <div class="row">
                <div class="col-md-12 p-1 shadow">
                  <SideBar/>
                </div>
              </div>
            </div>

            <div class="col-md-7 text-center">
                <div class="row">
                  <div class="col-md-12 shadow">
                    <div class="row">

                      <div class="col-md-8">
                        <b-navbar-nav class="align-center">
                            <h1>{{ Judul }}</h1>
                        </b-navbar-nav>
                      </div>

                      <div class="col-md-4">
                        <b-dropdown
                          id="dropdown-divider"
                          text="Sort item"
                          class="m-2"
                        >
                          <b-dropdown-item-button @click="sortProduct('nameproduct')"
                            >Product name</b-dropdown-item-button
                          >
                          <b-dropdown-item-button @click="sortProduct('price')"
                            >Cheapest price</b-dropdown-item-button
                          >
                          <b-dropdown-item-button @click="sortProduct('idcategory')"
                            >Category</b-dropdown-item-button
                          >
                          <b-dropdown-item-button @click="sortLatest('DESC')"
                            >Latest product</b-dropdown-item-button
                          >
                        </b-dropdown>

                      </div>

                    </div>
                  </div>
                </div>

                <CardProduct />
            </div>

            <div class="col-md-4 shadow text-center">
              <div class="row">
                <div class="col-md-12 shadow p-2">
                  <b-navbar-nav class="align-center">
                      <h3>Cart <span class="qtycart">0</span></h3>
                  </b-navbar-nav>
                </div>
              </div>
                <Cart />
            </div>

        </div>
        <div class="row shadow">
          <div class="col-md-12 p-3 shadow text-center" >
            <div v-kolor= "'#F24F8A'">
                {{ Footer }}
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import about from '../mixins/about'
import SideBar from '@/components/SideBar.vue'
import Cart from '@/components/Cart.vue'
import CardProduct from '@/components/CardProduct.vue'
import { mapActions } from 'vuex'

export default {
  mixins: [about],
  name: 'Home',
  components: {
    SideBar,
    Cart,
    CardProduct
  },
  methods: {
    ...mapActions({
      sortProductData: 'products/sortProduct',
      latestProductData: 'products/latestProduct'
    }),
    sortProduct (value) {
      const data = {
        sort: value
      }
      this.sortProductData(data)
      this.$router
        .push({ path: '/', query: { by: value } })
        .catch((err) => {
          console.log(err.name)
        })
    },
    sortLatest (value) {
      const data = {
        sortLatest: value
      }
      this.latestProductData(data)
      this.$router
        .push({ path: '/', query: { by: value } })
        .catch((err) => {
          console.log(err.name)
        })
    }
  }
}
</script>
