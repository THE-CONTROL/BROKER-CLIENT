<template>
  <div class="w-full">
    <div class="w-full" v-if="!showCoin">
      <LogInNav :logOut="logOut" />
      <div class="w-full bg-slate-100 pt-5 pb-10 px-5">
        <div
          class="w-full bg-white flex md:gap-0 flex-col-reverse md:flex-row-reverse"
        >
          <WithdrawalHistory :key="withHisKey" />
          <WithPayments
            :key="withHisKey"
            :reRenWithHis="reRenWithHis"
            :setShowCoin="setShowCoin"
            :setWel="setWel"
          />
        </div>
      </div>
      <FooterPage />
    </div>
    <CoinBase
      v-if="showCoin"
      :setShowCoin="setShowCoin"
      :reRenWithHis="reRenWithHis"
      :setWel="setWel"
    />
  </div>
</template>

<script>
import LogInNav from "../../components/Extras/LogInNav.vue";
import WithPayments from "../../components/Withdrawals/WithPayments.vue";
import WithdrawalHistory from "../../components/Withdrawals/WithdrawalHistory.vue";
import CoinBase from "../../components/Withdrawals/CoinBase.vue";
import FooterPage from "../../components/Extras/FooterPage.vue";
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Withdrawals",
  components: {
    LogInNav,
    FooterPage,
    WithPayments,
    WithdrawalHistory,
    CoinBase,
  },
  props: {
    logOut: Function,
    setWel: Function,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const withHisKey = ref(0);
    const showCoin = ref(false);

    const reRenWithHis = () => {
      withHisKey.value += 1;
    };

    const setShowCoin = () => {
      showCoin.value = !showCoin.value;
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

    return { reRenWithHis, withHisKey, showCoin, setShowCoin };
  },
};
</script>

<style></style>
