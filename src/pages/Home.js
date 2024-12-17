import { React, useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Authentication 추가
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import NoDiary from "../component/Home/NoDiary.js";
import Diary from "../component/Home/Diary.js";

function Home() {
  const navigate = useNavigate();
  const lastDate = 1;

  return <div>{lastDate === 0 ? <NoDiary /> : <Diary />}</div>;
}

export default Home;
