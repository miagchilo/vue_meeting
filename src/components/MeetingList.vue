<template>
  <div class="MeetingsList card-columns">
    <div class="Item item-metting card" :key="item.id" v-for="item in meetings">
      <div class="card-header">
        <span><strong>Тема:</strong> {{ item.theme }}</span>
      </div>
      <div class="card-block">
        <div class="row">
          <span><strong>КОманда:</strong> {{ item.teamName }}</span>
        </div>
        <div class="row">
          <span><strong>Дата и время:</strong></span>
        </div>
        <div class="row">
          <span>{{ getDate(item.startTime) }} ~ {{ getDate(item.endTime) }}</span>
        </div>
        <div v-if="item.factStart">
          <div class="row" >
            <span><strong>Дата и время:</strong></span>
          </div>
          <div class="row date-time">
            <span>{{ getDate(item.factStart) }} ~ <span  v-if="item.factEnd">{{ getDate(item.factEnd) }}</span></span>
          </div>
        </div>
        <div class="row">
          <span><strong>Статус:</strong> {{ item.status }}</span>
        </div>
        <div class="row">
            <span><strong>Фасилитатор:</strong> {{  getUser(item, item.facilitator) }}</span>
        </div>
        <div class="row">
            <span><strong>Секретарь:</strong> {{  getUser(item, item.secretary) }}</span>
        </div>
        <div class="row meeting-users-list"> 
            <p><strong>Пользователь:</strong></p>
            <ul>
              <li :key="user.id" v-for="user in item.teamUsers">{{user.userName}}</li>
            </ul>
        </div>
      </div>
      <div v-if="showBtns" class="meettingBtns">
        <button class="btn btn-success" 
                v-if="item.status == 'todo'"  
                @click="statusHandler(item.id, 'inProgress' )">
               Начало встречи
        </button>
        <button class="btn btn-danger" 
                v-if="item.status == 'inProgress'"
                @click="statusHandler(item.id, 'done' )" >
                Завершение встречи
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import format from ".././helpers/dateFormat";
export default {
  data() {
    return {
    };
  },
  props: ["meetings", "filterMeetings","showBtns"],
  computed: {
    addUsers() {
      return _.differenceBy(
        this.$store.getters.users,
        this.$store.getters.teams[this.teamId].users,
        "id"
      );
    }
  },
  methods: {
    getUser(item, position) {
      return _.find(item.teamUsers, o => {
        return o.id == position;
      }).userName;
    },
    statusHandler(item, status) {
      let time = new Date();
      this.$emit("changeStatus", { id: item, status: status, time: time });
    },
    getDate(item){
      let date = new Date(item);
      return `${date.format("dd/mm/yy")} ${date.format("HH:MM")}`;
    }
  }
};
</script>
