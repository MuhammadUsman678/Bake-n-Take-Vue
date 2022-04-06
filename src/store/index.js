import { createStore } from "vuex";
import AuthModule from './auth';


export default createStore({
    modules:{
        auth:AuthModule,
    },
    state:{
        errors: [],
    },
    mutations:{
        setErrors(state, errors) {
            state.errors = errors;
          }
    },
    actions:{
       
    },
    getters:{
        errors: state => state.errors
    }
})