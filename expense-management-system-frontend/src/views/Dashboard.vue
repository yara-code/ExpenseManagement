<template>
  <div>

    <div v-if="callSessionCheck" style="width: 100%">
      <!--    quick messsage-->
      <section class="topBanner" >
        <div class="float-left"><ResponsiveNavView></ResponsiveNavView></div>
      </section>

      <!--    white bar-->
      <section class="middleBanner">
      </section>

      <!--Hero header and test    -->
      <section class="color1 hero white--text">

      </section>

      <section>
        <div class="float-left pa-2">
          <h1 class="">Dashboard</h1>

<!--          DO NOT NEED -->
<!--          <v-card elevation="4" max-width="170px">-->
<!--            <v-card-title class="text-center justify-center">Add Expense</v-card-title>-->
<!--            <center><v-btn color="white" fab elevation="0" @click="addExpense">-->
<!--              <v-icon color="green darken-2" large>mdi-plus-circle-outline</v-icon>-->
<!--            </v-btn></center>-->
<!--            <div class="py-1"></div>-->
<!--          </v-card>-->

          <div class="pa-3">
            <v-card max-width="90%" elevation="8">
              <v-card-title class="justify-center">Expense History</v-card-title>
              <ExpenseHistory></ExpenseHistory>
            </v-card>
          </div>


          <v-row>
            <v-col>
              <div class="pt-8">
                <v-card elevation="8" max-width="500px">
                  <v-card-title class="justify-center text-center">Total Expense Per Week</v-card-title>
                  <center><Graph></Graph></center>

                </v-card>
              </div>
            </v-col>

            <v-col>
              <div class="pt-4" >
                <v-card elevation="8" class="pb-3" max-width="500px">
                  <v-card-title class="justify-center text-center">Spending Habbits: </v-card-title>
                  <center><Chart></Chart></center>
                </v-card>

              </div>
            </v-col>
          </v-row>




        </div>
      </section>

    </div>



  </div>
</template>

<script>
  import ResponsiveNavView from "../components/ResponsiveNavView";
  import Graph from "../components/Graph";
  import Chart from "../components/Chart";
  import ExpenseHistory from "../components/ExpenseHistory";
  import axios from "axios";

    export default {
        name: "Dashboard",
        components: {
            ResponsiveNavView,
            Graph,
            Chart,
            ExpenseHistory
        },
        data() {
            return {
                sessionData: {}
            }
        },
        methods: {
            sessionCheck: function () {
                let session = sessionStorage.getItem('session')
                session = JSON.parse(session)
                if(!session || session == null){
                    this.$router.push('login')
                } else {
                    this.sessionData = session;
                    console.log(`session : ${session}`);
                    console.log(`this.session : ${JSON.stringify(this.session, null, 3)}`);
                    return true
                }
            },

            addExpense: function () {
              this.$router.push('/expense')
            },

        },
        computed: {
            callSessionCheck: function () {
                return this.sessionCheck();
            }
        }
    }
</script>


<style scoped>
  section {
    width: 100%;
    text-align: left;
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
    width: 100%;
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