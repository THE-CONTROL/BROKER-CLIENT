<template>
  <div class="w-full p-5 md:w-1/2 lg:w-4/6">
    <h3 class="pb-2.5 border-b border-gray-300">DEPOSIT HISTORY</h3>
    <p v-if="err1" class="text-xs text-center text-red-600 mt-2">
      {{ err1 }}
    </p>
    <p class="pt-2.5 text-sm text-blue-700">
      In order to reduce transaction processing time, click on the button below
      to upload proof of payment for any of your deposit requests
    </p>
    <input
      @change="upPic"
      type="file"
      class="custom-file-input"
      :class="'w-48 px-2 mr-2 text-red-600 border mt-2 border-gray-300 text-xs hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]'"
    />
    <input
      v-model="tranId"
      type="text"
      placeholder="Transaction id"
      class="w-24 mr-2 h-6 rounded-[4px] px-1.5 border mt-2 border-gray-300 text-xs hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]'"
    />
    <button
      :disabled="dis"
      class="py-1 px-2 text-xs rounded-md text-white"
      @click="upProof(tranId)"
      :class="dis ? 'bg-gray-700' : 'hover:bg-gray-700 bg-blue-700'"
    >
      UPLOAD <fa icon="fa-solid fa-image" />
    </button>
    <p class="pt-2">OR</p>
    <p class="pt-2 text-sm text-blue-700">
      Send an email to
      <span class="text-red-600"
        ><a href="mailto: Vestaatrading@gmail.com"
          ><fa :icon="['fa', 'fa-envelope']" /> Vestaatrading@gmail.com</a
        ></span
      >
      containing
      <strong
        >payment date, amount and any proof of payment e.g screenshot or
        receipt</strong
      >
    </p>
    <div class="w-full mt-3 px-5 py-8 rounded-md shadow shadow-gray-300">
      <h3 class="pb-2.5 border-b border-gray-300 sm:pl-5">
        Transaction History <fa icon="fa-solid fa-history" />
      </h3>
      <p class="pt-2.5 text-red-800 text-center" v-if="!deposits?.length">
        {{ noneText }}
      </p>
      <div class="w-full overflow-auto mt-2.5">
        <div class="w-[685px] mx-auto">
          <div class="w-full flex flex-row justify-between">
            <div class="flex flex-row justify-center gap-2">
              <label class="pt-2" for="entries">Entries:</label>
              <select
                v-model="entries"
                name="entries"
                @change="getDeposits(entries)"
                class="mt-1 text-sm w-full border border-gray-300 h-8 px-2 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="flex flex-row justify-center gap-2">
              <button
                class="text-lg pt-1 text-blue-600 hover:text-blue-800"
                @click="searchDeposits(val)"
              >
                <fa icon="fa-solid fa-magnifying-glass" />
              </button>
              <input
                type="text"
                v-model="val"
                placeholder="Transaction id"
                class="mt-1 text-sm w-28 border border-gray-300 h-8 px-2 hover:bg-gray-100 focus:bg-gray-100 rounded-[5px]"
              />
            </div>
          </div>
          <table class="text-sm w-full mt-3 overflow-auto">
            <thead class="font-medium text-gray-500 bg-gray-100 text-left">
              <th
                v-for="(item, index) in tableHead"
                :key="index"
                class="px-2 py-1 text-center"
              >
                {{ item }} <fa icon="fa-solid fa-caret-down" />
              </th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in deposits" :key="index">
                <td class="px-2 pt-1 text-center">{{ item?.id }}</td>
                <td class="px-2 pt-1 text-center">{{ item?.date_created }}</td>
                <td class="px-2 pt-1 text-center">{{ item?.time_created }}</td>
                <td class="px-2 pt-1 text-center">
                  {{ item?.status ? "Approved" : "Pending" }}
                </td>
                <td class="px-2 pt-1 text-center">{{ item?.amount }}</td>
                <td class="px-2 pt-1 text-center">{{ item?.bitcoin }}</td>
                <td class="px-2 pt-1 text-center">
                  <img
                    :src="item?.proof"
                    alt="Proof"
                    class="w-14 h-14 mx-auto"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p
            class="text-center py-1 px-2 border-y mt-2 border-black"
            v-if="!deposits?.length"
          >
            No data available in table
          </p>
          <div
            v-if="deposits?.length"
            class="w-full flex justify-between flex-row mt-2 px-5"
          >
            <p class="pt-1">
              Show {{ meta?.first_item }} to {{ meta?.last_item }} of
              {{ meta?.num_items }} entries
            </p>
            <div class="flex flex-row gap-2">
              <button
                v-if="meta?.prev_page"
                @click="getDeposits(entries, meta?.prev_page)"
                class="hover:bg-gray-200 py-1 px-2 rounded-md"
              >
                Previous
              </button>
              <button
                v-if="meta?.next_page"
                @click="getDeposits(entries, meta?.next_page)"
                class="hover:bg-gray-200 py-1 px-2 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useComp from "../../mix/media.js";
import useComp1 from "../../mix/data.js";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  name: "DepositHistory",
  props: {
    setWel: Function,
  },
  setup({ setWel }) {
    const { customFetcher, err, changeErr } = useComp1();
    const { upImg } = useComp();
    const deposits = ref({});
    const pic = ref("");
    const tranId = ref("");
    const val = ref("");
    const dis = ref(false);
    const err1 = ref("");
    const tableHead = [
      "ID",
      "DATE",
      "TIME",
      "STATUS",
      "AMOUNT",
      "BITCOIN",
      "PROOF",
    ];
    const noneText = ref("");
    const entries = ref("10");
    const meta = ref({});

    const newPic = (val = "empty") => {
      pic.value = val;
    };

    const upPic = (e) => {
      upImg(e, newPic);
    };

    const getDeposits = async (page_size, page = 1) => {
      try {
        const { data } = await customFetcher(
          `deposit/get/${page_size}/${page}`
        );
        deposits.value = data.items;
        meta.value = data.meta;
        noneText.value = "You haven't made any deposit requests yet!";
      } catch {}
    };

    const searchDeposits = async (index) => {
      try {
        if (index && index != 0) {
          const { data } = await customFetcher(`deposit/get/${index}`);
          if (data?.id) {
            deposits.value = [data];
          }
          noneText.value = "";
        } else {
          getDeposits(entries.value);
        }
      } catch {
        getDeposits(entries.value);
      }
    };

    const upProof = async (index) => {
      dis.value = true;
      const body = {
        proof: pic.value.trim(),
      };
      try {
        const { res, data } = await customFetcher(
          `deposit/proof/${index ? index : 0}`,
          {
            method: "PUT",
            body: JSON.stringify(body),
          }
        );
        if (res.ok) {
          err1.value = "";
          setWel(data.heading, data.content);
          getDeposits(entries.value);
        } else {
          err1.value = data.message;
        }
      } catch {
        changeErr();
        err1.value = err.value.msg;
      }
      pic.value = "";
      dis.value = false;
      tranId.value = "";
      window.scroll(0, 0);
    };

    onBeforeMount(() => {
      getDeposits(entries.value);
    });

    return {
      tableHead,
      tranId,
      upPic,
      err1,
      deposits,
      val,
      searchDeposits,
      noneText,
      entries,
      getDeposits,
      upProof,
      meta,
      dis,
    };
  },
};
</script>

<style>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "UPLOAD PROOF OF PAYMENT";
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
}
</style>
