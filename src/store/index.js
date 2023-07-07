import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title:"Forms con Vuex",
    users:[
      { name:"Ramon", email:"ramon@coder.com", password:"1234Abbb"},
      { name:"Agustina", email:"Agustina@coder.com", password:"1234Abbb"},
      { name:"Martin", email:"Martin@coder.com", password:"1234Abbb"},
      { name:"Camila", email:"Camila@coder.com", password:"1234Abbb"},
    ],
    isTableVisible:false,
    nstate:[],
    alreadyRegistered:false,
    successRegister:false,
    formstate:{},
    options:[
      {name:"Argentina", value:"ARG"},
      {name:"Brasil", value:"BRA"},
      {name:"Bolivia", value:"BOL"},
      {name:"Chile", value:"CHL"},
      {name:"Colombia", value:"COL"},
      {name:"Ecuador", value:"ECU"},
      {name:"Guyana", value:"GUY"},
      {name:"Guyana Francesa", value:"GUF"},
      {name:"Paraguay", value:"PRY"},
      {name:"Peru", value:"PER"},
      {name:"Surinam", value:"SUR"},
      {name:"Uruguay", value:"URY"},
      {name:"Venezuela", value:"VEN"},
    ],
    user:
    {   
      name:"",
      email:"",
      password1:"",
    },
    password2 :"",
    terms: true,
    userNationality: ""
  },
  getters: {
    getUser: (state) => (email) => { 
      console.log("getUser: ", email);
      return state.users.find(user => user.email === email)
    },
    getUsers: (state) => { console.log("getUsers: ", state.users ); return state.users },
    getisTableVisible: (state) => { return state.isTableVisible },
    getOptions: (state) => { console.log("getOptions: ", state.options); return state.options },
  },
  mutations: {
    updateUsers: (state, payload) => {console.log("updateUsers: ", payload), state.users = payload },
    showTable: (state, payload) => { state.isTableVisible = payload },
  },
  actions: {
    addUser: (context, payload) => {
      let users = context.getters.getUsers.slice();
      users.push(payload);
      console.log("User to add: ", payload);
      console.log("Users list to update: ", users);
      context.commit('updateUsers',users );
    },
    updateUsers: (context, payload) => {
      context.commit('updateUsers',payload )
    },
    updateUser: (context, payload) => {
      let user = context.getters.getUser(payload.email);
      let users = context.getters.getUsers.slice();
      users[users.indexOf(user)] = {
        email: payload.email == null ? user.email : payload.email,
        name: payload.name == null ?  user.name : payload.name,
        password: payload.password == null ? user.password : payload.password,
        nationality: payload.nationality == null ? user.nationality : payload.nationality,
      };
      console.log("User to update: ", user);
      console.log("Users list to update: ", users);
      context.commit('updateUsers',users );
    },
    deleteUser: (context, email) => { 
      let user = context.getters.getUser(email);
      let users = context.getters.getUsers.slice(); 
      users.splice(users.indexOf(user), 1);
      console.log("Deleted User: ", user);
      console.log("Users list to update: ", users);
      context.commit('updateUsers',users );
    },
    showTable: (context) => {  
      context.commit('showTable', !context.getters.getisTableVisible ) }
    },
  })
  