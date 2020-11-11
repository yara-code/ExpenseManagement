<template>
  <div  >
    <v-icon large  @click="drawer = !drawer" v-show="!drawer">mdi-menu</v-icon>
    <v-navigation-drawer app v-model="drawer" >
      <v-icon large  @click="drawer = !drawer" >mdi-backburger</v-icon>
      <p v-bind:style="{cursor: pointer}" v-on:click="navigate('/dashboard')" ><v-icon>mdi-view-dashboard</v-icon> Dashboard</p>
      <p v-bind:style="{cursor: pointer}" v-on:click="navigate('/expense')" > <v-icon>mdi-cash-usd</v-icon> Add Expense</p>
      <p v-bind:style="{cursor: pointer}" v-on:click="navigate('/settings')"> <v-icon>mdi-cog</v-icon> Settings</p>
      <p  v-on:click="navigate('/')" ><v-icon large>mdi-logout</v-icon> Logout</p>
    </v-navigation-drawer>
  </div>
</template>

<script>
    export default {
        name: "ResponsiveNavView",
        data() {
            return {
                drawer: false,
                pointer: "pointer"
            }
        },
        methods: {
            navigate: async function(route ) {
                console.log(`clicked : ${route}`);
                if (route == '/'){
                    sessionStorage.clear();
                }
                await this.$router.push({path: route})
            }
        }
    }
</script>

<style scoped>

</style>