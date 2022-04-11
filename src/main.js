import { createApp } from 'vue'
import {createHead} from '@vueuse/head'
import App from './App.vue'
import routes from './routes'
// import BootstrapVue from "bootstrap-vue"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
import store from './store';
import axios from "axios";
import 'notyf/notyf.min.css';

import { Notyf } from 'notyf';
// Create an instance of Notyf
const notyf = new Notyf({duration:3000});

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.toJSON().message === 'Network Error') {
        notyf.error('Network Error: Please check your internet connection')
        return Promise.reject(error)
      }

      if (error.response.status === 422) {
        store.commit("setErrors", error.response.data.errors);
      } else if (error.response.status === 401) {
        store.commit("auth/setUserData", null);
        localStorage.removeItem("authToken");
        router.push({ name: "/auth/Login" });
      }
       else {
        return Promise.reject(error);
      }
    }
  );
  
  axios.interceptors.request.use(function(config) {
    config.headers.common = {
      // Authorization: `Bearer ${store.state.auth.authToken}`,
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  
    return config;
  });


  const head = createHead()
  const app=createApp(App);
  app.use(head);
app.use(routes);
app.use(store);
app.mount('#app');
