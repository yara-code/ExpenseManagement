<template>
  <div>
    <v-data-table
            :headers="headers"
            :items="expenses"
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
                expenses: [
                    {
                        title: 'Frozen Yogurt',
                        category: 'Food',
                        amount: 23.89,
                        date: "11-10-20",
                    },
                    {
                        title: 'Pizza',
                        category: 'Food',
                        amount: 33.89,
                        date: "11-10-20",
                    },
                    {
                        title: 'Monthly Rent',
                        category: 'Rent',
                        amount: 1889.00,
                        date: "11-01-20",
                    },
                    {
                        title: 'Frozen Yogurt',
                        category: 'Food',
                        amount: 23.89,
                        date: "11-10-20",
                    },
                    {
                        title: 'Water Bill',
                        category: 'Bill',
                        amount: 41.09,
                        date: "11-03-20",
                    },
                    {
                        title: 'Netflix',
                        category: 'Bill',
                        amount: 18.99,
                        date: "11-10-20",
                    },
                    {
                        title: 'Skytrak',
                        category: 'Other',
                        amount: 199.99,
                        date: "11-04-20",
                    },

                ],

            }
        },
        methods: {

        },
    }
</script>

<style scoped>

</style>