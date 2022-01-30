import { useRouter, ref } from "@nuxtjs/composition-api";
export default function routeGuard() {
    let isLoggedIn = ref(false)
    const routeCheck = async(routeType) => {
        const router = useRouter()
        try {
            const routeGuard = await routeType
            isLoggedIn.value = true
            return routeGuard;
        } catch (e) {
            router.push({
            name: 'index',
            })
        }
    }
    return { routeCheck, isLoggedIn }
}