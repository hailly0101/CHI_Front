import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import DiaryChart from "./Chart";
import { getUserJournals } from "../api/user";

const DiaryMock = () => {
  // Mock 데이터: 유저가 작성한 날짜
  const [journals, setJournals] = useState([]); // 서버에서 가져온 일기 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [mockDates, setMockDates] = useState([]); // 작성된 날짜
  const [mockRatings, setMockRatings] = useState({}); // 날짜별 척도

  // 서버에서 일기 데이터 가져오기
  const fetchJournals = async () => {
    try {
      const userJournals = await getUserJournals("user");
      setJournals(userJournals);

      // 일기 작성 날짜만 추출
      const dates = userJournals.map((journal) => journal.date);
      setMockDates(dates);
      console.log(dates);

      // 날짜와 척도를 매핑해서 객체 생성
      const ratings = {};
      userJournals.forEach((journal) => {
        ratings[journal.date] = journal.rating;
      });
      setMockRatings(ratings);
    } catch (error) {
      alert("일기를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // 캘린더의 tileClassName을 이용하여 특정 날짜에 스타일 추가
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      if (mockDates.includes(dateString)) {
        return "highlight-circle"; // 작성된 날짜에 동그라미 스타일 추가
      }
    }
    return ""; // 나머지 날짜는 기본 스타일
  };

  // 차트 데이터 준비
  const chartData = {
    labels: Object.keys(mockRatings), // 날짜
    datasets: [
      {
        label: "일기 척도 (0~10)",
        data: Object.values(mockRatings), // 척도 값
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h3>이달의 기록</h3>
      {/* 캘린더 */}
      <Calendar
        tileClassName={tileClassName} // 특정 날짜를 표시하는 스타일 적용
        view="month" // 월 단위 보기
        defaultValue={new Date(2024, 11, 1)} // 2024년 12월로 설정
        minDetail="month" // 연, 월 상세만 보여줌
      />
      <DiaryChart chartData={chartData} />
      <style>
        {`
          .highlight-circle {
            background-color: #6c63ff !important; /* 보라색 배경 */
            color: white !important; /* 흰색 텍스트 */
            border-radius: 50%; /* 동그라미 */
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .react-calendar__tile {
            height: 50px; /* 타일 높이 */
            width: 50px; /* 타일 너비 */
          }

          .react-calendar__tile--now {
            background: none !important; /* 오늘 날짜 강조 제거 */
            border: 2px solid #6c63ff; /* 보라색 테두리 */
            border-radius: 50%; /* 오늘 날짜도 동그라미로 표시 */
          }
        `}
      </style>
    </div>
  );
};

export default DiaryMock;
