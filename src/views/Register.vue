<template>

  <div class="register">
   <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 shadow">
           <img src="../assets/img/register.png" width="100%" height="100%" alt="Pict">
        </div>
        <div class="col-md-8 p-2 shadow">
          <form v-on:submit.prevent="onRegister">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" v-model="form.email" placeholder="Email" aria-describedby="emailHelp" required>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Name User</label>
              <input type="text" class="form-control" v-model="form.nameuser" placeholder="Name" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="form.password" placeholder="Password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-create btn-primary">Create Account</button>
            <router-link class="nav-link" to="/Login">
              Login?
            </router-link>
          </form>
        </div>
      </div>
   </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      form: {
        email: '',
        nameuser: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister () {
      this.actRegister(this.form)
        .then((response) => {
          this.alertActive()
          window.location = '/Login'
        })
        .catch((err) => {
          this.alertError(err)
        })
    },
    ...mapActions({
      actRegister: 'auth/register'
    }),
    alertActive () {
      Swal.fire({
        icon: 'success',
        title: 'Your Registration Success',
        text: 'Please Check Your Email to Activate'
      })
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Something Went Wrong!'
      })
    }
  }
}
</script>

<style>

</style>
