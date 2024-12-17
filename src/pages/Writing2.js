import { Flex, Text, Image, Textarea, Button } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { ColorButtomGray, ColorButtomPink } from "../utils/_Palette";

const Write2 = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [textInput, setTextInput] = useState(""); // 사용자 입력값
  const [messages, setMessages] = useState([]); // 서버에서 받은 메시지 저장
  const [currentMessage, setCurrentMessage] = useState(""); // 현재 표시되는 메시지
  const temp_comment_input = useRef();

  useEffect(() => {
    // start API 호출 (초기 메시지)
    const fetchStartMessage = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: "test@example.com" }),
        });
        const data = await response.json();
        setCurrentMessage(data.message); // 서버에서 온 메시지 저장
        setMessages([{ role: "assistant", content: data.message }]);
      } catch (error) {
        console.error("Error fetching start message:", error);
      }
    };
    fetchStartMessage();
  }, []);

  const addConversationFromUser = async (userInput, commentRef) => {
    const updatedMessages = [...messages, { role: "user", content: userInput }];

    // 서버에 continue 요청
    try {
      const response = await fetch("http://127.0.0.1:8000/continue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: "test@example.com",
          text: updatedMessages,
        }),
      });
      const data = await response.json();

      // 서버 응답을 현재 대화에 추가
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.message },
      ]);
      setCurrentMessage(data.message);
      setTextInput(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Flex flexDir={"column"} mx="16px" flex={1} overflowX="scroll">
      <Flex alignItems="center">
        <Image src="/image/joural.png" w="40px" h="40px" mr="10px" />
        <Text fontWeight={700} fontSize={"18px"} mt="20px" display="flex">
          Poket-mind with Organize
          <br /> {formattedDate}
        </Text>
      </Flex>
      <Text fontWeight={400} fontSize={"14px"}>
        How was your day? What challenges did you face today? <br />
        Let’s talk about it together 🙂
      </Text>
      <Flex flexDir={"column"}>
        <Flex mt={"10px"} align={"center"}>
          <Image
            src="/image/doctor.png"
            w="43px"
            h="40px"
            justifyContent={"center"}
            mr="12px"
            mb="12px"
          />
          <Text fontWeight={700} fontSize={"14px"}>
            {currentMessage}
          </Text>
        </Flex>
        <Flex mb={"10px"}>
          <Textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            height={"222px"}
            placeholder="Feel free to write about anything recent in a comfortable and open way. :)"
            textStyle={"md"}
            maxLength={1000}
            variant="unstyled"
            _placeholder={{
              color: "#b8bcc8",
              fontWeight: "400",
              fontSize: "12px",
            }}
          />
        </Flex>
      </Flex>
      <Text fontWeight={700} fontSize={"12px"}>
        {" "}
        📖 After 3 turns, the diary will be automatically created.{" "}
      </Text>
      <Flex width={"100%"} justifyContent="space-between">
        <Button
          w="48%"
          justifyContent="center"
          alignItems="center"
          backgroundColor={ColorButtomGray}
          textColor={"white"}
        >
          🎙️ with Voice
        </Button>
        <Button
          backgroundColor={ColorButtomPink}
          textColor={"white"}
          w="48%"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            if (textInput.length < 10) {
              alert("Your entry is a bit short. How about adding a bit more?");
            } else {
              addConversationFromUser(textInput, temp_comment_input.current);
            }
          }}
        >
          💬 Send Response
        </Button>
      </Flex>
    </Flex>
  );
};

export default Write2;
