import Vue from "vue";
import VueRouter from "vue-router";
import ProcessDemo from "@/components/ProcessDemo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ProcessDemo",
    component: ProcessDemo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
