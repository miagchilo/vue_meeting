<template>
  <div class="UserList col-6">
    <div class="Item"  v-for="item in users" :key="item.id">
      <span  class="Item__title">{{ item.userName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.getters.users
    }
  }
}
</script>
