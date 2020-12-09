<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="alert alert-danger fade show" role="alert" v-if="errors !== null">
          <button type="button" class="close" aria-label="Close" @click="clearErrors">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error code: {{ errors.status.code }}</strong>
          {{ errors.status.description }}
        </div>
        <fieldset>
          <legend><h3 style="text-align: center">Login</h3></legend>

          <div class="form-group">
            <label for="login">Email</label>
            <input type="text" class="form-control" placeholder="Email" v-model="credentials.login">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="credentials.password" @keydown.enter="logIn(credentials)">
          </div>

          <button type="button" class="btn btn-outline-secondary" @click="logIn(credentials)"><i class="fas fa-sign-in-alt"></i> Sign in</button>
        </fieldset>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      credentials: {
        login: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['errors'])
  },
  methods: {
    ...mapActions('auth', ['logIn']),
    clearErrors() {
      this.errors = {}
    }
  }
}
</script>

<style lang="css" scoped >

</style>
