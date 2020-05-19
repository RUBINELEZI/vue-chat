<template>
  <div class="main">
      <div class="container">
          <div class="card m3 center-align">
              <h1 class="head blue-text text-darken-3">Get Started</h1>
              
              <form @submit.prevent="nameField">
                  <div class="row">
                      <div class="row">
                          <div class="input-field col s10">
                              <i class="material-icons prefix blue-text text-darken-3">account_circle</i>
                              <input id="icon_prefix" type="text" class="validate" v-model="userName">
                              <label for="icon_prefix">Enter your name</label>
                              <p class="red-text" v-if="err">{{err}}</p>
                          </div>
                          <div class="input-field col s2">
                              <button class="btn waves-effect waves-light blue darken-3"  @submit.prevent="nameField">Enter</button>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
      
  </div>
</template>

<script>
   
    export default {
        name: 'Main',
        data() {
            return {
                userName: null,
                err: null
            }
        },
       
        methods: {
            nameField() {
                if ( this.userName && /\S/.test(this.userName)) {
                    this.$router.push({ name: 'Chat', params: {name: this.userName}})
                } else {
                    this.err = 'You must enter name'
                }
            }
        }
}
</script>


<style>
    * {
        font-family: 'Montserrat', sans-serif;
        margin: auto;
    }

    /* label focus color */
    .input-field input:focus + label {
        color: #1565c0 !important;
    }
    /* label underline focus color */
    .row .input-field input:focus {
        border-bottom: 1px solid #1565c0 !important;
        box-shadow: 0 1px 0 0 #1565c0 !important
    }

    .main {
        margin-top: 100px;
        max-width: 1000px;
    }

    .head{
        padding-top:30px;
    }

    .btn{
        margin-top:20px;
    }
</style>
