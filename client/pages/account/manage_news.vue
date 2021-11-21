<template>
    <v-row justify="center" align="center" class="flex-column">
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
            @input="paginationChange"
            @next="nextPage"
            @prev="prevPage"
            :length="news.maxPages"
        ></v-pagination>
        </div>
    </v-row>
</template>
<script>

import userService from "../../api/users";
import blogService from '../../api/blog/blog';
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
    async created() {
        const routeGuard = await userService.adminInfoRoute();
    },
    async asyncData({route}) {
        const newsRequest = await blogService.getPage(route.query);
        const news = await newsRequest.data
        return { news }
    },
    methods: {
        test (e) {
            console.log(e)
        },
        async nextPage () {
            const params = {
                page: this.news.page++,
                perPage: this.perPage
            }
            const newsRequest = await blogService.getPageSync(params)
            const news = await newsRequest.data
            this.news = news
        },
        async prevPage () {
            const params = {
                page: this.news.page--,
                perPage: this.perPage
            }
            const newsRequest = await blogService.getPageSync(params)
            const news = await newsRequest.data
            this.news = news
        },
        async paginationChange () {
            const params = {
                page: this.news.page,
                perPage: this.perPage
            }
            const newsRequest = await blogService.getPageSync(params)
            const news = await newsRequest.data
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
