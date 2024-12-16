import { auth, provider } from "../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Box, Input, Button } from "@chakra-ui/react";

import { React, useState } from "react";
import { ColorSigniture } from "../utils/_Palette";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const signInWithEmailPassword = async () => {
    try {
      //   const result = await signInWithEmailAndPassword(auth, email, password);
      //   cookies.set("auth-token", result.user.refreshToken);
      //   props.setIsAuth(true);
      //   props.setUserName(auth.currentUser.displayName);
      //회원가입 성공 시 home 페이지로 빼주고 Localstorage에 저장
    } catch (err) {
      console.error(err);
      if (err.message.includes("wrong-password")) {
        alert(
          "비밀번호가 틀렸습니다. 비밀번호가 기억나지 않으신다면, taewan@kaist.ac.kr 또는 010-9085-2356으로 연락부탁드립니다."
        );
      } else if (err.message.includes("user-not-found")) {
        alert("계정정보가 없습니다.");
      } else if (err.message.includes("invalid-email")) {
        alert("올바른 이메일 형식이 아닙니다.");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box minH={"calc(100vh - 130px)"} alignContent="center" mx="12px">
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt="-100px"
      >
        <Text fontSize={"20px"} fontWeight={400} mb="0px">
          나만의 일기로 상담사를 만나요 🙂
        </Text>
        <Text fontSize={"32px"} fontWeight={700}>
          로그인 하기
        </Text>
        <Input
          placeholder="✉️ Please enter your email address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          mb="12px"
        />
        <Input
          placeholder="🔑 Please enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          mb="30px"
        />
        <Button
          backgroundColor={ColorSigniture}
          color={"white"}
          width={"100%"}
          borderRadius={"20px"}
          onClick={signInWithEmailPassword}
        >
          로그인 하기
        </Button>
        <Button
          width={"100%"}
          onClick={goToSignUp}
          mt="10px"
          borderRadius={"20px"}
        >
          회원가입
        </Button>
      </Flex>
      <Text mt="12px">로그인에 문제가 있나요?</Text>
    </Box>
  );
};
export default Auth;
