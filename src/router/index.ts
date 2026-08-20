import {createRouter, createWebHistory} from 'vue-router'
import FirstPage from '../components/FirstPage.vue'
import SecondPage from '../components/SecondPage.vue'

const routes = [
    { path: '/', component: FirstPage},
    { path: '/second_page', component: SecondPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router