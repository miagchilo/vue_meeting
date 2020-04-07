<template>
  <div class="select-user-component">
        <h3><slot>Users</slot></h3>
        <div class="Item"  v-for="item in users" :key="item.id">
            <button class="btn-success small-btn" 
                    @click="addUser(item)"
                    v-if="add">
                    +
            </button>
            <button class="btn-danger small-btn" 
                    @click="removeUser(item)"
                    v-if="remove">
                    ×
            </button>
            <span  class="Item__title">{{ item.userName }}</span>
            <span class="Item__url">{{ item.userSurname }}</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["users", "add", "remove"],
  methods: {
    addUser(item) {
      this.$emit('add-user', item);
    },
    removeUser(item) {
      this.$emit('remove-user', item);
    }
  }
};
</script>
