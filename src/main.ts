import { createApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";

import "./assets/style/base.scss";

createApp(App).use(MotionPlugin).mount("#app");
