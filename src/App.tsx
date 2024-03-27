import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { useFetchRss } from './api/fetchRss';
import RssItem from './components/rssItem';
import Search from './components/search';

import './App.css'

const ErrorText = styled.div`
  color: #6B6B6B;
  font-weight: 400;
  margin: 10px;
`
function App() {

  const [userName, setUserName] = useState('')
  const { data, isLoading , refetch, isFetched } = useFetchRss(userName);
  const queryClient = useQueryClient();

  const searchRss = () => {
      refetch();
  }

  useEffect(() => {
    if (isFetched && data?.item){
      queryClient.setQueryData(['validAccount'], (prev: any) => {
        prev.push(userName);
        return prev;
      });
    }
  }, [isFetched])


  return (
    <>
      <Search searchRss={searchRss} setUserName={setUserName} />
      <>
        {isLoading ? <div>Loading....</div> :
         <div>{data?.item ? data?.item.map(item => <RssItem value={item}/>) :
         <ErrorText> Make sure all words are spelled correctly.</ErrorText>}</div>}
      </>
    </>
  )
}

export default App
