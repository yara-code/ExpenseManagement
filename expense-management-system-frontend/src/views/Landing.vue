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
          <v-hover  class="float-left"><v-btn text elevation="0" ></v-btn></v-hover>
          <v-hover class="float-left"><v-btn text elevation="0"></v-btn></v-hover>
          <v-hover class="float-left"><v-btn text elevation="0"></v-btn></v-hover>
        </div>
      </div>
      <v-btn class="float-right mx-4" small outlined @click="routeLogin">Login</v-btn>
      <v-btn class="float-right white--text" small color="green" @click="routeSignup">Sign up</v-btn>
    </section>

    <!--Hero header and test    -->
    <section class="color1 hero white--text">
      <div>
        <h1 class="pa-4 ">Manage All Your Finances In One Place.</h1>
        <span class="pa-2">Easy-to-read reports and dashboards help you make smarter financial decisions.</span><br>
        <span >Create an account to get started. </span><br>
      </div>
      <div class="mt-5">
        <v-btn outlined class="ma-2" color="white" @click="routeSignup">Sign up free</v-btn>
      </div>
    </section>

    <section class="callToAction color2" style="width: 100%">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex xs12 md4 lg4 xl4 class="pa-1"><br><br><br><br><br><br>
            <h2 class="text-left">Know Where Your Money Is Going</h2>
            <p class="text-left">EMS boils budgeting down to the only thing you want to know: how much you have for spending. It crunches the numbers to show you how much money is available after accounting for bills and other spendings. View how much money is left “in your pocket” for the rest of month. </p>
          </v-flex>
          <v-flex xs12 md8 lg8 xl6 class="pa-1">
            <v-img  src="../assets/demo2-2.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--    second note-->
    <section class="callToAction2">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex  xs12 md8 lg8 xl6 class="pa-1 d-xs-none">
            <v-img class="d-none d-md-block" src="../assets/demo4-2.jpg"></v-img>
          </v-flex>
          <v-flex xs12 md4 lg4 xl4 class="pa-1"><br><br><br><br><br><br>
            <h2 class="text-left">Let Us Do The Math For You</h2>
            <p class="text-left"> Our insightful tools offer monthly spending projections and daily spending averages, which provide a more inclusive financial picture beyond just transactions. Dial it down farther and keep track of certain categories of spending — like groceries, clothing or eating out. </p>
          </v-flex>
          <v-flex  xs12 md8 lg8 xl6 class="pa-1 d-xs-none">
            <v-img class="d-sm-block d-md-none" src="../assets/demo4-2.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--    third note-->
    <section class="callToAction3 color2">
      <v-container style="width: 100%">
        <v-layout row wrap style="width: 90%">
          <v-flex xs12 md4 lg4 xl4 class="pa-1"><br><br><br><br><br><br>
            <h2 class="text-left">Personal Finance Simplified</h2>
            <p class="text-left">Almost everyone wants to improve how they save and budget their money — and we have taken notice by releasing a steady stream of financial tools to lend a hand. We created this app with simplicity and excellence in mind.</p>
          </v-flex>
          <v-flex xs12 md8 lg8 xl6 class="pa-1">
            <v-img  src="../assets/demo3-2.jpg"></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--    sign up -->
    <section class="">
      <center><div class="ma-8">
        <h1>Sign up for EMS</h1>
        <p class="ma-2">From tracking to spending and projections you’ll discover the effortless way to stay on top of it all.  </p>
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