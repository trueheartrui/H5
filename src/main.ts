import './assets/main.css'
import { Button } from 'vant';
import { Form, Field, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Col, Row } from 'vant';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

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

app.mount('#app')
