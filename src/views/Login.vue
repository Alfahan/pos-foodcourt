<template>
 <div class="login">
   <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 shadow">
           <img src="../assets/img/Login.png" width="100%" alt="Fork">
        </div>
        <div class="col-md-8 p-2 shadow">
          <form v-on:submit.prevent="onLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" v-model="form.email" placeholder="Email" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="form.password" placeholder="Password" class="form-control" >
            </div>
            <button type="submit" class="btn btn-login btn-primary">Login</button>
            <router-link class="nav-link" to="/Register">
              Create Account?
            </router-link>
          </form>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.actionLogin(this.form).then((response) => {
        if (response !== 'Login Success') {
          alert('Login Failed')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else {
          alert('Login Success')
          window.location = '/Home'
        }
      }).catch((err) => {
        alert(err)
      })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  }
}
</script>

<style>

</style>
