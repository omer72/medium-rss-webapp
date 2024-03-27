import styled from "styled-components";
import { rssItem } from "../api/fetchRss";

type Prop = {
    value: rssItem
}

const RssBox = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    width: 80%;
    padding: 5px;
    border-bottom: 2px solid #E4EAFF;
    row-gap: 16px;
`
const Title = styled.h3`
    max-width: calc(100% - 38px);
    width: 100%;
    text-decoration: none;
    color: rgb(66, 66, 66);
    word-break: break-word;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 8px;
`

const RssDate = styled.div`
    -webkit-box-align: center;
    align-items: center;
    color: rgb(153, 153, 153);
    font-size: 14px;
    display: flex;
    margin-right: 8px;
    min-width: max-content;
`

const RssDescription = styled.div`
    max-width: 80%
`
const RssCreator = styled.h4`
`

function RssItem({value}:Prop) {

    const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

      
    return (
        <RssBox>
           <Title>{value.title._cdata}</Title> 
          {value.description ? <RssDescription dangerouslySetInnerHTML={{__html:value.description._cdata}}></RssDescription> : null }
          <RssCreator>Creator : {value['dc:creator']._cdata}</RssCreator>
          <RssDate>{formatDate(value.pubDate._text)}</RssDate>
          </RssBox>
    )
}


export default RssItem;