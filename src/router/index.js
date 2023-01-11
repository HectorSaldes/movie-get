import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FavoriteView from "@/views/FavoriteView.vue";
import ProfileView from "@/views/ProfileView.vue";
import BannedView from "@/views/BannedView.vue";

const routes = [
    {
        path: '/favorite',
        name: 'favorite',
        component: FavoriteView
    },
    {
        path: '/',
        name: 'home',
        component: HomeView
    }, {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    }, {
        path: '/banned',
        name: 'banned',
        component: BannedView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
