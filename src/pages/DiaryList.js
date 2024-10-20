import { useEffect, useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    increment,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";
import { db } from "../firebase-config";

function DiaryList(props) {
    const [diaryList, setDiaryList] = useState([]);
    const updateProgress = useRef(true);
    const [emptyList, setEmptyList] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const [userType, setUserType] = useState(null);  // 의사 또는 환자 정보 저장
    const [feedback, setFeedback] = useState({});  // 피드백 상태 저장
    const [unfinishedFeedbackCount, setUnfinishedFeedbackCount] = useState(0); // 피드백 미완료 개수

    // 사용자 유형을 Firestore에서 확인하여 의사 또는 환자 구분
    useEffect(() => {
        async function fetchUserType() {
            // Firestore에서 doctor 컬렉션에서 현재 사용자가 의사인지 확인
            const userDocRef = doc(db, "doctor", props.userMail);  // 'doctor/{userMail}' 경로로 수정
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // 의사 계정이면 doctor로 설정
                setUserType("doctor");
                console.log("의사 계정입니다. 이메일: ", props.userMail);
            } else {
                // 의사 계정이 아니면 patient로 설정
                setUserType("patient");
                console.log("환자 계정입니다. 이메일: ", props.userMail);
            }
        }

        fetchUserType();
    }, [props.userMail]);

    // userType이 설정된 후에 일기 데이터를 가져옴
    useEffect(() => {
        if (userType) {
            async function renewList() {
                const diary = await receiveDiaryData();
                setDiaryList(diary);
                updateProgress.current = false;
            }

            if (updateProgress.current) {
                renewList();
            } else {
                if (diaryList.length === 0) {
                    setEmptyList(true);
                }
            }
        }
    }, [userType]);  // userType이 변경될 때마다 실행

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

    // 피드백을 Firestore에 저장하는 함수
    async function handleFeedbackSubmit(idx, patientEmail, sessionNumber) {
        const feedbackText = feedback[idx] || ""; // 피드백 입력 값 가져오기
        if (feedbackText) {
            // Firestore에 피드백 저장
            const diaryDocRef = doc(db, 'session', patientEmail, 'diary', sessionNumber);
            await updateDoc(diaryDocRef, {
                feedback: feedbackText
            });
            console.log("피드백 저장 완료:", feedbackText);

            // 피드백 저장 후 페이지 새로고침
            window.location.reload();
        }
    }

    // 피드백 입력 값을 상태로 저장
    const handleFeedbackChange = (idx, value) => {
        setFeedback((prevState) => ({
            ...prevState,
            [idx]: value
        }));
    };

    // 의사 계정이면 환자들의 일기를, 환자 계정이면 자신의 일기만 불러오는 함수
    async function receiveDiaryData() {
        let tempArr = [];
        let unfinishedFeedbackCount = 0; // 피드백 미완료 개수

        if (userType === "doctor") {
            // 의사일 경우 환자들의 일기를 불러옴
            const userDocRef = doc(db, "doctor", props.userMail);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const patients = userDoc.data().patient; // 환자 이메일 목록

                console.log("환자 이메일 목록: ", patients);  // 환자 이메일 목록 출력

                for (const patientEmail of patients) {
                    console.log("현재 환자: ", patientEmail);  // 각 환자 이메일 출력

                    const diaryCompleteCollRef = collection(db, 'session', patientEmail, 'diary');
                    const q = query(diaryCompleteCollRef, where('isFinished', '==', true));

                    try {
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            const data = doc.data();

                            // 데이터가 유효한지 확인
                            if (data.sessionEnd && data.diary) {
                                console.log("가져온 일기 데이터: ", data);  // 유효한 데이터 출력

                                // 피드백이 없는 일기를 상단으로
                                if (!data.feedback) {
                                    unfinishedFeedbackCount++;
                                }

                                // 환자 이메일과 함께 추가
                                tempArr.push({
                                    ...data,
                                    patientEmail: patientEmail,
                                    sessionNumber: doc.id // 세션 번호 저장
                                });
                            } else {
                                console.warn(`유효하지 않은 데이터: ${JSON.stringify(data)} (문서 ID: ${doc.id})`);
                            }
                        });
                    } catch (error) {
                        console.error(`Error fetching diary for patient ${patientEmail}:`, error);
                    }
                }

                // 피드백이 없는 일기를 위로, 완료된 일기를 아래로 정렬
                tempArr.sort((a, b) => (a.feedback ? 1 : -1));
                setUnfinishedFeedbackCount(unfinishedFeedbackCount); // 피드백 미완료 개수 업데이트
            } else {
                console.warn("의사 계정에 환자 정보가 없습니다.");
            }
        } else {
            // 환자일 경우 자신의 일기만 불러옴
            console.log("현재 환자 계정으로 일기 가져오는 중: ", props.userMail);
            const diaryCompleteCollRef = collection(db, 'session', props.userMail, 'diary');
            const q = query(diaryCompleteCollRef, where('isFinished', '==', true));

            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    // 데이터가 유효한지 확인
                    if (data.sessionEnd && data.diary) {
                        console.log("가져온 일기 데이터: ", data);  // 유효한 데이터 출력
                        tempArr.push(data);
                    } else {
                        console.warn(`유효하지 않은 데이터: ${JSON.stringify(data)} (문서 ID: ${doc.id})`);
                    }
                });
            } catch (error) {
                console.error("Error fetching diary:", error);
            }
        }

        console.log("최종적으로 가져온 모든 일기 데이터: ", tempArr);  // 최종 데이터 출력

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
                                <div>환자 일기 피드백</div>
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
                                <div>환자 일기 피드백</div>
                                <div>피드백 미완료: {unfinishedFeedbackCount}</div>
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
                                                <Card.Title>{diary.sessionEnd ? Unix_timestamp(diary["sessionEnd"]) : "작성일 없음"}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <div className="nav_title_blue">
                                                        {diary.sessionEnd ? Unix_timestamp2(diary["sessionEnd"]) : "작성 시간 없음"}
                                                    </div>
                                                    {userType === "doctor" && (
                                                        <div className="nav_title_blue">환자 이메일: {diary.patientEmail}</div>
                                                    )}
                                                </Card.Subtitle>
                                                <Card.Text>{diary["diary"]}</Card.Text>
                                                <span className="likebutton" onClick={() => addLike(idx)}>️❤️</span> <b>{diary["like"]}</b>
                                                <span className="likebutton" onClick={() => addMuscle(idx)}>&nbsp;&nbsp;&nbsp;💪️ </span><b>{diary["muscle"]}</b>

                                                {/* 피드백 입력 및 보여주는 칸 */}
                                                {userType === "doctor" && (
                                                    <>
                                                        <Form.Group controlId={`feedbackForm-${idx}`}>
                                                            <Form.Label>피드백 입력:</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                value={feedback[idx] || ""}
                                                                onChange={(e) => handleFeedbackChange(idx, e.target.value)}
                                                            />
                                                            <Button
                                                                variant="primary"
                                                                onClick={() => handleFeedbackSubmit(idx, diary.patientEmail, diary.sessionNumber)}
                                                            >
                                                                피드백 저장
                                                            </Button>
                                                        </Form.Group>
                                                        <div>
                                                            <strong>저장된 피드백:</strong> {diary.feedback || "피드백이 없습니다."}
                                                        </div>
                                                    </>
                                                )}
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