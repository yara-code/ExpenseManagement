<template>
  <div>
<!--    quick messsage-->
    <section class="topBanner" >

    </section>

<!--    white bar-->
    <section class="middleBanner">
      <div class="mx-1 pa-1 ">
        <v-img class="float-left" height="43px" width="43px" src="../assets/icons.png"></v-img>
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
      <div>
        <h1 class="pa-4 ">Manage your expense with our app</h1>
        <span class="pa-2">To Get started create an account and sign.</span><br>
        <span >Enter your bills, income, and expense. </span>
        <span >Get Weekly, monthly and Yearly projections</span>
      </div>
      <div class="mt-5">
        <v-btn outlined class="ma-2" color="white" @click="routeSignup">Sign up free</v-btn>
      </div>
    </section>

    <section class="callToAction color2" style="width: 100%">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex xs12 md4 lg4 xl4 class="pa-1">
            <h2 class="text-left">Track expenses and see your trends</h2>
            <p class="text-left">We calculate average spending by category, so you can easily create a budget based on spending patterns. See how much you’re spending on what, year-to-year or month-to-month.</p>
          </v-flex>
          <v-flex xs12 md8 lg8 xl6 class="pa-1">
            <v-img  src="../assets/demo2.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

<!--    second note-->
    <section class="callToAction2">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex  xs12 md8 lg8 xl6 class="pa-1 d-xs-none">
            <v-img class="d-none d-md-block" src="../assets/demo4.jpg"></v-img>
          </v-flex>
          <v-flex xs12 md4 lg4 xl4 class="pa-1">
            <h2 class="text-left">Know your trends with our projections</h2>
            <p class="text-left">We’ll show you exactly how your spending decisions affect the money you have at the end of the month or year. You’ll know what you can do today to save more tomorrow. </p>
          </v-flex>
          <v-flex  xs12 md8 lg8 xl6 class="pa-1 d-xs-none">
            <v-img class="d-sm-block d-md-none" src="../assets/demo4.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--    third note-->
    <section class="callToAction3 color2">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex xs12 md4 lg4 xl4 class="pa-1">
            <h2 class="text-left">Know your trends with our projections</h2>
            <p class="text-left">We’ll show you exactly how your spending decisions affect the money you have at the end of the month or year. You’ll know what you can do today to save more tomorrow. </p>
          </v-flex>
          <v-flex xs12 md8 lg8 xl6 class="pa-1">
            <v-img  src="../assets/demo3.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--    sign up -->
    <section class="">
      <center><div class="ma-8">
        <h1>Sign up for Expense ME</h1>
        <p class="ma-2">From tracking to spending projections you’ll discover the effortless way to stay on top of it all.  </p>
        <v-btn class="ma-2 white--text" color="green" @click="routeSignup">Sign Up free</v-btn>
      </div></center>
    </section>
  </div>
</template>

<script>
    export default {
        name: "Landing.vue",
        data() {
            return {
            }
        },
        methods: {
            routeLogin: function () {
                this.$router.push('login')
            },
            routeSignup: function () {
                this.$router.push('signup')
            }
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
    min-height: 250px;
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

  .callToAction {
    min-height: 550px;
    width: 100%;
  }

  .callToAction2 {
    min-height: 450px;
    width: 100%;
  }

  .callToAction3 {
    min-height: 450px;
    width: 100%;
  }


</style>