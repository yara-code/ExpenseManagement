<template>
  <div>
    <!--    quick messsage-->
    <section class="topBanner" >

    </section>

    <!--    white bar-->
    <section class="middleBanner">
      <div class="mx-1 pa-1 ">
        <v-img @click="gohome" class="float-left" height="43px" width="43px" src="../assets/icons.png"></v-img>
        <div class="my-1">
          <v-hover  class="float-left"><v-btn text elevation="0" >How It Works</v-btn></v-hover>
          <v-hover class="float-left"><v-btn text elevation="0">Track</v-btn></v-hover>
          <v-hover class="float-left"><v-btn text elevation="0">Trends</v-btn></v-hover>
        </div>
      </div>
      <v-btn class="float-right mx-4" small outlined @click="routeLogin">Login</v-btn>
      <v-btn class="float-right white--text" small color="green" @click="routeSignup">Sign up</v-btn>
    </section>

    <!--Hero header and test    -->
    <section class="color1 hero white--text">

    </section>

    <div id="Login" class="mt-3">
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
          <v-card-text><a class="blue--text" @click="routeSignup">Don't have an Account? Sign up here.</a></v-card-text>
        </v-card-text>
      </v-card>
    </div>



  </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password:'',
                name: '',
                show2: false,
                errorShow: false,
                errMessage: '',
                seen: false,
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
            routeLogin: function () {
                this.$router.push('login')
            },
            routeSignup: function () {
                this.$router.push('signup')
            },
            gohome: function(){
                this.$router.push('/');
            },
            submit:function() {
                this.accountCreate = false


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
                            // this.$store.dispatch('login');
                            sessionStorage.setItem('session', JSON.stringify(response))
                            if(response.user.expenses){
                                let ex = response.user.expenses
                                let expenses = ex.reverse()
                                sessionStorage.setItem('expenses', JSON.stringify(expenses))
                            }


                            if(response.user.income){
                                let income = {amount : response.user.income}
                                sessionStorage.setItem('income', JSON.stringify(income))
                            } else {
                                let income = {amount : 0}
                                sessionStorage.setItem('income', income)
                            }

                            this.$router.push('dashboard')
                        }
                    })
                    .catch((error)=>{
                        console.log(`error : ${JSON.stringify(error, null, 3)}`);
                        this.errMessage = error && error.response && error.response.data && error.response.data.errorMessage ? error.response.data.errorMessage : error;
                        this.seen = true;
                        setTimeout(() => { this.seen = false }, 3000)
                    })
            },
        },
    }
</script>

<style scoped>
  section {
    width: 100%;
    text-align: center;
    clear: both;
  }

  .color1 {
    /*background-color: #4caf50;*/
    background: rgb(42,96,44);
    background: linear-gradient(360deg, rgba(42,96,44,.9) 13%, rgba(76,175,80,1) 85%);
  }
  .color2 {
    background-color: #f7f8fa;
  }

  section div {
    width: 90%;
    margin: 0 auto;
  }

  .hero {
    min-height: 75px;
  }

  .topBanner {
    min-height: 50px;
    max-height: 51px;
    width: 100%;
    background: rgb(42,96,44);
    background: linear-gradient(180deg, rgba(42,96,44,.9) 13%, rgba(76,175,80,1) 85%);
  }
  .middleBanner {
    min-height: 50px;
    max-height: 51px;
    width: 100%;
    background: white;
  }
</style>