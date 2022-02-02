import { AxiosPromise, AxiosResponse } from 'axios'


export default function usePaginate() {
    // TODO -> make pagination composable
    type RequestMethod = () => Promise<AxiosPromise>
    const changePageAndFetch = async (requestMethod: RequestMethod): Promise<AxiosResponse<any, any>> => {

        const newsRequest: any = await requestMethod
        return newsRequest.data
    }

  return { changePageAndFetch };
}