  
<template>
    <div class="TeamPageComponent container">
        <h2 class="text-center main-header"> Команда: {{this.teamName}}</h2>
        <div class="row add-meeting-btn">
          <button class="btn btn-success "  @click="showModal = true">Добавить встречу</button>
        </div>
        <div class="row">
          <div class="col-3">
            <select-user-component :users="addUsers" 
                                :add="true" 
                                @add-user="addUser">
                                Все пользователи
            </select-user-component>
          </div>
          <div class="col-3">
            <select-user-component :users="teamUsers" 
                                  :remove="true" 
                                  @remove-user="removeUser">
                                  Пользователи в команде
            </select-user-component>
          </div>
          <div class="col-6">
            <div class="meetings">
              <h3>Встречи</h3>
              <meeting-list v-bind:meetings="meetings"></meeting-list>
            </div>
          </div>
          
          <add-meeting :users="teamUsers" 
                      :team="this.teamId" 
                      :teamName="this.teamName"
                      v-if="showModal" 
                      @close="showModal = false">
          </add-meeting>  
          
        </div>
    </div>
</template>
<script>
import DataService from ".././dataService";
import _ from "lodash";
import AddMeeting from "./AddMeeting.vue";
import SelectUserComponent from "./SelectUserComponent.vue";
import MeetingList from "./MeetingList.vue";
export default {
  data() {
    return {
      teamName: "",
      teamId: 0,
      showModal: false
    };
  },
  components: { AddMeeting, SelectUserComponent, MeetingList },
  computed: {
    addUsers() {
      return _.differenceBy(
        this.$store.getters.users,
        this.$store.getters.teams[this.teamId].users,
        "id"
      );
    },
    teamUsers() {
      return this.$store.getters.teams[this.teamId].users;
    },
    meetings() {
      return _.filter(this.$store.getters.meetings, item => {
        return item.teamId == this.teamId;
      });
    }
  },
  created() {
    DataService.getData(this.$store, false, "users");
    DataService.getData(this.$store, false, "teams");
    DataService.getData(this.$store, false, "meetings");
    this.teamId = this.$route.params.id;
    this.teamName = this.$store.getters.teams[this.teamId].teamName;
  },
  methods: {
    getUser(item, position) {
      return _.find(item.teamUsers, o => {
        return o.id == position;
      }).userName;
    },
    addUser(item) {
      this.$store.commit("ADD_USER_TO_TEAM", {
        user: item,
        teamId: this.teamId
      });
      DataService.sendData(this.$store, "teams");
    },
    removeUser(item) {
      this.$store.commit("REMOVE_USER_OF_TEAM", {
        user: item,
        teamId: this.teamId
      });
      DataService.sendData(this.$store, "teams");
    },
    changeStatus(a, b) {}
  }
};
</script>
