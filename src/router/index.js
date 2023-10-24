import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/public/LandingPage.vue";
import Register from "../views/public/Register.vue";
import Login from "../views/public/Login.vue";
import DashBoard from "../views/private/DashBoard.vue";
import Settings from "../views/private/Settings.vue";
import Deposits from "../views/private/Deposits.vue";
import Withdrawals from "../views/private/Withdrawals.vue";
import Earnings from "../views/private/Earnings.vue";
import Deficits from "../views/private/Deficits.vue";
import ForgotPassword from "../views/public/ForgotPassword.vue";
import ChangePassword from "../views/public/ChangePassword.vue";
import NotFound from "../views/public/NotFound.vue";
import Wallet from "../views/private/Wallet.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: DashBoard,
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/deposits",
      name: "Deposits",
      component: Deposits,
    },
    {
      path: "/withdrawals",
      name: "Withdrawals",
      component: Withdrawals,
    },
    {
      path: "/earnings",
      name: "Earnings",
      component: Earnings,
    },
    {
      path: "/deficits",
      name: "Deficits",
      component: Deficits,
    },
    {
      path: "/forgot password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/change password",
      name: "ChangePassword",
      component: ChangePassword,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/wallet",
      name: "Wallet",
      component: Wallet,
    },
  ],
});

export default router;
