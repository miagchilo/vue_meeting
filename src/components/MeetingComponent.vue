<template>
    <div class="MeetingsComponent container">
        <h2 class="text-center main-header">Встречи</h2>
        <div class="row">
          <div class="col3">
            <div class="meetings-filters">
                <h3>Фильтры</h3>
                <div class="input-block form-group">
                    <span>Начало</span>
                    <input class="form-control" type="datetime-local"  v-model="startTime">
                </div>
                <div class="input-block form-group">
                    <span>Конец встречи</span>
                    <input class="form-control" type="datetime-local"  v-model="endTime">
                    
                </div>
                <div class="input-block form-group">
                    <span>Команда</span>
                    <input class="form-control" type="text" v-model="team">
                </div>
                <div class="input-block form-group">
                    <span>Статус</span>
                    <input class="form-control" type="text" v-model="status" >
                </div>
                <div class="input-block form-group">
                    <span>Пользователь</span>
                    <input class="form-control" type="text" v-model="user">
                </div>
            </div>
          </div>
          <div class="col-9">
            <meeting-list :meetings="filterMeetings"
                          @changeStatus="changeStatus"
                          v-bind:showBtns="true"></meeting-list>
          </div>
        </div>
    </div>
</template>
<script>
import MeetingList from "./MeetingList.vue";
import DataService from ".././dataService";
import _ from "lodash";
export default {
  data() {
    return {
      status: "",
      startTime: "",
      endTime: "",
      team: "",
      user: ""
    };
  },
  components: { MeetingList },
  computed: {
    meetings() {
      return this.$store.getters.meetings;
    },
    filterMeetings: {
      get() {
        let tempMeetings = this.meetings;
        if (this.startTime) {
          tempMeetings = _.filter(tempMeetings, item => {
            return item.startTime >= this.startTime;
          });
        }
        if (this.endTime) {
          tempMeetings = _.filter(tempMeetings, item => {
            return item.endTime <= this.endTime;
          });
        }
        if (this.team) {
          tempMeetings = _.filter(tempMeetings, item => {
            let searchValue = item.teamName.toLowerCase();
            return searchValue.indexOf(this.team.toLowerCase()) !== -1;
          });
        }
        if (this.status) {
          tempMeetings = _.filter(tempMeetings, item => {
            let searchValue = item.status.toLowerCase();
            return searchValue.indexOf(this.status.toLowerCase()) !== -1;
          });
        }
        
        if (this.user) {
          tempMeetings = _.filter(tempMeetings, item => {
            let findUser = _.filter(item.teamUsers, userItem => {
              let searchValue = userItem.userName.toLowerCase();
              return searchValue.indexOf(this.user.toLowerCase()) !== -1;
            });
            if (findUser.length > 0) {
              return item;
            }
          });
        }
        return tempMeetings;
      }
    }
  },
  created() {
    DataService.getData(this.$store, false, "users");
    DataService.getData(this.$store, false, "teams");
    DataService.getData(this.$store, false, "meetings");
  },
  methods: {
    changeStatus(data) {
      this.$store.commit("CHANGE_STATUS_MEETING", data);
      DataService.sendData(this.$store, "meetings");
    }
  }
};
</script>
