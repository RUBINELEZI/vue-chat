<template>
    <div class="chat">
        <nav>
            <div class="nav-wrapper">
                <p href="#" class="brand-logo">{{this.name}}</p>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a @click="logOut">Log Out</a></li>
                </ul>
            </div>
        </nav>
        
        <div class="chat container">
            <div class="card">
                <div class="card-content">
                    <ul class="msg" v-chat-scroll>
                        <li v-for="msg in messages" :key="msg.id">
                            <span class="name blue-text text-darken-3">{{msg.name}}:</span>
                            <span class="grey-text text-darken-3 chatMsg">{{msg.message}}</span>
                            <span class="grey-text time">{{msg.date}}</span>
                        </li>
                    </ul>
                </div>
                <div class="input-field card-action">
                   <Msg :name="name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Msg from '@/components/Msg'
    import fb from '@/Firebase/init'
    //to format the time
    import moment from 'moment'
    
    export default {
        name: 'Chat',
        props: ['name'],
        data() {
            return {
                messages: [],
            }
        },
        components: {
            Msg
        },

        methods: {
            logOut() {
                this.$router.push({ name: 'Main' })
            }
        },

        created() {
            //reference to collection
            let ref = fb.collection('msg').orderBy('date')
            //snapshotfromDb
            ref.onSnapshot(snapshot => {
                //listen to change
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc
                        this.messages.push({
                            id: doc.id,
                            name: doc.data().name,
                            date: moment(doc.data().date).format('lll') ,
                            message: doc.data().message
                        })
                    }
                })
            })
        }

    }
</script>

<style>
    .nav-wrapper {
        background-color: #1565C0;
    }

    .brand-logo{
        margin-left: 15px;
    }

    .chat span{
        font-size: 1.4em;
    }

    .chat .time{
        display: block;
        font-size: 0.8em;
    }

    .name{
        margin-right:5px;

    }

    .chatMsg{
        font-weight: 200;
    }

    
    .input-field input:focus + label {
        color: #1565c0 !important;
    }
    
    .input-field input:focus {
        border-bottom: 1px solid #1565c0 !important;
        box-shadow: 0 1px 0 0 #1565c0 !important
    }

    .msg{
        max-height:500px;
        overflow:auto;
        
    }




</style>