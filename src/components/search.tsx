import { ChangeEvent, useState } from "react";
import { useFetchValidAccounts } from "../api/fetchRss";
import styled from "styled-components";

interface Props{
    searchRss:() => void;
    setUserName:(value:string) => void;
}

const SearchInput = styled.input`
    width: 300px;
    font-size: 18px;
    margin-right: 5px;
`
const SearchButton = styled.button`
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`
const Options = styled.div`
    border: 1px solid black;
    width: 307px
`

const DropDownText = styled.div`
    font-size: 19px;
    padding: 2px;
`


function Search({searchRss, setUserName}:Props){

    const { data:validAccounts} = useFetchValidAccounts();
    const [showDropDown, setShowDropDown] = useState(false);
    const [accountName, setAccountName] = useState('');
    
    function setSearchText(newText: ChangeEvent<HTMLInputElement>): void {
        setUserName(newText.target.value);
        setAccountName(newText.target.value)
    }
    
    return (
        <>
            <SearchInput type='text' 
                value={accountName}
                onChange={newText => setSearchText(newText)}
                onClick={()=>setShowDropDown(true)}
            ></SearchInput>
            <SearchButton onClick={() =>{
                setShowDropDown(false);
                searchRss();
            }}>Search</SearchButton>
            {showDropDown ? <Options>
                {validAccounts?.map((acc, index) =>
                 <DropDownText key={index} onClick={() =>{
                    setAccountName(acc);
                    setUserName(acc);
                    setShowDropDown(false);
                    }}>{acc}</DropDownText>)}
                </Options>: null}
        </>
    )
}

export default Search;