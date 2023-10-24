<template>
  <form
    @submit.prevent="withdrawal()"
    class="w-full md:w-1/2 lg:w-2/6 p-5 md:border-r-2 md:border-b-0 border-b-2 border-[#e9e8e8]"
  >
    <p v-if="err1" class="text-xs text-center text-red-600">
      {{ err1 }}
    </p>
    <div class="w-full pb-5 pt-0.5 px-3">
      <div class="mt-2">
        <label class="text-gray-600 text-sm"
          >Amount ($)
          <fa icon="fa-solid fa-file-invoice-dollar" />
          <span class="text-red-500">*</span></label
        >
        <div>
          <input
            @input="setBitcoin"
            v-model="amount"
            type="text"
            class="mt-1 w-full border text-sm border-gray-300 h-10 px-2 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
          />
        </div>
      </div>
      <div class="mt-2">
        <label class="text-gray-600 text-sm"
          >Bitcoin equivalent (btc)
          <fa icon="fa-solid fa-bitcoin-sign" />
          <span class="text-red-500">*</span></label
        >
        <div>
          <div
            class="mt-1 pt-2 w-full border text-sm border-gray-300 h-10 px-2 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
          >
            {{ bitcoin }}
          </div>
        </div>
      </div>
      <p class="text-xs text-red-500">
        This amount in bitcoin would be transferred to your bitcoin wallet
        within 24 hours
      </p>
    </div>
    <div
      class="w-full flex justify-end border-t p-4 border-gray-300 bg-slate-50"
    >
      <button
        type="submit"
        class="py-2 w-full rounded-md text-white text-center"
        :class="dis ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-500'"
        :disabled="dis"
      >
        WITHDRAW
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useComp1 from "../../mix/data.js";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  name: "WithPayments",
  props: {
    reRenWithHis: Function,
    setShowCoin: Function,
    setWel: Function,
  },
  setup({ reRenWithHis, setShowCoin, setWel }) {
    const { customFetcher, err, changeErr, dolBit } = useComp1();
    const amount = ref(0);
    const bitcoin = ref(0);
    const err1 = ref("");
    const dis = ref(false);
    const coin = ref(false);

    const getCoin = async () => {
      try {
        const { data } = await customFetcher(`withdrawal/get/coin`);
        coin.value = data.coin;
      } catch {}
    };

    const withdrawal = async () => {
      if (coin.value) {
        dis.value = true;
        const body = {
          amount: amount.value,
          bitcoin: bitcoin.value,
        };
        try {
          const { res, data } = await customFetcher("withdrawal/create", {
            method: "POST",
            body: JSON.stringify(body),
          });
          if (res.ok) {
            err1.value = "";
            reRenWithHis();
            amount.value = 0;
            bitcoin.value = 0;
            setWel(data.heading, data.content);
          } else {
            err1.value = data.message;
          }
        } catch {
          changeErr();
          err1.value = err.value.msg;
        }
        dis.value = false;
        window.scroll(0, 0);
      } else {
        setShowCoin();
      }
    };

    const setBitcoin = async (e) => {
      const dat = await dolBit(e.target.value);
      bitcoin.value = dat ? dat : 0;
    };

    onBeforeMount(() => {
      getCoin();
    });

    return {
      err1,
      dis,
      withdrawal,
      bitcoin,
      amount,
      setBitcoin,
    };
  },
};
</script>

<style></style>
