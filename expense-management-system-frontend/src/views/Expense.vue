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
        <h1 class="text-center">Expense</h1>
        <div class="pa-3">
          <v-card max-width="90%" elevation="8">
            <v-card-title>Add New Expense</v-card-title>
            <div class="pa-2 float-left" style="width: 180px" ><v-select
                    :items="items"
                    label="Category"
                    solo
            ></v-select></div>

            <div class="pa-4">
              <v-text-field label="Title"></v-text-field>
              <v-text-field label="Amount $"></v-text-field>
              <v-textarea label="Notes" outlined></v-textarea>
              <v-text-field label="Date" placeholder="MM-DD-YYYY (Empty for today's date)"></v-text-field>
              <v-btn class="white--text" color="green" small rounded>Submit</v-btn>
            </div>
          </v-card>
        </div>

        <div class="pa-3">
          <v-card max-width="90%" elevation="8">
            <v-card-title class="justify-center">Expense History</v-card-title>
            <ExpenseHistory></ExpenseHistory>
          </v-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
    import ResponsiveNavView from "../components/ResponsiveNavView";
    import ExpenseHistory from "../components/ExpenseHistory";

    export default {
        name: "Expense",
        components: {
            ResponsiveNavView,
            ExpenseHistory
        },
        data() {
            return {
                title: '',
                amount: '',
                notes: '',
                date: '',
                sessionData: {},
                items: ['Food', 'Clothes', 'Bills', "Entertainment", "Rent", "Other"],
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
                    console.log(`session : ${JSON.stringify(session, null, 3)}`);
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