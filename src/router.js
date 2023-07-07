import Vue from "vue";
import VueRouter from "vue-router";
import RegisterComp from "./components/RegisterComp.vue"
import TabComp from "./components/TabComp.vue"

Vue.use(VueRouter);

const routes = [
    { path: "/", component: RegisterComp, name: "register"},
    { path: "/users-table", component: TabComp, name: "users-table"},
    
]

const router =  new VueRouter({
    mode: "history", 
    //base: process.env.BASE_URL,
    routes,
})


export default router;