<template>
  <div class="w-full">
    <LogInNav :logOut="logOut" />
    <div class="w-full bg-slate-100 pt-5 pb-10 px-5">
      <div class="w-full bg-white flex flex-col md:flex-row">
        <PaymentsPage :reRenDepHis="reRenDepHis" :setWel="setWel" />
        <DepositHistory :key="depHisKey" :setWel="setWel" />
      </div>
    </div>
    <FooterPage />
  </div>
</template>

<script>
import LogInNav from "../../components/Extras/LogInNav.vue";
import PaymentsPage from "../../components/Deposits/PaymentsPage.vue";
import DepositHistory from "../../components/Deposits/DepositHistory.vue";
import FooterPage from "../../components/Extras/FooterPage.vue";
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Deposits",
  components: {
    LogInNav,
    FooterPage,
    PaymentsPage,
    DepositHistory,
  },
  props: {
    logOut: Function,
    setWel: Function,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const depHisKey = ref(0);

    const reRenDepHis = () => {
      depHisKey.value += 1;
    };

    onBeforeMount(() => {
      if (!localStorage.getItem("VestaClientRefreshToken")) {
        router.push({
          name: "Login",
          query: {
            ...route.query,
          },
        });
      }
    });

    return { reRenDepHis, depHisKey };
  },
};
</script>

<style></style>
