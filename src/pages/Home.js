import {React, useEffect, useRef, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";
import book_blue from "../img/book_blue.jpg";
import book_purple from "../img/book_purple.jpg";
import chat from "../img/chat.jpg";
import lock from "../img/lock.jpg";
import {
    collection,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    getDocs,
    getDoc,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";  // FCM 관련 함수 추가
import {db} from "../firebase-config";
import Button from "react-bootstrap/Button";


function Home(props) {

    const navigate = useNavigate();
    const [diaryList, setDiaryList] = useState([]);
    const updateProgress = useRef(true);
    const [emptyList, setEmptyList] = useState(false);
    const [lastDate, setLastDate] = useState("");

    useEffect(() => {
        async function renewList() {
            const diary = await receiveDiaryData();
            await setDiaryList(diary);
            updateProgress.current = false;
        }

        if (updateProgress.current) {
            renewList();
        } else {
            if (diaryList.length === 0) {
                setEmptyList(true);
            }
            console.log(diaryList);
            console.log(lastDate);
        }

        // 로그인 시 FCM 토큰 처리
        handleFCMToken(props.userMail);

    }, []);

    // FCM 토큰을 생성하고, Firestore에 저장/업데이트하는 함수
    async function handleFCMToken(userEmail) {
        try {
            const messaging = getMessaging();
            const token = await getToken(messaging, { vapidKey: 'Ud_cMm29hcY8LmlFgGWYSc3p6RehpWOHXdTyZb_HZ1o' });  // VAPID 키를 설정해야 함

            if (token) {
                console.log('FCM Token:', token);

                // Firestore에서 기존 FCM 토큰 불러오기
                const userDocRef = doc(db, userEmail.includes('doctor') ? 'doctor' : 'patient', userEmail);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const existingToken = userDocSnap.data().fcmToken;
                    // 기존 FCM 토큰과 현재 토큰이 다르면 업데이트
                    if (existingToken !== token) {
                        await updateDoc(userDocRef, { fcmToken: token });
                        console.log('FCM Token updated in Firestore');
                    } else {
                        console.log('FCM Token is already up to date');
                    }
                } else {
                    // FCM 토큰이 없는 경우 새로 저장
                    await setDoc(userDocRef, { fcmToken: token }, { merge: true });
                    console.log('FCM Token saved to Firestore');
                }
            } else {
                console.log('No FCM token available. Request permission to generate one.');
            }
        } catch (error) {
            console.error('Error handling FCM token:', error);
        }
    }

    function navigateToWriting() {
        navigate("/writing");
    }

    function navigateToReview() {
        navigate("/list");
    }

    async function receiveDiaryData() {
        let tempArr = [];
        const userDocRef = doc(db, 'session', props.userMail);
        const diaryCompleteCollRef = collection(userDocRef, 'diary');
        const q = query(diaryCompleteCollRef, where('isFinished', '==', true), orderBy('sessionEnd', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            tempArr.push(doc.data());
        });

        if (tempArr.length === 0) {
            setEmptyList(true);
            return [];
        } else {
            setLastDate(tempArr[tempArr.length - 1]["sessionEnd"]);
            return tempArr;
        }
    }

    function Unix_timestamp(t) {
        var date = new Date(t * 1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();
        return year + "년 " + month.substr(-2) + "월 " + day.substr(-2) + "일 ";
    }

    return (
        <div>
            {lastDate === "" ? <NoDiary userName={props.userName} diaryList={diaryList} lastDate={lastDate}
                                        navigateToWriting={navigateToWriting}
                                        navigateToReview={navigateToReview} Unix_timestamp={Unix_timestamp}/> :
                <Loading_complete userName={props.userName} diaryList={diaryList} lastDate={lastDate}
                                  navigateToWriting={navigateToWriting}
                                  navigateToReview={navigateToReview} Unix_timestamp={Unix_timestamp}/>}
        </div>
    );
}

function NoDiary(props) {
    return (
        <Container>
            {/* 여기에 NoDiary 화면 구현 */}
        </Container>
    );
}

function Loading_complete(props) {
    return (
        <Container>
            {/* 여기에 Loading_complete 화면 구현 */}
        </Container>
    );
}

export default Home;