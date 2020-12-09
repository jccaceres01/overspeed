<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#"><i class="fas fa-cubes"></i></a>

    <div class="collapse navbar-collapse" id="navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" @click="$router.push('/')">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" @click="$router.push('/about')">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>

      <ul class="navbar-nav navbar-right">
        <li class="nav-item" v-if="hash !== null">
          <a class="nav-link" href="#" @click="logOut"><i class="fas fa-sign-out-alt"></i> Login-Out</a>
        </li>
        <li class="nav-item" v-if="busy">
          <a class="nav-link" href="#"><i class="fas fa-circle-notch fa-spin"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
  },
  computed: {
    ...mapGetters('auth', ['hash']),
    ...mapGetters(['busy'])
  },
  methods: {
    ...mapActions('auth', ['logOut'])
  }
}
</script>

<style lang="css" scoped >

</style>
