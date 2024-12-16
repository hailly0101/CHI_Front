import './App.css';



import React from 'react';
import useSize from './component/common/useSize';
import { extendTheme, ChakraProvider, StyleFunctionProps } from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {Routes, Route} from 'react-router-dom';

import Auth from './pages/Auth';
import Cookies from 'universal-cookie';


import Writing from "./pages/Writing";
import Loading from "./pages/Loading";
import DiaryList from "./pages/DiaryList";
import Home from "./pages/Home";

import TopNav from './component/common/TopNav';
import BottomNav from './component/common/BottomNav';
import DiaryMock from "./pages/Result"

const cookies = new Cookies();

function App() {
    const { height } = useSize();
  
    const styles = {
        global: (props: StyleFunctionProps) => ({
          html: {
            maxW: '500px',
            mx: 'auto',
            height: height,
            bg: 'gray.100',
            webkitTouchCallout: 'none',
            webkitUserSelect: 'none',
            webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          },
          body: {
            color: 'black',
          },
        }),
      };
      
      const theme = extendTheme({
        styles,
      });
      
    const [expanded, setExpanded] = useState(false);
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
        setDomLoaded(true);
    },[])
    return (
        
        <ChakraProvider theme={theme}>

            <div className="App">
            <div>
               <TopNav/>
                <Routes>
                    <Route path="/" element={
                        <div>
                            {/* 로그인 한 상태이면 HOME 으로 그렇지 않으면 Auth 로그인 페이지로 이동 */}
                            {isAuth ? ( <><Home userName={userName} userMail={userMail} diaryCount={diaryCount}/><BottomNav number={1} /></>) : (
                                <Auth setIsAuth={setIsAuth} setUserName={setUserName}/>)}
                        </div>
                    }/>
                    <Route path="/writing"
                           element={isAuth ? (<div><Writing userName={userName} userMail={userMail}/><BottomNav number={2}/></div>) : (
                               <Auth setIsAuth={setIsAuth} setUserName={setUserName} setUserMail={setUserMail}/>)
                           }/>
                    <Route path="/list"
                           element={isAuth ? (<div><DiaryMock /><BottomNav number={3}/></div>) : (
                               <Auth setIsAuth={setIsAuth} setUserName={setUserName} setUserMail={setUserMail}/>)}/>
                    <Route path="/loading" element={<div><Loading/></div>}/>
                    <Route path="*" element={<div>404~ 없는페이지임</div>}/>
                </Routes>
            </div>

        </div>
        </ChakraProvider>
    );
}

export default App;
