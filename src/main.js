import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faXmark,
  faPhone,
  faLock,
  faLockOpen,
  faArrowRightArrowLeft,
  faCopy,
  faMagnifyingGlass,
  faTrashCan,
  faEnvelope,
  faTriangleExclamation,
  faAddressCard,
  faUserPlus,
  faUser,
  faCreditCard,
  faMoneyBillTransfer,
  faUserMinus,
  faDoorOpen,
  faFileInvoiceDollar,
  faBitcoinSign,
  faMoneyBillTrendUp,
  faMoneyCheckDollar,
  faMoneyBills,
  faMoneyBillWheat,
  faRightToBracket,
  faCaretDown,
  faHistory,
  faIdCard,
  faUserPen,
  faFloppyDisk,
  faImage,
  faWallet,
  faKey,
  faAddressBook,
  // faDove,
} from "@fortawesome/free-solid-svg-icons";
import {
  // faInstagram,
  faBitcoin,
  faEthereum,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./index.css";

library.add(
  faCreditCard,
  faMoneyBillTransfer,
  faUser,
  faBars,
  faXmark,
  faPhone,
  // faInstagram,
  faLock,
  faLockOpen,
  faArrowRightArrowLeft,
  faCopy,
  faMagnifyingGlass,
  faTrashCan,
  // faDove,
  faEnvelope,
  faBitcoin,
  faEthereum,
  faTriangleExclamation,
  faAddressCard,
  faUserPlus,
  faUserMinus,
  faDoorOpen,
  faFileInvoiceDollar,
  faBitcoinSign,
  faMoneyBillTrendUp,
  faMoneyCheckDollar,
  faMoneyBillTransfer,
  faMoneyBills,
  faMoneyBillWheat,
  faRightToBracket,
  faCaretDown,
  faHistory,
  faIdCard,
  faUserPen,
  faLock,
  faTrashCan,
  faFloppyDisk,
  faImage,
  faWallet,
  faKey,
  faAddressBook
);

const app = createApp(App);

app.component("fa", FontAwesomeIcon);

app.use(router);

app.mount("#app");
