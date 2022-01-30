import { ref } from "@nuxtjs/composition-api"
export default function paginationComposition() {
    // TODO
    const changePageAndFetch = async (page, perPage, requestEndpoint) => {
        const params = {
            page,
            perPage
        }
        const newsRequest = await blogService.getPageSync(params)
        const newsRequest = await requestEndpoint
        const news = newsRequest.data
        return news
    },

  return { changePageAndFetch };
}