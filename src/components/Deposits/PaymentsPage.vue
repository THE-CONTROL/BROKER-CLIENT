<template>
  <form
    @submit.prevent="deposit()"
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
        Make a deposit of the amount above in bitcoin to the address bitcoin
        address below
      </p>
      <div class="mt-2 overflow-clip">
        <p>
          <fa
            :icon="['fab', 'fa-bitcoin']"
            class="text-7xl py-2 text-[#8d7d20]"
          />
        </p>
        <label class="text-gray-600 text-sm"
          >Bitcoin Wallet Address
          <fa :icon="['fab', 'fa-bitcoin']" class="text-[#8d7d20]" />
          <span class="text-red-500">*</span></label
        >
        <div class="overflow-clip w-full">
          <p
            type="text"
            class="mt-1 text-sm w-full border border-gray-300 overflow-auto py-1 px-1 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
          >
            {{ bitCode }}
          </p>
        </div>
      </div>
      <div class="w-full mt-2 pb-3 border-b border-gray-300">
        <button
          type="submit"
          class="sm:px-2 px-1 py-1 bg-red-100 text-red-500 hover:bg-gray-700 rounded-md text-right text-xs sm:text-sm"
          @click="copy(bitCode)"
        >
          COPY WALLET ADDRESS <fa icon="fa-solid fa-copy" />
        </button>
      </div>
    </div>
    <div class="w-full pb-5 pt-0.5 px-3">
      <p>OR : SCAN Bitcoin QR CODE</p>
      <img
        class="h-36 w-36"
        src="../../assets/images/landingPage/Bitcoin.jpg"
        alt="Bitcoin QR CODE"
      />
      <p class="text-xs mt-5 text-red-500">
        After successful transfer, click on the submit button below to process
        your deposit and approve
      </p>
      <div class="mt-5">
        <p>
          <fa
            :icon="['fab', 'fa-ethereum']"
            class="text-7xl py-2 text-slate-700"
          />
        </p>
        <label class="text-gray-600 text-sm"
          >Ethereum Wallet Address
          <fa :icon="['fab', 'fa-ethereum']" class="text-slate-700" />
          <span class="text-red-500">*</span></label
        >
        <div class="overflow-clip w-full">
          <p
            type="text"
            class="mt-1 text-sm w-full border overflow-auto border-gray-300 py-1 px-1 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
          >
            {{ ethCode }}
          </p>
        </div>
        <div class="w-full mt-2 pb-3 border-b border-gray-300">
          <button
            type="submit"
            class="sm:px-2 px-1 py-1 bg-red-100 text-red-500 hover:bg-gray-700 rounded-md text-right text-xs sm:text-sm"
            @click="copy(ethCode)"
          >
            COPY WALLET ADDRESS <fa icon="fa-solid fa-copy" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full pt-0.5 px-3 pb-5">
      <p>OR : SCAN Ethereum QR CODE</p>
      <img
        class="h-36 w-36"
        src="../../assets/images/landingPage/Ethereum.jpg"
        alt="Ethereum QR CODE"
      />
      <p class="text-xs mt-5 text-red-500">
        After successful transfer, click on the submit button below to process
        your deposit and approve
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
        DEPOSIT
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useComp1 from "../../mix/data.js";
export default {
  name: "PayentsPage",
  props: {
    reRenDepHis: Function,
    setWel: Function,
  },
  setup({ reRenDepHis, setWel }) {
    const { customFetcher, err, changeErr, dolBit } = useComp1();
    const amount = ref(0);
    const bitcoin = ref(0);
    const err1 = ref("");
    const dis = ref(false);
    const bitCode = "bc1qxuuljrt598k6mt67hr98fhd24ugp5zk5rskv3y";
    const ethCode = "0xB1a339CfD99C958683645a09bc580811241A235f";

    const deposit = async () => {
      dis.value = true;
      const body = {
        amount: amount.value,
        bitcoin: bitcoin.value,
      };
      try {
        const { res, data } = await customFetcher("deposit/create", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res.ok) {
          err1.value = "";
          reRenDepHis();
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
    };

    const copy = (code) => {
      navigator.clipboard.writeText(code);
    };

    const setBitcoin = async (e) => {
      const dat = await dolBit(e.target.value);
      bitcoin.value = dat ? dat : 0;
    };

    return {
      copy,
      bitCode,
      ethCode,
      err1,
      deposit,
      dis,
      bitcoin,
      amount,
      setBitcoin,
    };
  },
};
</script>

<style></style>
