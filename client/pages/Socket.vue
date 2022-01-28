<template>
    <div>
        <button @click="getMessageAlt">Przycisk, który coś robi</button>
        <ul>
            <li v-for='(person, i) in socketData' :key='i'>{{ person.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
data () {
    return {
        socketData: []
    }
},
created() {
    this.socket = this.$nuxtSocket({
        name: 'ComplainsGateway'
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