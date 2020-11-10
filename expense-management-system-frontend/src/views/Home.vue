<template>
  <div class="home" >
    <v-content>
      <router-link to="/dashboard">YES---Dashboard No Login -> Dev use -> remove for production</router-link>
      <br><br><br><br><br>
      <div id="Login" v-show="login">
        <v-card class="mx-auto" max-width="500px">
          <v-card-title class="justify-center">Expense Me</v-card-title>
          <center><v-img height="50%" width="40%" src="../assets/icons.png"></v-img></center>

          <v-card-title class="justify-center">Login</v-card-title>
          <v-card-text id="errorMessageText" class="text-center red--text" v-if="seen" >{{ errMessage }}</v-card-text>
          <v-card-text id="accountCreated" class="text-center green--text" v-if="accountCreate" >"Account Create Successfully. Please login."</v-card-text>
          <v-card-text>
            <v-text-field  v-model="username" label="Username" outlined shaped></v-text-field>
            <v-text-field
                    v-model="password"
                    outlined shaped label="Password"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    hint="At least 7 characters"
                    value=""
                    :rules="passwordRules"
                    class="input-group--focused"
                    @keypress.enter="submit()"
            ></v-text-field>
            <v-btn v-on:click="submit()" type="password" rounded color="primary">Login</v-btn>
            <v-card-text><a class="blue--text" @click="login = !login">Don't have an Account? Sign up here.</a></v-card-text>
          </v-card-text>
        </v-card>
      </div>

      <div id="SignUp" v-show="!login">
        <v-card class="mx-auto" max-width="500px">
          <v-card-title class="justify-center">Expense Me</v-card-title>
          <center><v-img height="50%" width="40%" src="../assets/icons.png"></v-img></center>

          <v-card-title class="justify-center">Sign up</v-card-title>
          <v-card-text id="errorMessage" class="text-center red--text" v-if="seen">{{errMessage}}</v-card-text>
          <v-form ref="signUpForm">
            <v-card-text>
              <v-text-field  v-model="name" label="Name" outlined shaped required :rules="nameRules"></v-text-field>
              <v-text-field   v-model="username" label="Username" outlined shaped required :rules="usernameRules" ></v-text-field>
              <v-text-field  v-model="email" label="Email" outlined shaped required :rules="emailRules"></v-text-field>
              <v-text-field
                      v-model="password"
                      outlined shaped label="Password"
                      :type="show2 ? 'text' : 'password'"
                      name="p"
                      hint="At least 7 characters"
                      value=""
                      required
                      class="input-group--focused"
                      :rules="passwordRules"

              ></v-text-field>
              <v-text-field
                      v-model="confirmPassword"
                      outlined shaped label="ConfirmPassword"
                      :type="show2 ? 'text' : 'password'"
                      name="cp"
                      hint="At least 7 characters"
                      value=""
                      required
                      class="input-group--focused"
                      @keypress.enter="submit()"
                      :rules="confirmPasswordRules"
              ></v-text-field>
              <v-btn v-on:click="submit()"  rounded color="primary">Sign up</v-btn>
              <v-card-text> <a class="blue--text" @click="login = !login">Already have an Account? Log in here.</a></v-card-text>
            </v-card-text>
          </v-form>
        </v-card>
      </div>

      <br><br><br>
    </v-content>
  </div>
</template>

<script>
    // @ is an alias to /src
    import axios from 'axios'
    axios.defaults.withCredentials = false

    export default {
        name: 'home',
        data() {
            return {
                username: '',
                password:'',
                name: '',
                show2: false,
                errorShow: false,
                errMessage: '',
                seen: false,
                login: true,
                email: '',
                confirmPassword: '',
                accountCreate: false,


                usernameRules: [
                    v => !!v || 'Username is required.',
                    v => v.length >= 5 || 'Minimum length is 5.',
                ],
                passwordRules: [
                    v => !!v || "Password is required.",
                    v => v.length >= 7 || "Minimum length is 7.",
                ],
                confirmPasswordRules: [
                    v => !!v || "Confirm Password is required.",
                    v => v.length >= 7 || "Minimum length is 7.",
                    v => v == this.password || "Passwords do not match."
                ],
                nameRules: [
                    v => !!v || 'Name is required.',
                    v => v.length >= 2 || 'Minimum length is 2.',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\S+@\S+\.\S+$/.test(v) || 'E-mail must be valid.',
                ],

            }
        },
        methods: {
            submit:function() {
                this.accountCreate = false


                if(this.login){
                    // make api request to check creds:
                    // check if login or signup

                    const url = "https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/auth" // straight api url
                    // const url = "http://localhost:3000/auth" // local client + local server testing

                    const data = {
                        "username": this.username,
                        "password": this.password
                    };
                    const options = {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": false
                        },
                        crossDomain: true,
                        withCredentials: false,
                        data: data,
                        url,
                    };
                    axios(options)
                        .then((results)=>{
                            console.log(`results : ${JSON.stringify(results, null, 3)}`);
                            let response = results.data

                            if(response.accountId){
                                // log in successful:
                                this.$store.dispatch('login');
                                this.$router.push('dashboard')
                            }
                        })
                        .catch((error)=>{
                            console.log(`error : ${JSON.stringify(error, null, 3)}`);
                            this.errMessage = error && error.response && error.response.data && error.response.data.errorMessage ? error.response.data.errorMessage : error;
                            this.seen = true;
                            setTimeout(() => { this.seen = false }, 3000)
                        })
                } else {
                    // sign up user:
                    if(this.$refs.signUpForm.validate()){
                      console.log(`testing validation `);
                      // API call to create an account:

                        const url = "https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev//user" // local client + lambbda server
                        // const url = "http://localhost:3000/user" // local client + local server testing
                        const data = {
                            "name": this.name,
                            "username": this.username,
                            "password": this.password,
                            "confirmPassword": this.confirmPassword,
                            "email": this.email
                        };
                        const options = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Credentials": false
                            },
                            crossDomain: true,
                            withCredentials: false,
                            data: data,
                            url,
                        };


                        //make the call
                        axios(options)
                          .then((results)=>{
                              console.log(`results : ${JSON.stringify(results, null, 3)}`);
                              let response = results.data;
                              // log in successful:
                              this.login = !this.login;
                              this.accountCreate = true;
                              this.password = ''
                              this.confirmPassword = '';
                              this.name = '';
                              setTimeout(() => { this.accountCreate = false }, 5000)
                          })
                          .catch((error)=>{
                              console.log(`error : ${JSON.stringify(error, null, 3)}`);
                              this.errMessage = error.response.data.errorMessage;
                              this.seen = true;
                              setTimeout(() => { this.seen = false }, 3000)
                          })
                    }
                }
            },
        },
    }
</script>

<style scoped>
</style>
