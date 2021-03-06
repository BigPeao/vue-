import Vue from 'vue'
import Router from 'vue-router'


import WellChosenPage from '@/pages/wellchosen/index.vue'
import BookStoragePage from '@/pages/bookstorage/default.vue'
import BookCasePage from '@/pages/bookcase/index.vue'
import MinePage from '@/pages/mine/default.vue'

import BookInfoPage from '@/pages/bookstorage/bookdetail/index.vue'
import ReadingPage from '@/pages/readingcenter/index.vue'

import BookCaseRoutes from './bookcase'
import BookStorageRoutes from './bookstorage'
import MineRoutes from './mine'
import Pay from "@/pages/pay/index.vue";
import PayRecharge from "@/pages/pay/recharge.vue";
import bookcase from './bookcase';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: BookStoragePage,
            children: BookStorageRoutes,
            meta: {
                title: '书城'
            }
        },
        {
            path: '/wellchosen',
            component: WellChosenPage
        }, {
            path: '/bookcase/:type',
            component: BookCasePage,
            children: BookCaseRoutes,
            meta: {
                title: '书架'
            }
        }, {
            path: '/bookstorage',
            component: BookStoragePage,
            children: BookStorageRoutes,
            meta: {
                title: '书城'
            }
        },
        {
            path: '/mine',
            component: MinePage,
            children: MineRoutes,
            meta: {
                title: '个人中心'
            }
        },
        {
            path: '/book/:bid/:cid',
            meta: {
                isReading: true
            },
            component: ReadingPage
        },
        {
            path: '/pay',
            meta: {
                requireAuth: true,
            },
            component: Pay
        },
        {
            path: '/pay/recharge',
            component: PayRecharge
        }
    ]
})