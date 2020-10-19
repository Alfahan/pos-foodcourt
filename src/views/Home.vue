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

                <CardProduct @addtocart="addToCart"/>
            </div>

            <div class="col-md-4 shadow text-center">
              <div class="row">
                <div class="col-md-12 shadow p-2">
                  <b-navbar-nav class="align-center">
                      <h3>Cart <span class="qtycart">0</span></h3>
                  </b-navbar-nav>
                </div>
              </div>
                <Cart :cartdata="cartItem" @plusdata="plusData" @mindata="minData" @closencheckout="checkOut"/>
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

     <div class="modal-box" :style="modalToggle">
        <div class="modal-content">
          <div class="modal-checkout">
            <p class="text-center"><b>Checkout</b></p>
            <p><b>Receipt no: #010410919</b></p>
            <button class="btn-close" @click="closeModalCheckout">x</button>
          </div>
          <p class="cashier-name">Cashier : Billie Elish</p>
          <div class="list-payment" v-for="(item, index) in checkOutData" :key="index">
            <p><b>{{item.product_name}} {{item.qty}}x</b></p>
            <p><b>Rp. {{item.price}}</b></p>
          </div>
          <p class="total">
            <b>Total: <span>Rp. {{amount}}</span></b>
          </p>
          <p class="payment-cash"><b>Payment: Cash</b></p>
          <div class="btn-payment">
            <button>Print</button>
            <p>Or</p>
            <button>Send Email</button>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [about],
  name: 'Home',
  components: {
    SideBar,
    Cart,
    CardProduct
  },
  data () {
    return {
      cartItem: [],
      amount: null
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'products/getProducts'
    })
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
    },
    addToCart (id, index) {
      const product = this.allProducts.dataProducts.filter((e) => e.idproduct === id)
      const cart = this.cartItem.filter((e) => e.idproduct === id)
      if (cart.length === 0) {
        product[0].qty = 1
        this.cartItem = [...this.cartItem, product[0]]
      } else {
        const cartData = this.cartItem.map((e) => {
          if (e.idproduct === id) {
            e.qty += 1
          }
          return e
        })
        this.cartItem = cartData
      }
    },
    plusData (index) {
      console.log(this.cartItem)
      const idCart = this.cartItem[index].idproduct
      const plus = this.cartItem.filter((el) => {
        if (idCart === el.idproduct) {
          el.qty += 1
        }
        return el
      })
      this.cartItem = plus
    },
    minData (index) {
      const idCart = this.cartItem[index].idproduct
      const mines = this.cartItem.filter((el) => {
        if (idCart === el.idproduct) {
          if (el.qty <= 1) {
            alert('item on minimum quantity')
            el.qty = 1
          } else {
            el.qty -= 1
          }
        }
        return el
      })
      this.cartItem = mines
    },
    checkOut (data) {
      // this.checkOutData = data.
    }
  }
}
</script>
