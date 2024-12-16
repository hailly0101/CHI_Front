import './App.css';



import React from 'react';
import useSize from './component/common/useSize';
import { extendTheme, ChakraProvider, StyleFunctionProps } from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import { messaging } from './firebase-config';
import Auth from './pages/Auth';
import Cookies from 'universal-cookie';
import {signOut} from 'firebase/auth';
import {auth, db} from './firebase-config';

import Writing from "./pages/Writing";
import Loading from "./pages/Loading";
import DiaryList from "./pages/DiaryList";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {doc, getDoc} from "firebase/firestore";
import { getToken } from 'firebase/messaging';
import TopNav from './component/common/TopNav';
import Write2 from './pages/Writing2'
import DiaryMock from './pages/Result'

import { getEmail, getUserId, setEmail } from './localstorage/user';



function App() {
    const { height } = useSize();

    useEffect(() => {
      setEmail('hj@naber.com')
      console.log(getEmail())
    },[])
   

   
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
                            <Auth/>
                            {/* {isAuth ? ( <><Home userName={userName} userMail={userMail} diaryCount={diaryCount}/><BottomNav number={1} /></>) : (
                                <Auth setIsAuth={setIsAuth} setUserName={setUserName}/>)} */}
                        </div>
                    }/>
                    <Route path="/home" element={<Home/>}/>
                    {/* <Route path="/writing" element={<Writing userName={'Lamda'} userMail={'skku@gmail.com'}/>}/> */}
                    <Route path="/writing2" element={<Write2 />}/>
                    {/* <Route path="/writing"
                           element={isAuth ? (<div><Writing userName={userName} userMail={userMail}/><BottomNav number={2}/></div>) : (
                               <Auth setIsAuth={setIsAuth} setUserName={setUserName} setUserMail={setUserMail}/>)
                           }/>
                    <Route path="/list"
                           element={isAuth ? (<div><DiaryList userName={userName} userMail={userMail} number={3} /><BottomNav number={3}/></div>) : (
                               <Auth setIsAuth={setIsAuth} setUserName={setUserName} setUserMail={setUserMail}/>)}/>
                    <Route path="/loading" element={<div><Loading/></div>}/> */}
                    <Route path='/list' element={<DiaryMock/>}/>
                   <Route path="*" element={<div>404~ 없는페이지임</div>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>

        </div>
        </ChakraProvider>
    );
}

export default App;
