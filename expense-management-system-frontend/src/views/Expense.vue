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
            <div class="pa-2 float-left" style="width: 210px" ><v-select
                    prepend-inner-icon="mdi-form-select"
                    :items="items"
                    label="Category"
                    solo
                    v-model="selected"
                    hint="Category"
                    persistent-hint
            ></v-select></div>


            <div class="pa-4">
              <v-text-field prepend-inner-icon="mdi-clipboard-text" v-model="title" label="Title"></v-text-field>
              <v-text-field prepend-inner-icon="mdi-cash-usd" v-model="amount" label="Amount $"></v-text-field>
<!--              <v-textarea label="Notes" outlined></v-textarea>-->
              <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                          v-model="computedDateFormatted"
                          label=""
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
<!--              <v-text-field v-model="date2" label="Date" placeholder="MM-DD-YYYY (Empty for today's date)"></v-text-field>-->
              <v-btn class="white--text mt-3" color="green" small rounded @click="addExpense">Submit</v-btn>
            </div>
          </v-card>
        </div>


      </section>

      <section>
        <h1 class="text-center">Income</h1>
        <div class="pa-3">
          <v-card max-width="90%" elevation="8">
            <v-card-title>Update Your income</v-card-title>
            <div class="pa-4">
              <v-text-field prepend-inner-icon="mdi-cash-usd" persistent-hint hint="Total income amount will be updated." v-model="incomeAmount" label="Income Amount $"></v-text-field>
              <v-btn class="white--text mt-3" color="green" small rounded @click="addIncome">Submit</v-btn>
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
                date2: '',
                incomeAmount:'',
                incomeTile: '',
                selected: 'Other',
                sessionData: {},
                items2: ["Expense", "Income"],
                items: ['Food', 'Clothes', 'Bills', "Entertainment", "Rent", "Other"],
                menu2: false,
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10))
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

            addIncome: function() {
                if(this.incomeAmount !== '' && this.incomeAmount !== null && this.incomeAmount !== undefined){
                    // send api request
                    const url = "https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/income" // straight api url
                    let session = JSON.parse(sessionStorage.getItem('session'))

                    const data = {
                        "amount": this.incomeAmount
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
                        // update session and push to dashboard
                        let response = results.data
                        
                        sessionStorage.setItem('income', this.incomeAmount)
                        this.$router.push('dashboard')
                        
                    }).catch((err)=>{
                        console.log(`err : ${JSON.stringify(err, null, 3)}`);
                    })


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
                    "date": this.dateFormatted,
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
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },

        computed: {
            callSessionCheck: function () {
                return this.sessionCheck();
            },
            computedDateFormatted () {
                return this.formatDate(this.date)
            },
        },
        watch: {
            date (val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },
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