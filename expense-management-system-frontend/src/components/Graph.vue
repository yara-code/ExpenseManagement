

<script>
    // CommitChart.js
    import VueCharts from 'vue-chartjs';
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        extends: VueCharts.Bar,
        computed: {
            ...mapGetters(['getReports']),
            ...mapState(['reports']),
            ...mapActions([]),
        },
        mounted () {
            // Overwriting base render method with actual data.
            // TODO: get data from state and put it in an array
            // TODO: Labels =
            let orderLabels = ["label1", "label2", "label3"];
            let orderTotalData = [36, 98, 34];

            this.renderChart({
                labels: orderLabels,
                datasets: [
                    {
                        fontColor: 'red',
                        backgroundColor: 'rgba(70,130,180, 0.8)',
                        borderColor: 'rgba(0,0,139, 1)',
                        data: orderTotalData,
                        label: 'Number Of Orders Made',
                    },
                ]
            }, {
                responsive: true,
                maintainAspectRatio: false,
            })
        }
    }
</script>