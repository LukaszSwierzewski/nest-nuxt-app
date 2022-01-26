import { useRouter } from "@nuxtjs/composition-api";
import UsersService from '@/api/users.js'
export default function routeGuard() {
    const routeCheck = async() => {
        const router = useRouter()
        try {
            const routeGuard = await UsersService.userInfoRoute();
            return routeGuard;
        } catch (e) {
            router.push({
            name: 'index',
            })
        }
    }
    return { routeCheck }
}