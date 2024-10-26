import './App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';

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
import Home from "./pages/Home";
import {doc, getDoc} from "firebase/firestore";
import { getToken } from 'firebase/messaging';
import TopNav from './component/common/TopNav';
import BottomNav from './component/common/BottomNav';

const cookies = new Cookies();

function App() {
    const { height } = useSize();
    useEffect(() => {
        async function requestPermission() {
            console.log("권한 요청 중...");
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("알림 권한이 허용됨");
                try {
                    const currentToken = getToken(messaging, {
                        vapidKey: 'BHxLI9MyVyff7V0GVCp4n6sxF3LwarXbJHHbx1wO2SSil7bgJMy0AiYhONPMrMFpYZ2G6FyDO_AYmHqs-sDJ4p0'
                        
                    });
                    console.log(currentToken)


                } catch (error) {
                    console.error("Error getting token", error);
                }
            } else {
                console.log("알림 권한 허용 안함")
            }
            
        }

        requestPermission();
    }, []);

    let navigate = useNavigate()

    //firebase setting
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
    const [userName, setUserName] = useState('')
    const [userMail, setUserMail] = useState('')
    const [diaryCount, setDiaryCount] = useState(null)
    const current = new Date();
    const date = `${current.getFullYear()}년 ${current.getMonth() + 1}월 ${current.getDate()}일`;

    async function settingName() {
        const docRef = doc(db, 'prompt', 'module1_1');
        
        const docSnap = await getDoc(docRef);
        var user = await (auth.currentUser.displayName)
        var mail = await (auth.currentUser.email)
        setUserName(user)
        setUserMail(mail)
    }

    useEffect(() => {
        settingName()
    })

    const signUserOut = async () => {
        await signOut(auth)
        cookies.remove("auth-token")
        setIsAuth(false)
    }
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
                           element={isAuth ? (<div><DiaryList userName={userName} userMail={userMail} number={3} /><BottomNav number={3} signUserOut={signUserOut}/></div>) : (
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
