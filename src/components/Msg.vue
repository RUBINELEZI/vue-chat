<template>
    <div class="msg row">
        <form @submit.prevent="addMsg" >
            <div class="input-field col s11">
                <i class="material-icons prefix blue-text text-darken-3">chat</i>
                <input id="icon_prefix" type="text" class="validate" name="new-message" v-model="newMsg">
                <label for="icon_prefix">Enter your message</label>
                <p class="red-text" v-if="err">{{err}}</p>
            </div>
        </form>
        <div class="btnn col s1">
            
            <a @click.prevent="addMsg"><i class="btnn material-icons prefix blue-text text-darken-3">send</i></a>
        </div>
    </div>
</template>

<script>
    import fb from '@/Firebase/init'
    export default {
        name: 'NewMsg',
        props: ['name'],
        data() {
            return {
                newMsg: null,
                err: null,
            }
        },

        methods: {
            addMsg() {
                if (this.newMsg) {
                    fb.collection('msg').add({
                        message: this.newMsg,
                        name: this.name,
                        date: Date.now()
                    })
                    this.newMsg = null
                    this.err = null
                } else {
                    this.err = 'You must enter a message'
                }
            }
        }
    }
</script>

<style>
  .btnn{
      margin-top: 50px;
      cursor:pointer;
  }

   
</style>