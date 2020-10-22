<template>
  <div class="home" >
    <v-content>
      <br><br><br><br><br>
      <v-card class="mx-auto" max-width="500px">
        <center><v-img height="50%" width="40%" src="../assets/icons.png"></v-img></center>

        <v-card-title class="justify-center">Sign up</v-card-title>
        <v-card-text id="errorMessage" class="text-center red--text" v-if="seen" >Missing Fields</v-card-text>
        <v-card-text>
          <v-text-field  v-model="username" label="Username" outlined shaped></v-text-field>
          <v-text-field  v-model="email" label="Email" outlined shaped></v-text-field>
          <v-text-field
                  v-model="password"
                  outlined shaped label="Password"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  hint="At least 8 characters"
                  value=""
                  class="input-group--focused"

          ></v-text-field>
          <v-text-field
                  v-model="confirmPassword"
                  outlined shaped label="ConfirmPassword"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  hint="At least 8 characters"
                  value=""
                  class="input-group--focused"
                  @keypress.enter="submit()"
          ></v-text-field>
          <v-btn v-on:click="submit()" type="password" rounded color="primary">Sign up</v-btn>
          <v-card-text> <router-link style="text-decoration: none" to="/home">Already have an Account? Log in here.</router-link></v-card-text>
        </v-card-text>
      </v-card>
    </v-content>
  </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Signup',
        data() {
            return {
                username: '',
                password:'',
                email: '',
                confirmPassword: '',
                show2: false,
                errorShow: false,
                seen: false

            }
        },
        methods: {
            submit:function() {
                // make api request to check creds:
                let u = this.username;
                let p = this.password;
                this.password = '';

                if (u.toLowerCase() == 'admin' && p == 'password') {
                    this.$store.dispatch('login');
                    this.$router.push('dashview')
                } else {
                    // put message inside of a .catch for request. It will display : id=errorMessage
                    this.seen = true;
                    setTimeout(() => { this.seen = false }, 2000)
                }
            },
        },
    }
</script>

<style scoped>
</style>
