<template>
    <div class="chat">
        <div class="chat container">
            <div class="card">
                <nav>
                    <div class="nav-wrapper">
                        <p  class="brand-logo">{{this.name}}</p>
                        <ul id="nav-mobile" class="right logout">
                            <li><a @click="logOut">Log Out</a></li>
                        </ul>
                    </div>
                </nav>
                <div class="card-content">
                    <div>
                        <ul class="messages" v-chat-scroll>
                            <li class="chat-message " v-for="msg in messages" :key="msg.id">
                                <div class="right-bubble " v-if="msg.name === name">
                                    <span class="blue-text text-darken-3">{{ msg.name }}&nbsp;</span>
                                    <span class="grey-text text-darken-3">{{ msg.message }}</span>
                                    <span class="grey-text time">{{ msg.date }}</span>
                                </div>
                                <div class="left-bubble" v-if="msg.name !== name">
                                    <span class="blue-text text-darken-3">{{ msg.name }}&nbsp;</span>
                                    <span class="grey-text text-darken-3">{{ msg.message }}</span>
                                    <span class="grey-text time">{{ msg.date }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
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

        },
        methods: {
            logOut() {
                this.$router.push({ name: 'Main' })
            },
        }
    }
</script>

<style scoped>

    *{
        margin:0;
        padding:0;
    }
    .nav-wrapper {
        background-color: #1565C0;
    }

    .brand-logo{
        margin-left: 15px;
    }

    .logout{
        margin-right:15px;
    }



    .container {
        border-radius: 5px;
        max-width: 800px;
        margin: auto;
        
    }

    .card {
        margin-top: 20px;
        margin-bottom: 20px;
        
    }

    .card-content {
        background-color: #243447;
    }

    .chat h2 {
        font-size: 2.6em;
        margin-bottom: 40px;
    }

    .chat span {
        font-size: 1.4em;
    }

    .chat .time {
        display: block;
        font-size: 0.8em;
    }

    .messages {
        height: 65vh;
        overflow: auto;
    }

    .chat-message {
        width: 80%;
        min-height: 40px;
        word-break: break-all;
        
    }

        .chat-message .right-bubble {
            position: relative;
            background: #dcf8c6;
            border-top-left-radius: .4em;
            border-bottom-left-radius: .4em;
            border-bottom-right-radius: .4em;
            padding: 5px 10px 10px;
            margin-bottom: 10px;
            left: 50%;
            width: 70%;
            display: inline-block
        }

            .chat-message .right-bubble:after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 0;
                height: 0;
                border: 27px solid transparent;
                border-left-color: #dcf8c6;
                border-right: 0;
                border-top: 0;
                margin-top: -0.5px;
                margin-right: -25px;
            }

        .chat-message .left-bubble {
            position:relative;
            background: #efefef;
            border-top-right-radius: .4em;
            border-bottom-left-radius: .4em;
            border-bottom-right-radius: .4em;
            padding: 5px 10px 10px;
            margin-bottom: 10px;
            left: 5%;
            width: 70%;
        }

            .chat-message .left-bubble:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 0;
                height: 0;
                border: 27px solid transparent;
                border-right-color: #efefef;
                border-left: 0;
                border-top: 0;
                margin-top: -0.5px;
                margin-left:-25px
            }

            

    .messages::-webkit-scrollbar{
        width: 3px;
    }

    .messages::-webkit-scrollbar-track {
        background: #ddd
    }

    .messages::-webkit-scrollbar-thumb {
        background: #aaa;
    }




</style>