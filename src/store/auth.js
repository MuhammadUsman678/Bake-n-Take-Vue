import axios from "axios";

export default {
  namespaced: true,

  state: {
    userData: null,
    authToken: null
  },

  getters: {
    user: state => state.userData,
    is_authenticated: state => (state.userData) ? 1 : 0, 
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
    getUserData({ commit,state }) {
      axios
        .get(import.meta.env.VITE_VUE_APP_API_URL + "user")
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          state.authToken=null;
          localStorage.removeItem("authToken");
        });
    },
    sendLoginRequest({ commit,state }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(import.meta.env.VITE_VUE_APP_API_URL + "login", data)
        .then(response => {
          commit("setUserData", response.data.user);
          state.authToken=response.data.token;
          localStorage.setItem("authToken", response.data.token);
        });
    },
    sendRegisterRequest({ commit,state }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(import.meta.env.VITE_VUE_APP_API_URL + "register", data)
        .then(response => {
          commit("setUserData", response.data.user);
          state.authToken=response.data.token;
          localStorage.setItem("authToken", response.data.token);
        });
    },
    sendLogoutRequest({ state,commit }) {
      axios.post(import.meta.env.VITE_VUE_APP_API_URL + "logout").then(() => {
        commit("setUserData", null);
        state.authToken=null;
        localStorage.removeItem("authToken");
      });
    },
    sendVerifyResendRequest() {
      return axios.get(import.meta.env.VITE_VUE_APP_API_URL + "email/resend");
    },
    sendVerifyRequest({ dispatch }, hash) {
      return axios
        .get(import.meta.env.VITE_VUE_APP_API_URL + "email/verify/" + hash)
        .then(() => {
          dispatch("getUserData");
        });
    }
  }
};