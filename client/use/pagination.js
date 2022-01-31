import { ref } from "@nuxtjs/composition-api"
import blogService from '@/api/blog/blog';
export default function paginationComposition() {
    // TODO -> make pagination composable
    const changePageAndFetch = async (page, perPage) => {
        const params = {
            page,
            perPage
        }
        const newsRequest = await blogService.getPageSync(params)
        const news = newsRequest.data
        return news
    }

  return { changePageAndFetch };
}