<template>
  <div>
    <IntroPage v-if="!showApp"/>
    <div v-else class="w-full relative overflow-clip text-slate-900">
      <div
        class="w-full text-xs text-red-700 border-red-700 py-0.5 sm:text-sm md:text-base bg-[#141414] 
        border mt-[57px] sm:mt-[67px] md:mt-[82px] bg-white text-center font-bold">
        <h4 class="mx-5">THIS IS A DEMO WEBSITE, DO NOT PAY ANY AMOUNT WHATSOEVER!</h4>
      </div>
      <RouterView
        v-slot="{ Component }"
        :logOut="logOut"
        :setWel="setWel"
        :newClient="newClient"
        :setNewClient="setNewClient"
        ><transition name="scale-slide">
          <component :is="Component" />
        </transition>
      </RouterView>
      <WelModal v-if="wel" :setWel="setWel" :welMsg="welMsg" :welHead="welHead" />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import useComp1 from "./mix/data.js";
import WelModal from "./components/Extras/WelModal.vue";
import IntroPage from "./components/Extras/IntroPage.vue";

export default {
  components: {
    WelModal,
    IntroPage
  },
  setup() {
    const { customFetcher } = useComp1();
    const route = useRoute();
    const router = useRouter();
    const welHead = ref("");
    const welMsg = ref("");
    const wel = ref(false);
    const newClient = ref(false);
    const showApp = ref(false);

    const showAppFunc = () => {
      showApp.value = true;
    };

    const logOut = async () => {
      try {
        const { res } = await customFetcher("client/logout", {
          method: "PUT",
        });
        if (res.ok) {
          localStorage.clear();
          router.push({
            name: "Login",
            query: {
              ...route.query,
            },
          });
        }
      } catch {}
    };

    const setWel = (head = "", msg = "") => {
      wel.value = !wel.value;
      welHead.value = head;
      welMsg.value = msg;
    };

    const setNewClient = () => {
      newClient.value = !newClient.value;
    };

    const check_stat = async () => {
      if (localStorage.getItem("VestaClientRefreshToken")) {
        try {
          const { res } = await customFetcher("client/get/logged_in");
          if (!res.ok) {
            localStorage.clear();
            router.push({
              name: "Login",
              query: {
                ...route.query,
              },
            });
          }
        } catch {}
      }
    };

    const rem = async () => {
      window.addEventListener("beforeunload", () => {
        if (!localStorage.getItem("remember")) {
          logOut();
        }
      });
    };

    onBeforeMount(() => {
      setTimeout(showAppFunc, 5000);
      check_stat();
      rem();
    });

    return { logOut, wel, setWel, setNewClient, newClient, welHead, welMsg, showApp, showAppFunc };
  },
};
</script>

<style>
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}
.scale-slide-enter-from {
  left: -100%;
}
.scale-slide-enter-to {
  left: 0%;
}
.scale-slide-leave-from {
  transform: scale(1);
}
.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
