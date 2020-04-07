<template>
  <transition class="AddMeeting" name="modal">
    <div  class="modal-mask">
        <div class="col-9 modal-container ">
          <button class="close-modal" @click="$emit('close')">×</button>
            <h2>Добавить встречу</h2>
            <div class="add-meeting-form">
              <span class="error-msg text-danger">{{this.error}}</span>
              <div class="row">
                <div class="col-6">
                  <div class="input-block form-group">
                    <span>Тема</span>
                    <input type="text" class="form-control" v-model="theme">
                  </div>
                </div>
                <div class="col-6">
                  <select-date-time-component @setDataTime="setDataTime"></select-date-time-component>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <select-user-component :users="teamUsers" 
                              :add="true" 
                              @add-user="addUserToMeeting">
                              Участникик не принимающие участие во встрече
                  </select-user-component>
                </div>
                <div class="col-6">
                  <select-user-component :users="meettingUsers" 
                                    :remove="true" 
                                    @remove-user="removeUserFromMeeting">
                                    Участники принимающие участие во встрече
                  </select-user-component>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="input-block form-group">
                    <span>Фасилитатор</span>
                    <select class="form-control" v-model="facilitator">
                      <option v-for="user in facilitatorList" 
                              :key="user.id" 
                              :value="user.id">
                              {{user.userName}}
                        </option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <div class="input-block form-group">
                    <span>Секретарь</span>
                    <select class="form-control" v-model="secretary">
                      <option v-for="user in secretaryList" 
                              :key="user.id" :value="user.id">
                              {{user.userName}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button class="btn btn-info" @click="addMeeting(team, teamName, users)">Добавить встречу</button>
            </div>

          
        </div>
      </div>
  </transition>
</template>
<script>
import _ from "lodash";
import SelectUserComponent from "./SelectUserComponent.vue";
import SelectDateTimeComponent from "./SelectDateTimeComponent";
import DataService from ".././dataService";
export default {
  data() {
    return {
      theme: "",
      startTime: "",
      endTime: "",
      facilitator: "",
      secretary: "",
      error: "",
      teamUsers: []
    };
  },
  components: { SelectUserComponent, SelectDateTimeComponent },
  computed: {
    allMeetings() {
      return this.$store.getters.meetings;
    },
    meettingUsers() {
      return _.differenceBy(
        _.differenceBy(this.users, this.teamUsers, "id"),
        this.noAvalibleUsers,
        "id"
      );
    },
    facilitatorList() {
      return _.filter(this.meettingUsers, user => {
        return user.id !== this.secretary;
      });
    },
    secretaryList() {
      return _.filter(this.meettingUsers, user => {
        return user.id !== this.facilitator;
      });
    },
    noAvalibleUsers() {
      let start = this.startTime,
        end = this.endTime;
      let meetingsInSameTime = _.filter(this.allMeetings, item => {
        let mStart = new Date(item.startTime),
          mEnd = new Date(item.endTime);
        return (
          (start >= mStart && start <= mEnd) ||
          (end >= mStart && end <= mEnd) ||
          (mStart >= start && mEnd <= end)
        );
      });
      let $noAvalibleUsers = [];
      if (meetingsInSameTime.length !== 0) {
        meetingsInSameTime.forEach(element => {
          $noAvalibleUsers.push(element.teamUsers);
        });
      }
      $noAvalibleUsers = _.sortedUniq(_.flattenDeep($noAvalibleUsers));
      return $noAvalibleUsers;
    }
  },
  props: ["users", "team", "teamName"],
  methods: {
    getNoAvalibleUsers() {
      let start = this.startTime,
        end = this.endTime;
      let meetingsInSameTime = _.filter(this.allMeetings, item => {
        let mStart = new Date(item.startTime),
          mEnd = new Date(item.endTime);
        return (
          (start >= mStart && start <= mEnd) ||
          (end >= mStart && end <= mEnd) ||
          (mStart >= start && mEnd <= end)
        );
      });
      let $noAvalibleUsers = this.noAvalibleUsers;
      if (meetingsInSameTime.length !== 0) {
        meetingsInSameTime.forEach(element => {
          $noAvalibleUsers.push(element.teamUsers);
        });
      }
      $noAvalibleUsers = _.sortedUniq(_.flattenDeep($noAvalibleUsers));
    },
    addMeeting(team, teamName, users) {
      let fas = this.facilitator;
      let sec = this.secretary;
      if (
        this.theme &&
        this.startTime &&
        this.endTime &&
        this.facilitator !== "" &&
        this.secretary !== ""
      ) {
        this.error = "";
        let meeting = {
          theme: this.theme,
          teamId: team,
          teamName: teamName,
          teamUsers: this.meettingUsers,
          status: "todo",
          startTime: this.startTime,
          endTime: this.endTime,
          facilitator: this.facilitator,
          secretary: this.secretary
        };
        this.$store.commit("ADD_MEETINGS", meeting);
        DataService.sendData(this.$store, "meetings");
        this.theme = "";
        this.startTime = "";
        this.endTime = "";
        this.facilitator = "";
        this.secretary = "";
        this.$emit("close");
      } else {
        this.error = "All fields are required";
      }
    },
    addUserToMeeting(item) {
      let userIndex = _.findIndex(this.teamUsers, user => user.id == item.id);
      this.teamUsers.splice(userIndex, 1);
    },
    removeUserFromMeeting(item) {
      this.teamUsers.push(item);
    },
    setDataTime(value) {
      this.startTime = value[0];
      this.endTime = value[1];
    }
  }
};
</script>
