import { auth, provider } from "../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Cookies from "universal-cookie";
import { Textarea } from "@chakra-ui/react";
import { Flex, Text, Box, Input, Button } from "@chakra-ui/react";

import { React, useState } from "react";
import { ColorSigniture } from "../utils/_Palette";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");

  const signInWithEmailPassword = async () => {
    try {
      //   const result = await signInWithEmailAndPassword(auth, email, password);
      //   cookies.set("auth-token", result.user.refreshToken);
      //   props.setIsAuth(true);
      //   props.setUserName(auth.currentUser.displayName);
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

  const signUpWithEmailPassword = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다. 동일한 비밀번호를 입력해주세요");
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        cookies.set("auth-token", result.user.refreshToken);
        // props.setIsAuth(true);
        // props.setUserName(auth.currentUser.displayName);
        // 회원가입 성공 시 login페이지로 빼주기
      } catch (err) {
        console.error(err);
        if (err.message.includes("email-already-in-use")) {
          alert(
            "이미 가입된 이메일입니다. 비밀번호가 기억나지 않으신다면, taewan@kaist.ac.kr 또는 010-9085-2356으로 연락부탁드립니다."
          );
        } else if (err.message.includes("invalid-email")) {
          alert("올바른 이메일 형식이 아닙니다.");
        } else if (err.message.includes("weak-password")) {
          alert("비밀번호는 6자 이상으로 설정해주세요");
        } else {
          alert("Error: " + err.message);
        }
      }
    }
  };

  return (
    <Box mx="12px" mt="20px">
      <Flex flexDir={"column"}>
        <Text fontSize={"20px"} fontWeight={400} mb="0px">
          나만의 일기로 상담사를 만나요 🙂
        </Text>
        <Text fontSize={"32px"} fontWeight={700}>
          회원가입
        </Text>
        {step === 1 ? (
          <>
            <Text fontSize={"15px"} fontWeight={700} mt="15px">
              이메일
            </Text>
            <Input
              placeholder="✉️ Please enter your email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              mb="12px"
            />
            <Text fontSize={"15px"} fontWeight={700} mt="15px">
              비밀번호
            </Text>
            <Input
              placeholder="🔑 Please enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              mb="30px"
            />
            <Text fontSize={"15px"} fontWeight={700} mt="15px">
              비밀번호 확인
            </Text>
            <Input
              placeholder="🔑 Please enter your password"
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              mb="30px"
            />
            <Button
              backgroundColor={ColorSigniture}
              color={"white"}
              width={"100%"}
              borderRadius={"20px"}
              onClick={() => setStep(2)}
            >
              다음으로
            </Button>
          </>
        ) : (
          <>
            <Text fontSize={"15px"} fontWeight={700} mt="15px">
              본인이 일기쓰기를 하면서 변화하고 싶은 일상의 목표를 말씀해주세요.
            </Text>
            <Textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              // resize={'none'}
              height={"222px"}
              placeholder=" :)"
              textStyle={"md"}
              maxLength={1000}
              variant="unstyled"
              _placeholder={{
                color: "#b8bcc8",
                fontWeight: "400",
                fontSize: "12px",
              }}
            />
            <Text fontSize={"15px"} fontWeight={700} mt="15px">
              ex)불안함을 주리고 싶어요, 우울감을 감소하고 싶어요
            </Text>
            <Button
              width={"100%"}
              onClick={signInWithEmailPassword}
              mt="10px"
              borderRadius={"20px"}
            >
              회원가입
            </Button>
          </>
        )}
      </Flex>
      <Text mt="12px">로그인에 문제가 있나요?</Text>
    </Box>
  );
};
export default Signup;
