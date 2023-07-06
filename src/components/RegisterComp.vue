<template>
    <div>
        <vue-form ref="registerForm" :state="formstate" @submit.prevent="onSubmit">
            <div class="login-container">
                <div class="form-group">
                    <validate tag="label">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <label name="name" for="name" class="input-group-text" >Name</label>
                            </div>
                            <input type="text" id="name" class="form-control" v-model="user.name" placeholder="enter name" required name="name">
                            <field-messages name="name" show="$touched">
                                <div slot="required"> Name required </div>
                            </field-messages>
                        </div>
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <label name="email" for="email" class="input-group-text" >Email</label>
                            </div>
                            <input type="text" id="email" class="form-control" v-model="user.email" placeholder="enter email" required name="email">
                            <field-messages name="email" show="$touched">
                                <div slot="required">Email required</div>
                            </field-messages>
                        </div>
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label" :custom="{'check-password' : checkPassword}">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <label for="password1" name="password1" class="input-group-text" >Enter password</label>
                            </div> 
                            <input  type="password" 
                            id="password1" 
                            autocomplete="section-blue your password"
                            class="form-control" 
                            v-model="user.password1" 
                            placeholder="enter password" 
                            required name="password1">
                            <field-messages name="password1" show="$touched">
                                <div slot="check-password">Password must have 8 or more characters, one or more uppercase, one or more lowercase one or more numbers</div>
                            </field-messages>
                        </div> 
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label" :custom="{'password-coincide': passwordCoincide}">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <label name="password2" for="password2" class="input-group-text" >Enter password</label>
                            </div>          
                            <input  type="password" 
                            id="password2" 
                            class="form-control" 
                            v-model="password2" 
                            autocomplete="section-blue re enter your password"
                            placeholder="re-enter password" 
                            required name="password2">
                            <field-messages name="password2" show="$touched" >
                                <div slot="check-password">Password required</div>
                                <div slot="password-coincide">Passwords must be identical</div>
                            </field-messages>
                        </div> 
                    </validate>
                </div>
                <div class="form-group">
                    <validate tag="label" :custom="{'terms-conditions': termsConditions}">
                        <div class="intput-group mb-3">
                            <div class="input-grou-prepend">
                                <label for="checkbox" name="termsconditions" class="input-group-text" >Terms and Conditions</label>
                            </div>          
                            <input type="checkbox" id="checkbox" v-model="terms" name="termsconditions" value="accept" /> <span> I Agree  </span>
                            <field-messages name="termsconditions" >
                                <div slot="terms-conditions">Please note that in order to create an account, you are required to accept our terms and conditions.</div>
                            </field-messages>
                        </div> 
                    </validate>
                </div>  
                <div v-if="alreadyRegistered"><span>This email is already registered</span></div>
                <div v-if="successRegister"><span>Success!</span></div>
                <button class="btn btn-success mt-3" type="submit" >Send</button>
                <button class="btn btn-danger mt-3"  type="button" v-on:click="clearForm()">Clear </button>
            </div>
        </vue-form>
        <button class="btn btn-info mt-3" @click="showTable">Show Info</button>
        
        <TabComp  v-if="this.$store.state.isTableVisible"
        :users="this.$store.state.users"
        :options="this.$store.state.options"
        v-model="userNationality"
        />
    </div>
</template>
<script>
import TabComp from './TabComp.vue'

export default {
    name:"RegisterComp",
    components:{
        TabComp
    },
    data(){
        return{
            alreadyRegistered:false,
            successRegister:false,
            formstate:{},
            registeredUsers: this.$store.state.users,
            user:
            {   
                name:"",
                email:"",
                password1:"",
            },
            password2 :"",
            terms: true,
            userNationality: "",
        };
    },
    methods: {
        onSubmit() {
            if (this.formstate.$valid) {
                this.registerUser(this.user);
                this.clearForm();
            }
        },
        clearForm(){
            this.user.name = ""
            this.user.email = ""
            this.user.password1 = ""
            this.password2 = ""
            this.successRegister = false;
            this.formstate._reset();
        },
        checkPassword(value) {
            return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
        },
        passwordCoincide(value) {
            return this.user.password1 === value;
        },
        termsConditions(){
            return this.terms
        },
        registerUser(user){
            if( !this.$store.getters.getUser(user.email) && this.termsConditions()){
                let newUser = {name: user.name, email : user.email, password: user.password1}; 
                this.$store.dispatch('addUser', newUser)
                this.alreadyRegistered = false;
                this.successRegister = true;
                this.showTable();
            }else{
                this.alreadyRegistered = true; 
                this.successRegister = false; 
            }
        },
        showTable(){
            this.$store.dispatch('showTable')
        }
    }
}
</script>
<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 1.3rem;
    border-radius: 0.45rem;
}
</style>