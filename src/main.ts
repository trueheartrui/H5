import { Button } from 'vant';
import { Form, Field, Cell, CellGroup, Calendar, Divider, TimePicker, Stepper, Dialog, showConfirmDialog, Search, NavBar, Step, Steps  } from 'vant';
import { Icon } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Col, Row } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
import './assets/variable.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { api } from './request'

const app = createApp(App)
app.config.globalProperties.$showConfirmDialog = showConfirmDialog
app.config.globalProperties.$api = api

app.use(createPinia())
app.use(router)

import 'vant/lib/index.css';
app.use(Button)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Col);
app.use(Row);
app.use(Popup);
app.use(Cell);
app.use(Calendar);
app.use(Cascader);
app.use(Divider);
app.use(TimePicker);
app.use(Stepper);
app.use(Dialog);
app.use(Search);
app.use(NavBar);
app.use(Step);
app.use(Steps);

app.mount('#app')
