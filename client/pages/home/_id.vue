<template>
    <div>
        <h1>
            from {{ paramsID }}
        </h1>
    </div>
</template>

<script>
export default {
  computed: {
    paramsID() {
      return this.$route.params.id;
    },
  },
};
</script>
<style scoped>
</style>