<template>
    <div>
        <button @click="getMessageAlt">Przycisk, który coś robi</button>
        <ul>
            <li v-for='(person, i) in socketData' :key='i'>{{ person.name }}</li>
        </ul>
        {{ counter }}
    </div>
</template>

<script>
import useEvent from "@/composable/events.js";
export default {
data () {
    return {
        socketData: []
    }
},
setup () {
    const { counter } = useEvent()
    return { counter }
},
created() {
    this.socket = this.$nuxtSocket({
        channel: '/complain-namespace'
    })
    this.socket.on('msgToClient', (resp) => {
        this.socketData.push(resp)
    })
},
methods: {
  async getMessageAlt() {
    const emitSocket = await this.socket.emitP('msgToServer', { name: 'Ola jest piękna' })
  },
}
}
</script>

<style>

</style>