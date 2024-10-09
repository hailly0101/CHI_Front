import {useEffect, useState, useRef} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Card from 'react-bootstrap/Card';
import {
    collection,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    getDocs,
    setDoc,
    updateDoc,
    increment
} from "firebase/firestore";
import {auth, db} from "../firebase-config";


function DiaryList(props) {

    const [diaryList, setDiaryList] = useState([])
    const updateProgress = useRef(true)
    const [emptyList, setEmptyList] = useState(false)
    const [refresh, setRefresh] = useState(1)


    useEffect(() => {
        async function renewList() {
            const diary = await receiveDiaryData()
            setDiaryList(diary)
            updateProgress.current = false
        }

        if (updateProgress.current) {
            renewList()
        } else {
            if (diaryList.length === 0) {
                setEmptyList(true)
            }
            console.log(diaryList)
        }
    })

    function Unix_timestamp(t) {
        var date = new Date(t * 1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var second = "0" + date.getSeconds();
        return year + "년 " + month.substr(-2) + "월 " + day.substr(-2) + "일 ";
    }

    function Unix_timestamp2(t) {
        var date = new Date(t * 1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var second = "0" + date.getSeconds();
        return hour.substr(-2) + "시" + minute.substr(-2) + "분 작성됨";
    }

    async function addLike(idx) {
        const findSession = diaryList[idx]["sessionNumber"];
        // 'session/{userMail}/diary' 경로의 컬렉션 참조
        const diaryCollectionRef = collection(db, 'session', props.userMail, 'diary');
        // sessionNumber가 findSession과 같은 문서를 찾는 쿼리 작성
        const q = query(diaryCollectionRef, where('sessionNumber', '==', findSession));
        // 쿼리 실행하여 문서 가져오기
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // 첫 번째 문서를 가져와서 처리 (필요에 따라 여러 문서를 처리할 수 있음)
            const docRef = querySnapshot.docs[0].ref;
            // 문서의 'like' 필드를 1씩 증가시키는 업데이트 실행
            await updateDoc(docRef, {
                like: increment(1)
            });
            // 상태를 업데이트하여 화면을 새로고침
            updateProgress.current = true;
            setRefresh(refresh + 1);
        } else {
        console.log('No document found with the given sessionNumber');
        }
    }

    async function addMuscle(idx) {
        const findSession = diaryList[idx]["sessionNumber"];
        // 'session/{userMail}/diary' 경로의 컬렉션 참조
        const diaryCollectionRef = collection(db, 'session', props.userMail, 'diary');
        // sessionNumber가 findSession과 같은 문서를 찾는 쿼리 작성
        const q = query(diaryCollectionRef, where('sessionNumber', '==', findSession));
        // 쿼리 실행하여 문서 가져오기
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // 첫 번째 문서를 가져와서 처리 (필요에 따라 여러 문서를 처리할 수 있음)
            const docRef = querySnapshot.docs[0].ref;
            // 문서의 'muscle' 필드를 1씩 증가시키는 업데이트 실행
            await updateDoc(docRef, {
                muscle: increment(1)
            });
            // 상태를 업데이트하여 화면을 새로고침
            updateProgress.current = true;
            setRefresh(refresh + 1);
        } else {
        console.log('No document found with the given sessionNumber');
        }
    }
    /*async function receiveDiaryData() {
        let tempArr = []
        const q = query(collection(db, "session", props.userName, "diary_complete"), where("isFinished", "==", "true"), orderBy("sessionEnd", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            tempArr.push(doc.data())
        });

        return tempArr
    }*/

async function receiveDiaryData() {
    let tempArr = [];
    const diaryCompleteCollRef = collection(db, 'session', props.userMail, 'diary');
    const q = query(diaryCompleteCollRef, where('isFinished', '==', true));

    try {
        const querySnapshot = await getDocs(q);

        // 쿼리된 문서의 수를 콘솔에 출력
        console.log("Number of documents fetched:", querySnapshot.size);

        // 각 문서의 데이터를 콘솔에 출력
        querySnapshot.forEach((doc) => {
            console.log("Document ID:", doc.id);  // 문서 ID 출력
            console.log("Document Data:", doc.data());  // 문서 데이터 출력

            tempArr.push(doc.data());
        });

        // 최종적으로 저장된 데이터를 확인
        console.log("Final data array:", tempArr);
    } catch (error) {
        // 쿼리 중 발생한 에러를 출력
        console.error("Error fetching documents:", error);
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
        )
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
                                {diaryList.map((_, idx) => (
                                    <Col>
                                        <Card style={{
                                            width: '100%',
                                        }}>
                                            <Card.Body>
                                                <Card.Title>{Unix_timestamp(diaryList[idx]["sessionEnd"])}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    <div
                                                        className="nav_title_blue">{Unix_timestamp2(diaryList[idx]["sessionEnd"])}</div>
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    {diaryList[idx]["diary"]}
                                                </Card.Text>
                                                <span className="likebutton"
                                                      onClick={() => {
                                                          addLike(idx)
                                                      }}
                                                >️❤️</span> <b>{diaryList[idx]["like"]}</b>

                                                <span className="likebutton"
                                                      onClick={() => {
                                                          addMuscle(idx)
                                                      }}
                                                >&nbsp;&nbsp;&nbsp;💪️ </span><b>{diaryList[idx]["muscle"]}</b>
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
        )
    }


}


export default DiaryList