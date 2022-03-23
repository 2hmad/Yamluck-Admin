import axios from "axios";

const state = {
    user: null,
};
const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
};
const actions = {
    async LogIn({ commit }, user) {
        axios
            .post("/api/admin/login", user)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    commit("setUser", user.get("email"));
                    router.push("/login");
                }
            })
            .catch((err) => console.log(err));
    },
    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
    },
};
const mutations = {
    setUser(state, email) {
        state.user = email;
    },
    logout(state, user) {
        state.user = user;
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
};
