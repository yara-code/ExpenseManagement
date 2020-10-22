<template>
  <div>
    <ResponsiveNavView></ResponsiveNavView>
    <h1 class="text-center">Settings</h1>
    <v-card width="1200px" class="mx-auto">
      <v-simple-table>
        <tr>
          <td>
            <v-card-text>Username:</v-card-text>
          </td>
          <td>
            <v-text-field class="ma-2"  v-model="username" label="Username" outlined shaped></v-text-field>
          </td>
        </tr>

        <tr>
          <td>
            <v-card-text>Email:</v-card-text>
          </td>
          <td>
            <v-text-field class="ma-2"  v-model="email" label="Email" outlined shaped></v-text-field>
          </td>
        </tr>

        <tr>
          <td>
            <v-card-text>Current Password::</v-card-text>
          </td>
          <td>
            <v-text-field
                    v-model="cPassword"
                    outlined shaped label="Current Password"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused ma-2"

            ></v-text-field>
          </td>
        </tr>

        <tr>
          <td>
            <v-card-text>New Password:</v-card-text>
          </td>
          <td>
            <v-text-field
                    v-model="nPassword"
                    outlined shaped label="New Password"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused ma-2"

            ></v-text-field>
          </td>
        </tr>

        <tr>
          <td>
            <v-card-text>Confirm Password:</v-card-text>
          </td>
          <td>
            <v-text-field

                    v-model="confirmPassword"
                    outlined shaped label="Confirm Password"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused ma-2"

            ></v-text-field>
          </td>
        </tr>
        <tr>
          <v-btn class="ma-4" v-on:click="save()" type="password" rounded color="primary">Sign up</v-btn>
        </tr>
      </v-simple-table>

    </v-card>
  </div>
</template>

<script>
    import ResponsiveNavView from "../components/ResponsiveNavView";

    export default {
        name: "Settings",
        components: {ResponsiveNavView},
        data() {
            return {
                username: "",
                email: "",
                cPassword: "",
                nPassword: "",
                confirmPassword: "",
            }
        },
    }
</script>

<style scoped>

</style>