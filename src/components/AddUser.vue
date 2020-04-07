<template>
  <div class="AddUser col-6">
      <div class="input-block form-group">
          <span>Имя</span>
          <input class="form-control" type="text" v-model="name">
      </div>
      <div class="input-block form-group">
          <span>Фамилия</span>
          <input class="form-control" type="text" v-model="surname">
      </div>
      <button class="btn btn-info" @click="addUser()">Добавить</button>
  </div>
</template>
<script>
import DataService from '.././dataService'
export default {
  data(){
      return{
          name: '',
          surname: ''
      }
  },
  methods: {
    addUser() {
        if(this.name && this.surname){
             this.$store.commit('ADD_USER', {userName: this.name + ' ' + this.surname});
             DataService.sendData(this.$store, 'пользователи');
             this.name='';
             this.surname='';
        }
           
    }
  }
}
</script>
