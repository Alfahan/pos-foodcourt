<template>
  <div class="cart">
    <div class="main-cart">
      <div  class="cart-empty" v-if="cartdata.length === 0">
        <img src="../assets/img/food-and-restaurantempty.png" alt="empty-image" />
        <h3 class="font-weight-bold">Your cart is empty</h3>
        <h5 class="text-empty">Please add some items from the menu</h5>
      </div>
      <div v-else class="cart-thereis" >
        <div class="cart-item" v-for="(item, index) in cartdata" :key="index">
          <img  alt="cart-image" :src="`http://localhost:3000//${item.img}`"/>
          <div class="value-item-cart">
            <p>
              <b></b>
              {{item.nameproduct}}
            </p>
            <div class="btn-cart-value">
              <button class="btn-qty" @click="$emit('mindata', index)">-</button>
              <h3 class="font-weight-bold btn-qty">{{item.qty}}</h3>
              <button class="btn-qty" @click="$emit('plusdata', index)">+</button>
            </div>
          </div>
          <div class="delete-cart">
            <b-icon icon="trash-fill" class="h2" style="cursor: pointer;"></b-icon>
            <!-- @click="deletecart(index)" -->
            <p class="cart-price">
              <strong>Rp. {{item.price * item.qty}} </strong>
            </p>
          </div>
        </div>
        <div class="total-price">
          <h4 class="font-weight-bold">Total:</h4>
          <h4 class="font-weight-bold">Rp. {{amount}}</h4>
        </div>
        <p>*Belum termasuk PPN</p>
        <div class="main-cart-button">
          <button id="show-btn" @click="checkOut" >Checkout</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
      <b-modal ref="my-modal">
        <div v-if="invoice == 0">
          <span></span>
        </div>
        <div v-else>
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="header p-3">
                      <div class="row">
                          <div class="col-md-6 text-left">
                              <h2><b>Checkout</b></h2>
                          </div>
                          <div class="col-md-6 text-right">
                              <h5><b>Recipt no: {{ datacart.invoice }}</b></h5>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-12 text-left">
                              <h6><b>Cashier : {{ namecashier }}</b></h6>
                          </div>
                      </div>
                  </div>
                  <div class="detail p-3">
                      <div class="row" v-for="(item, index) in datacart.detail " :key="index">
                          <div class="col-md-5 text-left">
                              <h5><b> {{item.nameproduct}} </b></h5>
                          </div>
                          <div class="col-md-1 text-right">
                              <h5><b>{{ item.qty }}x</b></h5>
                          </div>
                          <div class="col-md-6 text-right">
                              <h5><b>Rp. {{ item.subtotal }}</b></h5>
                          </div>
                      </div>
                  </div>
                  <div class="subtotal p-3">
                      <div class="row">
                          <div class="col-md-6 text-left">
                              <h5><b>PPN 10%</b></h5>
                          </div>
                          <div class="col-md-6 text-right">
                              <h5><b>Rp.{{datacart.ppn}}</b></h5>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-12 text-right">
                              <h5><b>Total : Rp.{{datacart.amount}}</b></h5>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-12 text-left">
                              <h5><b>Payment:     Cash</b></h5>
                          </div>
                      </div>
                  </div>
                  <div class="footer">
                      <div class="row text-center p-4">
                          <div class="col-md-12 p-2 print">
                              <button class="print">Print</button>
                          </div>

                          <div class="col-md-12 p-2">
                              Or
                          </div>

                          <div class="col-md-12 p-2 sendemail">
                              <button class="sendemail">Send Email</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Cart',
  props: ['cartdata'],
  data () {
    return {
      amount: null,
      idcashier: localStorage.getItem('iduser'),
      namecashier: localStorage.getItem('nameuser'),
      ppn: null,
      datacart: null,
      invoice: 0
    }
  },
  watch: {
    cartdata (value) {
      this.amount = value.reduce((item, data) => {
        return item + (data.qty * data.price)
      }, 0)
    }
  },
  methods: {
    showModal () {
      this.invoice = 1
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    ...mapActions({
      insertHistoryTransaction: 'history/insertHistory'
    }),
    checkOut () {
      const detailData = this.cartdata.map(e => {
        const dataDetail = {
          idproduct: e.idproduct,
          nameproduct: e.nameproduct,
          qty: e.qty,
          subtotal: `${e.price * e.qty}`
        }
        return dataDetail
      })
      const ppn = this.amount * 10 / 100
      const data = {
        invoice: `#${Date.now()}`,
        ppn: ppn,
        iduser: this.idcashier,
        amount: `${this.amount + ppn}`,
        detail: detailData
      }
      this.insertHistoryTransaction(data)
        .then(result => {
          this.alertSucces()
        }).catch(err => {
          console.log(err)
        })
      this.datacart = data
      this.showModal(this.datacart)
    },
    alertSucces () {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Checkout Success'
      })
    }
  }
}
</script>

<style scoped>
.cart-page {
  background: #FFFFFF;
  border: 1px solid #CECECE;
  height: 100%;
  overflow: scroll;
}
.cart-navbar {
  background: #FFFFFF;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  padding: 5px 0;
  text-align: center;
}
.cart-navbar h2 span {
  color: whitesmoke;
  background-color: skyblue;
  font-size: 25px;
  padding: 0 8px;
  border-radius: 25px;
}
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-thereis {
  padding: 15px 10px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.cart-item img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.cart-item .value-item-cart p:nth-child(1) {
  font-size: 25px;
}
.btn-cart-value {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.btn-cart-value .btn-qty {
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  color: #82de3a;
  width: 30px;
  height: 30px;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
}
.btn-cart-value h3:nth-child(2) {
  font-size: 14px;
  padding-top: 6px;
  background: #ffffff;
  border: 1px solid #82de3a;
  cursor: auto;
}
.cart-item .cart-price {
  font-size: 20px;
  margin-bottom: 0;
}
.delete-cart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 !important;
}
.total-price {
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
}.main-cart-button {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
.main-cart-button button {
  padding: 7px 0;
  border-radius: 7px;
  color: white;
  outline: none;
  font-weight: bolder;
  transition: all .3s ease;
  font-size: 20px;
}
.main-cart-button button:nth-child(1) {
  background-color: #57CAD5;
  border: 2px solid #57cad5;
}
.main-cart-button button:nth-child(2) {
  background-color: #F24F8A;
  border: 2px solid #F24F8A;
}
.main-cart-button button:nth-child(1):hover {
  color: #57CAD5;
  background-color: transparent;
}
.main-cart-button button:nth-child(2):hover {
  color: #F24F8A;
  background-color: transparent;
}
.print{
    background: #F24F8A;
    color: white;
    border: none;
    border-radius: 5px;
}

.sendemail{
    background: #57CAD5;
    color: white;
    border: none;
    border-radius: 5px;
}
/* responsive breakpoint */
@media screen and (max-width: 992px) {
  .cart-page {
    width: 400px;
    height: 100vh;
  }
}
@media screen and (max-width: 576px) {
  .cart-page {
    width: 96vw;
  }
}
</style>
