<template>
    <v-row v-if="isLoggedIn" justify="center" align="center" class="flex-column">
        <h1 class="pa-5">News manager</h1>
        <v-data-table
        :items="news.data"
        :hide-default-footer="true"
        :headers="headers"
        class="elevation-1"
        
        :loading="isLoading"
        loading-text="Please wait..."
        >
            <template v-slot:item.actions="{ item }">
            <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            >
            mdi-pencil
            </v-icon>
            <v-icon
            small
            @click="deleteItem(item)"
            >
            mdi-delete
            </v-icon>
        </template>
      </v-data-table>
        <div class="text-center">
        <v-pagination
            v-model="news.page"
            @input="changePage(news.page, perPage)"
            @next="changePage(news.page++, perPage)"
            @prev="changePage(news.page--, perPage)"
            :length="news.maxPages"
        ></v-pagination>
        </div>
    </v-row>
</template>
<script>

import UsersService from "@/api/users";
import blogService from '@/api/blog/blog';
import routeGuard from '@/composable/routeGuard.js';
export default {
    data () {
        return {
            headers: [
            {
            text: 'ID',
            align: 'start',
            filterable: false,
            value: 'id',
            },
            { text: 'Title', value: 'title' },
            { text: 'Active status', value: 'active' },
            { text: 'Actions', align: "end", value: 'actions', sortable: false },
        ],
            isLoading: false,
            perPage: 3
        }
    },
    watch: {
        options: {
            handler (e) {
                console.log(e)
            },
            deep: true
        }
    },
    setup() {
        const { routeCheck, isLoggedIn } = routeGuard();
        const routeGuardFetch = async() => {
            await routeCheck(UsersService.adminInfoRoute())
        }
        routeGuardFetch()
        return { isLoggedIn }
    },
    async asyncData({route}) {
        const newsRequest = await blogService.getPage(route.query);
        const news = await newsRequest.data
        return { news }
    },
    methods: {
        async changePage (page, perPage) {
            const params = {
                page,
                perPage
            }
            const newsRequest = await blogService.getPageSync(params)
            const news = newsRequest.data
            this.news = news
        },
        editItem (item) {
            console.log(item)
        },
        deleteItem (item) {
            console.log(item)
        }
    }


}
</script>
