import { useEffect, useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Card from 'react-bootstrap/Card';
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    increment,
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

function DiaryList(props) {
    const [diaryList, setDiaryList] = useState([]);
    const updateProgress = useRef(true);
    const [emptyList, setEmptyList] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const [userType, setUserType] = useState(null);  // 의사 또는 환자 정보 저장

    // 사용자 유형을 Firestore에서 확인하여 의사 또는 환자 구분
    useEffect(() => {
        async function fetchUserType() {
            // Firestore에서 doctor 컬렉션에서 현재 사용자가 의사인지 확인
            const userDocRef = doc(db, "doctor", props.userMail);  // 'doctor/{userMail}' 경로로 수정
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // 의사 계정이면 doctor로 설정
                setUserType("doctor");
            } else {
                // 의사 계정이 아니면 patient로 설정
                setUserType("patient");
            }
        }

        async function renewList() {
            const diary = await receiveDiaryData();
            setDiaryList(diary);
            updateProgress.current = false;
        }

        if (updateProgress.current) {
            fetchUserType().then(renewList);
        } else {
            if (diaryList.length === 0) {
                setEmptyList(true);
            }
        }
    }, [diaryList]);

    // Timestamp 변환 함수
    function Unix_timestamp(t) {
        const date = new Date(t * 1000);
        const year = date.getFullYear();
        const month = "0" + (date.getMonth() + 1);
        const day = "0" + date.getDate();
        return `${year}년 ${month.substr(-2)}월 ${day.substr(-2)}일 `;
    }

    function Unix_timestamp2(t) {
        const date = new Date(t * 1000);
        const hour = "0" + date.getHours();
        const minute = "0" + date.getMinutes();
        return `${hour.substr(-2)}시 ${minute.substr(-2)}분 작성됨`;
    }

    // 좋아요 추가 기능
    async function addLike(idx) {
        const findSession = diaryList[idx]["sessionNumber"];
        const diaryCollectionRef = collection(db, 'session', props.userMail, 'diary');
        const q = query(diaryCollectionRef, where('sessionNumber', '==', findSession));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                like: increment(1)
            });
            updateProgress.current = true;
            setRefresh(refresh + 1);
        } else {
            console.log('No document found with the given sessionNumber');
        }
    }

    // 근육 추가 기능
    async function addMuscle(idx) {
        const findSession = diaryList[idx]["sessionNumber"];
        const diaryCollectionRef = collection(db, 'session', props.userMail, 'diary');
        const q = query(diaryCollectionRef, where('sessionNumber', '==', findSession));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                muscle: increment(1)
            });
            updateProgress.current = true;
            setRefresh(refresh + 1);
        } else {
            console.log('No document found with the given sessionNumber');
        }
    }

    // 의사 계정이면 환자들의 일기를, 환자 계정이면 자신의 일기만 불러오는 함수
    async function receiveDiaryData() {
        let tempArr = [];

        if (userType === "doctor") {
            // 의사일 경우 환자들의 일기를 불러옴
            const userDocRef = doc(db, "doctor", props.userMail);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const patients = userDoc.data().patient; // 환자 이메일 목록

                for (const patientEmail of patients) {
                    const diaryCompleteCollRef = collection(db, 'session', patientEmail, 'diary');
                    const q = query(diaryCompleteCollRef, where('isFinished', '==', true));

                    try {
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            tempArr.push({
                                ...doc.data(),
                                patientEmail: patientEmail  // 각 일기에 환자의 이메일 추가
                            });
                        });
                    } catch (error) {
                        console.error(`Error fetching diary for patient ${patientEmail}:`, error);
                    }
                }
            }
        } else {
            // 환자일 경우 자신의 일기만 불러옴
            const diaryCompleteCollRef = collection(db, 'session', props.userMail, 'diary');
            const q = query(diaryCompleteCollRef, where('isFinished', '==', true));

            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    tempArr.push(doc.data());
                });
            } catch (error) {
                console.error("Error fetching diary:", error);
            }
        }

        if (tempArr.length === 0) {
            setEmptyList(true);
        }

        return tempArr;
    }

    if (emptyList === true) {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="diarylist_box">
                                <div>일기 돌아보기</div>
                            </div>
                            <div className="loading_box_home_bottom">
                                <span className="desktop-view">
                                    🥲 아직 작성한 일기가 없어요. 첫 일기를 작성해볼까요?
                                </span>
                                <span className="smartphone-view-text">
                                    🥲 아직 작성한 일기가 없어요. 첫 일기를 작성해볼까요?
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="diarylist_box">
                                <div>일기 돌아보기</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="writing_box">
                            <Row xs={'auto'} md={1} className="g-4">
                                {diaryList.map((diary, idx) => (
                                    <Col key={idx}>
                                        <Card style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Title>{Unix_timestamp(diary["sessionEnd"])}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <div className="nav_title_blue">{Unix_timestamp2(diary["sessionEnd"])}</div>
                                                    {userType === "doctor" && (
                                                        <div className="nav_title_blue">환자 이메일: {diary.patientEmail}</div>
                                                    )}
                                                </Card.Subtitle>
                                                <Card.Text>{diary["diary"]}</Card.Text>
                                                <span className="likebutton" onClick={() => addLike(idx)}>️❤️</span> <b>{diary["like"]}</b>
                                                <span className="likebutton" onClick={() => addMuscle(idx)}>&nbsp;&nbsp;&nbsp;💪️ </span><b>{diary["muscle"]}</b>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                                <div className="footer"></div>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DiaryList;
