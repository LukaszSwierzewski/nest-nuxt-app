import { reactive, computed, toRefs, onMounted, ref } from "@nuxtjs/composition-api";
import UsersEndpoint from '@/api/users.js'
export default function requestHandler() {
    let users = ref([])
    const fetchUsers = async() => {
        const users = await UsersEndpoint.getAll()
        return users
    }
    return { users, fetchUsers }
}