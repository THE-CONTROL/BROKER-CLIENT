<template>
  <div
    class="w-full h-fit lg:w-3/12 pt-2 sm:pt-5 p-5 lg:border-r-2 lg:border-b-0 border-b-2 border-[#e9e8e8] flex flex-wrap gap-5 justify-center"
  >
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg p-5"
    >
      <h5
        class="text-sm font-semibold text-gray-900 border-b border-gray-400 pb-3"
      >
        ACCOUNT OVERVIEW <fa icon="fa-solid fa-money-bills" />
      </h5>
      <div class="w-full flex flex-row gap-2 mt-5 px-3 hover:bg-slate-100 py-3">
        <div
          class="rounded-full bg-green-600 h-3 w-3 mt-1.5"
          :class="user.deleted ? 'bg-red-600' : 'bg-green-600'"
        ></div>
        <p>Active</p>
      </div>
      <div class="mt-5">
        <p>
          Plan <fa icon="fa-solid fa-money-bill-wheat" />:
          {{ user.investment_plan }}
        </p>
      </div>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg p-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          ACCOUNT BALANCE <fa icon="fa-solid fa-file-invoice-dollar" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{ user.acct_bal }}.00
        </p>
      </div>
      <div class="mt-7 overflow-auto">
        <h5 class="text-sm font-semibold text-gray-900">
          BITCOIN EQUIVALENT <fa icon="fa-solid fa-bitcoin-sign" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          {{ user.bit_bal }} btc
        </p>
      </div>
      <p class="text-red-500 px-2 mt-7">+bonus</p>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg p-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          TOTAL INVESTMENT <fa icon="fa-solid fa-money-bill-trend-up" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{ user.tot_in }}.00
        </p>
      </div>
      <p class="text-blue-900 text-lg px-2 mt-7 font-semibold">
        <fa icon="fa-solid fa-arrow-right-arrow-left" />
      </p>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg p-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          TOTAL REVENUE <fa icon="fa-solid fa-money-bill-transfer" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{ user.tot_re }}.00
        </p>
      </div>
      <p class="text-blue-900 text-lg px-2 mt-7 font-semibold">
        <fa icon="fa-solid fa-arrow-right-arrow-left" />
      </p>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg px-4 py-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          WITHDRAWABLE <fa icon="fa-solid fa-money-check-dollar" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{
            user.investment_plan == "Gold"
              ? user.acct_bal < 2500
                ? 0
                : user.acct_bal - 2500
              : user.investment_plan == "Silver"
              ? user.acct_bal < 1500
                ? 0
                : user.acct_bal - 1500
              : user.acct_bal < 500
              ? 0
              : user.acct_bal - 500
          }}.00
        </p>
      </div>
      <p class="text-blue-900 px-6 mt-5 font-semibold">
        <fa icon="fa-solid fa-arrow-right-arrow-left" />
      </p>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg px-4 py-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          EARNINGS <fa icon="fa-solid fa-user-plus" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{ user.profit }}.00
        </p>
      </div>
      <p class="text-blue-900 px-6 mt-5 font-semibold">
        <fa icon="fa-solid fa-arrow-right-arrow-left" />
      </p>
    </div>
    <div
      class="w-full sm:w-72 bg-white border-gray-300 sm:border-2 rounded-lg px-4 py-5"
    >
      <div class="w-full">
        <h5 class="text-sm font-semibold text-gray-900">
          DEFICITS <fa icon="fa-solid fa-user-minus" />
        </h5>
        <p class="font-semibold text-gray-400 text-2xl mt-3 px-4">
          ${{ user.loss }}.00
        </p>
      </div>
      <p class="text-blue-900 px-6 mt-5 font-semibold">
        <fa icon="fa-solid fa-arrow-right-arrow-left" />
      </p>
    </div>
    <div class="w-full sm:w-72 bg-black z-20 py-2 relative text-white">
      <img
        src="../../assets/images/landingPage/What-is-cryptocurrency-840x720.jpeg"
        alt="crypto image"
        class="w-full absolute top-0 -z-10 left-0 opacity-30 h-full object-cover"
      />
      <div class="w-full px-2 flex flex-wrap justify-center gap-5">
        <p class="font-semibold text-lg text-center">
          Don't have crypto or know where to buy crypto?
        </p>
        <a
          href="https://Binance.com"
          class="bg-white hover:bg-slate-100 text-[#4d4100] font-bold p-1 rounded-md mx-auto"
        >
          Binance
        </a>
        <a
          href="https://www.coinbase.com/"
          class="bg-white font-semibold text-blue-700 hover:bg-gray-100 p-1 rounded-md mx-auto"
        >
          Coinbase
        </a>
        <a
          href="https://www.coinmama.com/"
          class="bg-blue-900 hover:bg-blue-800 p-1 rounded-md mx-auto"
        >
          Coinmama
        </a>
        <a
          href="https://www.gemini.com/"
          class="bg-white font-semibold text-gray-900 hover:bg-gray-100 p-1 rounded-md mx-auto"
        >
          Gemini
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import useComp1 from "../../mix/data.js";
export default {
  name: "DashData",
  setup() {
    const { customFetcher } = useComp1();
    const user = ref({});

    const getUser = async () => {
      try {
        const { data } = await customFetcher("client/get");
        user.value = data;
      } catch {}
    };

    onBeforeMount(() => {
      getUser();
    });

    return { user };
  },
};
</script>

<style></style>
