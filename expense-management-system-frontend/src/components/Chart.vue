
<script>
    // CommitChart.js
    import VueCharts from 'vue-chartjs';

    export default {
        extends: VueCharts.Doughnut,

        mounted () {
            // Overwriting base render method with actual data.
            // TODO: get data from sessionStorage and put it in an array
            // TODO:

            let expenses = sessionStorage.getItem('expenses')
            let parsedExpenses = JSON.parse(expenses)
            // console.log(`parse : ${JSON.stringify(parsedExpenses, null, 3)}`);

            let income = 0 //1000;
            let food = 0 //105.254;
            let clothes = 0 //65.25;
            let bills = 0 //425.50;
            let entertainment = 0 //120.31;
            let other = 0 //400.00;
            let rent = 0 //1950.00;

            parsedExpenses.forEach((expense)=>{
                // console.log(`ex : ${JSON.stringify(expense, null, 3)}`);
                switch(expense.category.toLowerCase()){
                    case 'food':
                        food += Number(expense.amount)
                        break;
                    case 'clothes':
                        clothes += Number(expense.amount)
                        break;
                    case 'bills':
                        bills += Number(expense.amount)
                        break;
                    case 'entertainment':
                        entertainment += Number(expense.amount)
                        break;
                    case 'rent':
                        rent += Number(expense.amount)
                        break;
                    case 'other':
                        other += Number(expense.amount)
                        break;
                    break
                }
            })

            let doughnutData = [food.toFixed(2), clothes.toFixed(2), bills.toFixed(2), entertainment.toFixed(2), rent.toFixed(2), other.toFixed(2)];
            this.renderChart({
                labels: ['Food', 'Clothes', 'Bills', "Entertainment", "Rent", "Other"],
                datasets: [
                    {
                        fontColor: 'red',
                        backgroundColor: ['rgba(0,128,0, 0.6)', 'rgba(240,128,128, 0.6)', 'rgba(64,224,208, 0.6)', 'rgba(220,20,60, 0.6)', 'rgba(70,130,180, 0.6)', 'rgba(148,0,211, 0.6)'],
                        borderColor: 'rgba(0,0,0, 1)',
                        data: doughnutData,
                    },
                ]
            }, {
                responsive: true,
                maintainAspectRatio: false,
            })
        }
    }
</script>
