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
                            <h1>Food Items</h1>
                        </b-navbar-nav>
                      </div>

                      <div class="col-md-4">
                        <div class="input-group mb-3">
                          <input  type="text" class="form-control" placeholder="Search Foods" aria-label="Cari" aria-describedby="basic-addon1"   >
                          <!-- v-model="search" @keyup="searchFoods" -->
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"><b-icon-search></b-icon-search></span>
                        </div>
                      </div>

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
                <!-- :datacart="addCartData" @addqty="addQty" @minqty="minQty" @refreshdel="getData" @orderdata="orderData" -->
            </div>

        </div>
        <div class="row shadow">
          <div class="col-md-12 p-3 shadow text-center" >
            <div v-kolor= "'#F24F8A'">
              <h5>
                {{ Judul }}
              </h5>
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

export default {
  mixins: [about],
  name: 'Home',
  components: {
    SideBar,
    Cart,
    CardProduct
  }
}
</script>
