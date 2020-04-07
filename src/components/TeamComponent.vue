<template>
    <div class="TeamComponent container">
        <h2 class="text-center main-header" >Команды</h2>
        <div class="row">
          <add-team></add-team>
          <teams-list></teams-list>
        </div>
    </div>
</template>
<script>
import AddTeam from "./AddTeam.vue";
import TeamsList from "./TeamsList.vue";
import DataService from ".././dataService";
export default {
  components: { AddTeam, TeamsList },
  created() {
    DataService.getData( this.$store, false, 'teams' );
  }
};
</script>
