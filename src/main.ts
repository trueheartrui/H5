import { Button } from 'vant';
import { Form, Field, Cell, CellGroup, Calendar, Divider, TimePicker, Stepper, Dialog, showConfirmDialog, showToast, showSuccessToast, showNotify, Search, NavBar, Step, Steps, List, Tag, SwipeCell,Empty   } from 'vant';
import { Icon } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Col, Row } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
import './assets/app.scss'
import './assets/variable.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { api } from './request'

const app = createApp(App)
app.config.globalProperties.$showConfirmDialog = showConfirmDialog
app.config.globalProperties.$showSuccessToast = showSuccessToast
app.config.globalProperties.$showToast = showToast
app.config.globalProperties.$showNotify = showNotify
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
app.use(List);
app.use(Tag);
app.use(SwipeCell)
app.use(Empty)

app.mount('#app')
