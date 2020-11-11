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


      <section>

        <h1 class="text-center">Settings</h1>
        <div class="pa-3">
          <v-card class="" max-width="1000px">
            <v-simple-table >
              <tr>
                <td>
                  <v-card-text>Username:</v-card-text>
                </td>
                <td>
                  <v-text-field class="px-2"  v-model="username" label="Username" outlined shaped></v-text-field>
                </td>
              </tr>

              <tr>
                <td>
                  <v-card-text>Email:</v-card-text>
                </td>
                <td>
                  <v-text-field class="px-2"  v-model="email" label="Email" outlined shaped></v-text-field>
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
                          class="input-group--focused px-2"

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
                          class="input-group--focused px-2"

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
                          class="input-group--focused px-2"

                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <v-btn class="ma-4" v-on:click="save()" type="password" rounded color="primary">Save</v-btn>
              </tr>
            </v-simple-table>

          </v-card>
        </div>

      </section>
    </div>
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
                show2: false,
                sessionData: {},
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

            addExpense: function () {
                this.$router.push('/expense')
            },

        },
        computed: {
            callSessionCheck: function () {
                return this.sessionCheck();
            }
        }
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