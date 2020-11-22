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

    <div id="SignUp" >
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
            <v-card-text> <a class="blue--text" @click="routeLogin">Already have an Account? Log in here.</a></v-card-text>
          </v-card-text>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SignUp",
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
              // sign up user:
              if(this.$refs.signUpForm.validate()){
                  console.log(`testing validation `);
                  // API call to create an account:

                  const url = "https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/user" // local client + lambbda server
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
                          // "Access-Control-Allow-Credentials": false
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
                          this.accountCreate = true;
                          this.password = ''
                          this.confirmPassword = '';
                          this.name = '';
                          setTimeout(() => { this.accountCreate = false; this.$router.push('login') }, 3000)
                      })
                      .catch((error)=>{
                          console.log(`error : ${JSON.stringify(error, null, 3)}`);
                          this.errMessage = error.response.data.errorMessage;
                          this.seen = true;
                          setTimeout(() => { this.seen = false }, 3000)
                      })
              }
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