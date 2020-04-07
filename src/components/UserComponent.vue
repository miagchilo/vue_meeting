<template>
    <div class="UserComponent container">
        <h2 class="text-center main-header" >Пользователи</h2>
        <div class="row">
            <add-user></add-user>
            <user-list></user-list>
        </div>
    </div>
</template>
<script>
import AddUser from './AddUser.vue';
import UserList from './UserList.vue';
import DataService from '.././dataService';
export default {
  components: { AddUser, UserList },
  created () {
      DataService.getData( this.$store, false, 'users' );
  }
}
</script>
