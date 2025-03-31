import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DefaultLayout from './layout/wrapper/MasterRocker.vue'
import Auth from './layout/wrapper/AuthMaster.vue'
import Admin from './layout/wrapper/AdminMaster.vue'
import Client from './layout/wrapper/ClientMaster.vue'
import Toaster from "@meforma/vue-toaster";
import ChuyenGia from './layout/wrapper/ChuyenGiaMaster.vue'
import CoQuan from './layout/wrapper/CoQuanMaster.vue'

const app = createApp(App)

app.use(router, Toaster)
app.component("default-layout", DefaultLayout);
app.component("auth-layout", Auth);
app.component("admin-layout", Admin);
app.component("chuyen-gia-layout", ChuyenGia);
app.component("co-quan-layout", CoQuan);
app.component("client-layout", Client);
// app.component("co-quan-layout", CoQuanMaster);


app.mount("#app")
