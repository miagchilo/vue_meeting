<template>
  <div class="TeamsList col-6">
    <div class="Item"  v-for="item in teams" :key='item.id'>
      <router-link :to="{name:'teampage', params: {id: item.id}}">{{ item.teamName }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    teams() {
      return this.$store.getters.teams
    }
  }
}
</script>
