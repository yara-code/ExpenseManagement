<template>
  <div>
    <v-data-table
            :headers="headers"
            :items="expensesItems"
            :items-per-page="5"
            class="elevation-4"
    ></v-data-table>
  </div>
</template>

<script>
    export default {
        name: "ExpenseHistory",
        data() {
            return {
                headers: [
                    {
                        text: 'Title',
                        align: 'start',
                        sortable: false,
                        value: 'title',
                    },
                    { text: 'Category', value: 'category' },
                    { text: 'Amount $', value: 'amount' },
                    { text: 'Date', value: 'date' },
                ],
            }
        },
        methods: {
        },
        computed: {
            expensesItems(){
                let expenses = sessionStorage.getItem('expenses')
                let parsedExpenses = JSON.parse(expenses)
                return parsedExpenses
            }
        },
    }
</script>

<style scoped>

</style>