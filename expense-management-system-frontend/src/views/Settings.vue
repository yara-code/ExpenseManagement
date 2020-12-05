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
                  <v-text-field class="px-2 mt-2"  v-model="username" label="Username" outlined shaped></v-text-field>
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

<!--              <tr>-->
<!--                <td>-->
<!--                  <v-card-text>Current Password::</v-card-text>-->
<!--                </td>-->
<!--                <td>-->
<!--                  <v-text-field-->
<!--                          v-model="cPassword"-->
<!--                          outlined shaped label="Current Password"-->
<!--                          :type="show2 ? 'text' : 'password'"-->
<!--                          name="input-10-2"-->
<!--                          hint="At least 8 characters"-->
<!--                          value=""-->
<!--                          class="input-group&#45;&#45;focused px-2"-->

<!--                  ></v-text-field>-->
<!--                </td>-->
<!--              </tr>-->

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
                          hint="At least 7 characters"
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
                          hint="At least 7 characters"
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
    import axios from "axios";

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


            save: function(){

                let update = {}

                if(this.nPassword !== "" &&  this.confirmPassword !== "" ){
                  if(this.nPassword !== this.confirmPassword){
                      // show error
                  } else {
                    // Update password
                      update.password = this.nPassword
                  }
                }

                if(this.username !== this.sessionData.user.username){
                    // update username
                    update.username = this.username
                }

                if(this.email !== this.sessionData.user.email){
                    //update email
                    update.email = this.email
                }

                // check if update is null
                if(update && (update.password || update.username || update.email)){
                    // update request
                    let session = JSON.parse(sessionStorage.getItem('session'))
                    const url = `https://mbk3bzr9d4.execute-api.us-west-1.amazonaws.com/dev/user/${session.accountId}` // straight api url

                    const data = {
                        "username": update && update.username ? update.username : "",
                        "email": update && update.email ? update.email : "",
                        "password": update && update.password ? update.password :""
                    };
                    
                    
                    const options = {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                            // "Access-Control-Allow-Credentials": false,
                            'authorizationToken': session.sessionId,
                        },
                        crossDomain: true,
                        withCredentials: false,
                        data: data,
                        url,
                    };

                    axios(options)
                        .then((results)=>{
                            let response = results.data

                            let newSesstion = sessionStorage.getItem('session')
                            let parsedSession = JSON.parse(newSesstion)
                            if(data.username != ""){
                                parsedSession.username = data.username
                                parsedSession.user.username = data.username
                            }
                            if(data.email != ""){
                              parsedSession.user.email = data.email
                            }
                            sessionStorage.setItem('session', JSON.stringify(parsedSession))
                            this.$router.push('dashboard')
                        })
                        .catch((err)=>{
                            console.log(`err : ${JSON.stringify(err, null, 3)}`);
                        })
                } else {
                    // do nothing
                }

            },

            settings: function () {
                let session = JSON.parse(sessionStorage.getItem('session'))
                let user = session.user

                this.username = user.username
                this.email = user.email


            }

        },
        computed: {
            callSessionCheck: function () {
                return this.sessionCheck();
            }
        },
        mounted() {
          this.settings()
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