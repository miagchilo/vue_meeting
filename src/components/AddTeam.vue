<template>
  <div class="AddTeam col-6">
      <div class="input-block form-group">
          <span>Название команды</span>
          <input class="form-control" type="text" v-model="name">
          <span class="error-msg text-warning">{{this.error}}</span>
      </div>
      <button class="btn btn-info" @click="addTeam()">Добавить</button>
  </div>
</template>
<script>
import DataService from ".././dataService";
export default {
  data() {
    return {
      name: "",
      error: ""
    };
  },
  methods: {
    addTeam() {
      let name = this.name; 
      let teams = this.$store.getters.teams;
      if (name) {
        if (this.findName(teams, name) == false) {
          this.error = "Такая команда уже есть";
        } else {
          this.$store.commit("ADD_TEAM", { teamName: this.name });
          DataService.sendData(this.$store, "команды");
          this.name = "";
          this.error = "";
        }
      }
    },
    findName(arr, name) {
      for (let i = 0; i < arr.length; i++) {
        if (name == arr[i].teamName) {
          return false;
          break;
        }
      }
    }
  }
};
</script>
