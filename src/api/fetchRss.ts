import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type rssItem = {
    title: {
      _cdata:string
    },
    description: {
      _cdata:string
    },
    link:{
      _text:string
    },
    "dc:creator":{
      _cdata:string
    }
    pubDate:{
      _text:string
    }
}

export type rssValue = {
    item: [rssItem]
}

export function useFetchRss(userId:string){

    async function fetchRss():Promise<rssValue>{
        return (await axios.get(`http://localhost:3000/${userId}`)).data
    }

    return useQuery({
        queryKey:['rss', 'feed', userId], 
        queryFn: fetchRss, 
        enabled: false, // (!) handle refetchs manually
        refetchOnWindowFocus : false} )
}

export function useFetchValidAccounts(){

    async function fetchValidAccounts():Promise<[string]>{
        return (await axios.get(`http://localhost:3000`)).data
    }

    return useQuery({
        queryKey:['validAccount'], 
        queryFn: fetchValidAccounts} )
}