import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import Dynamic from './pages/Dynamic.vue';
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const routes = [{
        path: '/dynamic/:id',
        component: Dynamic,
        props: true,
        params: true,
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/favorites',
        component: Favorites,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;