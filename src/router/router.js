import Vue from "vue";
import Router from "vue-router";

import Start from "../components/Start.vue";
import PlayPage from "../components/PlayPage.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{ path: "/", component: Start },
		{ path: "/play", component: PlayPage },
	],
});
