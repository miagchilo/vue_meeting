<template>
  <div class='SelectDateTimeComponent'>
    <span>Выберете дату начала</span>
    <datetime v-model="value1" range 
                type="datetime" 
                format="yyyy-MM-dd HH:mm" 
                lang="en"
                :not-before="this.notBefore"
                >
    </datetime>
  </div>
</template>

<script>

import { Datetime } from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'
export default {
  components: { Datetime },
  data() {
    return {
      
      value1: '',
      notBefore: new Date,
      shortcuts: [
        {
          start: new Date(),
          end: new Date()
        }
      ],
      
    }
  },
  watch: {
      'value1'() {
          this.dateHandler(this.value1);
      }
  },
  methods:{
      dateHandler(value){
          this.$emit('setDataTime', value);
      }
  }
}
</script>
