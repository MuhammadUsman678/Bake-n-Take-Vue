import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from './store';
import axios from "axios";


axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 422) {
        store.commit("setErrors", error.response.data.errors);
      } else if (error.response.status === 401) {
        store.commit("auth/setUserData", null);
        localStorage.removeItem("authToken");
        router.push({ name: "/auth/Login" });
      } else {
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



const app=createApp(App);
app.use(routes);
app.use(store);
app.mount('#app');
