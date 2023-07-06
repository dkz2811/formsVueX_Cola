<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <th>User Name</th><th>Email</th><th>ISO 3</th><th>Select your country</th>
      </thead>
      <tr class="table-row"  v-for="user in users" :key="user.email">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.nationality }}</td>
        <td>
          <select class="form-select"
          :id="user.email" @input="inputHandler($event)">
          <option v-for="option in options" 
          :key="option.value" 
          :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </td>
    <td>
      <button class="btn btn-danger" @click="clickHandler(user.email,'delete')" >Delete</button>
    </td>
  </tr>
</table>
</div>
</template>
<script>
export default {
  name: "TabComp.vue",
  props:{
    users:{
      type: Array,
      required: true
    },
    value:{
      type:String,
      required: false
    },
    options:{
      type:Array,
      required:true
    },
  },
  data(){
    return {
    }
  },
  methods:{
    clickHandler(email,str){
      if(str==='delete'){
        this.deleteUser(email)
      }else if( str === 'update'){
        this.updateUser(email)
      }
    },
    deleteUser(email){
      this.$store.dispatch('deleteUser', email)
      
    },
    inputHandler(event){
      this.$store.dispatch('updateUser', {email: event.target.id,nationality: event.target.value})
    }
  }
}
</script>
<style>
.table-container {
  max-width: 70rem;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 1.3rem;
  border-radius: 0.45rem;
}

</style>