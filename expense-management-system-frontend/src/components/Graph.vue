

<script>
    // CommitChart.js
    import VueCharts from 'vue-chartjs';
    export default {
        extends: VueCharts.Bar,
        mounted () {

            let expenses = sessionStorage.getItem('expenses')
            let parsedExpenses = JSON.parse(expenses)

            let today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            let week1=0;
            let week2=0;
            let week3=0;
            let week4=0;

            parsedExpenses.forEach((expense)=>{
                let eDate = expense.date
                let month = eDate.substr(0,2)
                let day = eDate.substr(3,2)
                
                if(day && day != undefined && day != NaN){
                    if(Number(day) <= 7 && mm == month){
                        week1 += Number(expense.amount) ? Number(expense.amount) : 0
                    }
                    else if (Number(day) <= 14 && mm == month){
                       week2 += Number(expense.amount) ? Number(expense.amount) : 0
                    }
                    else if (Number(day) <= 21 && mm == month){
                       week3 += Number(expense.amount) ? Number(expense.amount) : 0
                    } else if (Number(day) > 21 && mm == month) {
                        week4 += Number(expense.amount) ? Number(expense.amount) : 0
                    }
                }

            })

            let orderLabels = [`${mm}/01`, `${mm}/08`, `${mm}/15`, `${mm}/22`];
            let orderTotalData = [week1, week2, week3, week4];

            this.renderChart({
                labels: orderLabels,
                datasets: [
                    {
                        fontColor: 'red',
                        backgroundColor: 'rgba(70,130,180, 0.8)',
                        borderColor: 'rgba(0,0,139, 1)',
                        data: orderTotalData,
                        label: 'Monthly spending for this month',
                    },
                ]
            }, {
                responsive: true,
                maintainAspectRatio: false,
            })
        }
    }
</script>