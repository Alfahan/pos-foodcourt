<template>
  <div class="cart">
    <div class="main-cart">
      <div  class="cart-empty">
          <!-- v-if="datacart.length === 0" -->
        <img src="../assets/img/food-and-restaurantempty.png" alt="empty-image" />
        <h3 class="font-weight-bold">Your cart is empty</h3>
        <h5 class="text-empty">Please add some items from the menu</h5>
      </div>
      <!-- <div v-else class="cart-thereis">
        <div class="cart-item" >
            v-for="(item, index) in datacart" :key="index"
          <img  alt="cart-image" />
          :src="`http://54.164.193.160:3000//${item.img}`"
          <div class="value-item-cart">
            <p>
              <b></b>
              {{item.nameproduct}}
            </p>
            <div class="btn-cart-value">
              <h3>-</h3>
              @click="$emit('minqty', index)"
              <h3 class="font-weight-bold"></h3>
              {{item.qty}}
              <h3>+</h3>
              @click="$emit('addqty', index)"
            </div>
          </div>
          <div class="delete-cart">
            <b-icon icon="trash-fill" class="h2" style="cursor: pointer;"></b-icon>
            @click="deletecart(index)"
            <p class="cart-price">
              <strong>Rp. </strong>
              {{item.price * item.qty}}
            </p>
          </div>
        </div>
        <div class="total-price">
          <h4 class="font-weight-bold">total:</h4>
          <h4 class="font-weight-bold">Rp. </h4>
          {{amount}}
        </div>
        <p>*Belum termasuk PPN</p>
        <div class="main-cart-button">
          <button >Checkout</button>
          @click="submitData"
          <button>Cancel</button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style>

</style>
