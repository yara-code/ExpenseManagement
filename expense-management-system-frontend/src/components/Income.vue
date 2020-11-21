<template>
  <div>
        <v-card-title>Monthly Income Tracker</v-card-title>
        <v-card-text class="text-left">Total Income: ${{income}}</v-card-text>
        <div class="progress mx-3" >
          <div class="progress-done white--text">{{progressDone}}</div>
        </div>
        <v-card-text class="text-left">Total amount spent for the month: ${{spent}}</v-card-text>
  </div>
</template>

<script>
    export default {
        name: "Income",
        data() {
            return {
                opacity: 0,
                width: "0px",
                progressDone: "0%",
                income: 0,
                spent: 0,
                total: 0,
            }
        },
        methods: {
            setProgress(){
                let progress= document.querySelector('.progress-done');


                let done = (this.spent / this.income) * 100;
                done = done > 100 ? 100 : done.toFixed(2)
                console.log(`done : ${done}`);
                console.log(`income : ${this.income}`);
                console.log(`spent : ${this.spent}`);
                setTimeout(()=>{
                    progress.style.opacity = 1;
                    progress.style.width = done + "%"
                    this.progressDone = done + "%"
                }, 500);
            },
            getIncome(){
                let income = Number(sessionStorage.getItem('income')) ? Number(sessionStorage.getItem('income')) : 0
                let expenses = sessionStorage.getItem('expenses') ? sessionStorage.getItem('expenses') : 0
                let parsedExpenses = JSON.parse(expenses)
                let today = new Date()
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                let spent = 0;
                parsedExpenses.forEach((expense) =>{
                    let eDate = expense.date
                    let month = eDate.substr(0,2)
                    if(month == mm){
                        spent += Number(expense.amount)
                    }
                })
                this.income = income.toFixed(2)
                this.spent = spent.toFixed(2)
                this.setProgress();
            },
        },
        mounted() {
            this.getIncome();
        }
    }
</script>

<style scoped>
.progress {
  background:#d8d8d8;
  border-radius: 20px;
  height: 30px;
  width: 300px;

}
  .progress-done {
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





















