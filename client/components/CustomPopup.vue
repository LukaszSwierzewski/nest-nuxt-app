<template>
  <div>
    <h1>popup test</h1>
    <p @click='closeModal()'>close popup</p>
    <p @click="onAction()">Do something</p>
    {{ modalData }}
  </div>
</template>
<script>

export default {
  props: {
    modalData: {
      required: true,
      type: Object
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', {})
    },
    onAction() {
      this.$emit('onAction', this.modalData)
    }

  }
}
</script>