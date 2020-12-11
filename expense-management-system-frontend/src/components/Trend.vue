<template>
  <div>
    <div>
      <v-card-title>Trends</v-card-title>
      <v-card-subtitle>You're trending to spend: ${{trendingSpent}} for this month</v-card-subtitle>
      <v-card-text class="text-left">Daily Spending Average: ${{dailyAvg}}</v-card-text>
      <div class="progress2 mx-3" >
          <div class="progress-done2 white--text ">{{progressDone2}}</div>
       </div>
      <v-card-text class="text-left">Your project income spent for the month</v-card-text>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Trend",
        data() {
            return {
                trendingSpent: 0,
                dailyAvg: 0,
                income: 0,
                progressDone2: "0%"
            }
        },
        methods: {
          setData: function () {
              let income = sessionStorage.getItem('income')
              let parsedIncome = JSON.parse(income)
              let incomeAmount = Number(parsedIncome.amount)
              // console.log(`incomeAmount  : ${incomeAmount}`);
              this.income = incomeAmount

              let expenses = sessionStorage.getItem('expenses') ? sessionStorage.getItem('expenses') : 0
              let parsedExpenses = JSON.parse(expenses)
              let today = new Date()
              let dd = String(today.getDate()).padStart(2, '0');
              let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              let yyyy = today.getFullYear();

              let spent = 0;
              parsedExpenses.forEach((expense) =>{
                  let eDate = expense.date
                  let month = eDate.substr(0,2)
                  if(month == mm){
                      spent += Number(expense.amount)
                  }
              })

              // / the days and amount spent to get the avg
              let avg = Number(spent) / Number(dd)
              this.dailyAvg = avg.toFixed(2)
              
              // get total days in a month: mm + 1
              let daysInMonth = new Date(yyyy, mm, 0).getDate();
              let daysRemaining = Number(daysInMonth) - Number(mm)

              //TODO: trendingSpent does not add already spent expenses
              //TODO: ---------------->
              // take the remaining days and multiple by the average then add what is already spent:
              console.log(`avg: ${JSON.stringify(avg, null, 3)}`);
              console.log(`daysRemainning : ${JSON.stringify(daysRemaining, null, 3)}`);
              console.log(`avg*daysRemaininng : ${avg * daysRemaining}`);
              console.log(`avg*daysRemaininng   ) + spent : ${(avg * daysRemaining) + spent}`);
              console.log(`spent : ${JSON.stringify(spent, null, 3)}`);
              let trending = (avg * daysRemaining) + spent

              this.trendingSpent = trending.toFixed(2)
              this.setProgressTrends()
          },

            setProgressTrends: function () {
                let progress= document.querySelector('.progress-done2');


                let done = (this.trendingSpent / this.income) * 100;
                done = done > 100 ? 100 : done.toFixed(2)
                setTimeout(()=>{
                    if(done == NaN || done == "NaN"){
                        done = 0
                    } else {
                        if(done == 0){
                            done = 100
                        }
                        // console.log(`done trending : ${done}`);
                        progress.style.opacity = 1;
                        if(done < 16){
                            progress.style.width = 16 + "%"
                            progress.classList.add('text-caption')
                        } else {
                            progress.style.width = done + "%"
                        }
                        this.progressDone2 = done + "%"
                    }
                }, 500);
            },


        },
        mounted() {
            this.setData();
        }
    }
</script>

<style scoped>
  .progress2 {
    background:#d8d8d8;
    border-radius: 20px;
    height: 30px;
    width: 300px;

  }
  .progress-done2 {
    background: linear-gradient(180deg, rgba(42,96,44,.9) 13%, rgba(76,175,80,1) 85%);
    box-shadow: 0 2px 2px -3px rgba(42,96,44,.9), 0 1px 3px rgba(76,175,80,1);
    border-radius: 20px;
    display: flex;
    align-item: center;
    justify-content: center;
    height: 100%;
    opacity: 0;
    width: 0px;
    transition: 1s ease;
  }
</style>