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



<!--            TODO: TOTAL amount spent-->
      <section>
        <h1 class="text-center">Expense</h1>
        <div class="pa-3">
          <v-card max-width="90%" elevation="8">
            <v-card-title>Add New Expense</v-card-title>
            <div class="pa-2 float-left" style="width: 180px" ><v-select
                    :items="items"
                    label="Category"
                    solo
                    v-model="selected"
            ></v-select></div>


            <div class="pa-4">
              <v-text-field v-model="title" label="Title"></v-text-field>
              <v-text-field v-model="amount" label="Amount $"></v-text-field>
<!--              <v-textarea label="Notes" outlined></v-textarea>-->
              <v-text-field v-model="date" label="Date" placeholder="MM-DD-YYYY (Empty for today's date)"></v-text-field>
              <v-btn class="white--text" color="green" small rounded @click="addExpense">Submit</v-btn>
            </div>
          </v-card>
        </div>


      </section>
    </div>
  </div>
</template>

<script>
    import ResponsiveNavView from "../components/ResponsiveNavView";
    import axios from "axios";

    export default {
        name: "Expense",
        components: {
            ResponsiveNavView,
        },
        data() {
            return {
                title: '',
                amount: '',
                notes: '',
                date: '',
                selected: 'Other',
                sessionData: {},
                items2: ["Expense", "Income"],
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
                // make api request to check creds:
                // check if login or signup

                const url = "https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/expense" // straight api url
                let session = JSON.parse(sessionStorage.getItem('session'))

                const data = {
                    "title": this.title,
                    "amount": this.amount,
                    "date": this.date,
                    "category": this.selected
                };

                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        // "Access-Control-Allow-Credentials": false,
                        'authorizationToken': session.sessionId,
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
                    console.log(`response : ${JSON.stringify(response, null, 3)}`);

                    //TODO: Get sessionStorage for expense and add new expense to it
                    // sessionStorage.setItem('session', JSON.stringify(response))
                    let expenses = sessionStorage.getItem('expenses')
                    let parsedExpenses = JSON.parse(expenses)
                    parsedExpenses.push(data)
                    sessionStorage.setItem('expenses', JSON.stringify(parsedExpenses.reverse()))
                    this.$router.push('dashboard')
                })
                .catch((err)=>{
                    console.log(`err : ${JSON.stringify(err, null, 3)}`);
                })
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