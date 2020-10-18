<template>
 <div class="login">
   <div class="container shadow">
      <div class="row mt-5">
        <div class="col-md-12 text-center" v-kolor= "'black'">
          <h3>
            {{ Login }}
          </h3>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-md-4">
           <img src="../assets/img/Login.png" width="100%" alt="Fork">
        </div>
        <div class="col-md-8 p-2 ">
          <form v-on:submit.prevent="onLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" v-model="form.email" placeholder="Email" aria-describedby="emailHelp" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="form.password" placeholder="Password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-login btn-primary">Login</button>
            <router-link class="nav-link" to="/Register">
              Register?
            </router-link>
          </form>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-md-12 text-center">
          <div v-kolor= "'#F24F8A'">
            {{ Judul }}
          </div>
        </div>
      </div>
   </div>
 </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
import about from '../mixins/about'

export default {
  mixins: [about],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    onLogin () {
      this.actionLogin(this.form).then((response) => {
        if (response === "Cannot read property 'password' of undefined") {
          this.alertExist()
          localStorage.removeItem('iduser')
          localStorage.removeItem('nameuser')
          localStorage.removeItem('token')
          localStorage.removeItem('level')
          localStorage.removeItem('refreshToken')
        } else if (response === 'Need Activation') {
          this.alertActivate()
          localStorage.removeItem('iduser')
          localStorage.removeItem('nameuser')
          localStorage.removeItem('token')
          localStorage.removeItem('level')
          localStorage.removeItem('refreshToken')
        } else if (response === 'Incorrect password! please try again') {
          this.alertMatch()
          localStorage.removeItem('iduser')
          localStorage.removeItem('nameuser')
          localStorage.removeItem('token')
          localStorage.removeItem('level')
          localStorage.removeItem('refreshToken')
        } else {
          window.location = '/'
        }
      }).catch((err) => {
        alert(err)
      })
    },
    alertExist () {
      Swal.fire({
        icon: 'error',
        title: 'Username Doesnt Exist!',
        text: 'Please check your personal info or create a new one'
      })
    },
    alertActivate () {
      Swal.fire({
        icon: 'warning',
        title: 'This Account need to be verified!',
        text: 'Please check your email account to activate'
      })
    },
    alertMatch () {
      Swal.fire({
        icon: 'question',
        title: 'Username and Password Doesnt Match!'
      })
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}
</script>

<style>

</style>
