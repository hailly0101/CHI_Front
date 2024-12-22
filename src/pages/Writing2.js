import { Flex, Text, Image, Textarea, Button, Box } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { ColorButtomGray, ColorButtomPink } from "../utils/_Palette";
import LikertScaleSurvey from "./LikertScaleSurvey";
import { getUserId } from "../localstorage/user";
import { saveJournal } from "../api/user";
import WriteIntroduceView from "../component/Write/WriteIntroduceVies";
import MessageBox from "../component/Write/MessageBox";
import DiaryView from "../component/Write/DiaryView";
import { useNavigate } from "react-router-dom";

const Write2 = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // 설문 제출 핸들러

  const [responses, setResponses] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [textInput, setTextInput] = useState(""); // User input
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    save();
  };

  const save = async () => {
    // const userId = getUserId();
    const body = {
      userId: getUserId(),
      content: "오늘은 나에게 있어 매우 피곤한 하루다",
      question1: responses.question1,
      question2: responses.question2,
      question3: responses.question3,
      question4: responses.question4,
      question5: responses.question5,
    };
    try {
      const data = await saveJournal(body);
      alert("오늘의 일기 작성 완료");
      navigate("/list");
    } catch (err) {
      console.log(err);
    }
  };
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요! 오늘 하루는 어땠나요?",
    },
  ]); // Initialize with assistant message
  const [currentMessage, setCurrentMessage] = useState(
    "안녕하세요! 오늘 하루는 어땠나요?"
  ); // Default message
  const conversationId = useRef(null); // Ref to store conversation ID

  useEffect(() => {
    sendConversationToBackend();
  }, []);

  const CheckToday = () => {
    setStep(2);
  };
  // Function to send the conversation data to the backend
  const sendConversationToBackend = async () => {
    if (!textInput) return; // Validate user input

    try {
      const response = await fetch(
        `https://expressive-journal-ffd3bd7ddefd.herokuapp.com/standalone/${getUserId()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: [...messages, { role: "user", content: textInput }],
            user: getUserId(),
            num: "1",
            turn: messages.length + 1,
            module: "Wrapping up",
            model: "gpt-4",
          }),
        }
      );
      const data = await response.json();

      if (data && data.options && data.options.length > 0) {
        // Update messages and current message
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: textInput },
          { role: "assistant", content: data.options[0] },
        ]);
        setCurrentMessage(data.options[0]); // Update the assistant's message
        setTextInput(""); // Clear input field

        if (data && data.summary) {
          console.log(summary);
          setSummary(data.summary);
        }
      } else {
        console.error("잘못된 응답: options 필드 없음");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      {step === 1 ? (
        <Flex flexDir={"column"} mx="16px" flex={1} overflowX="scroll">
          <WriteIntroduceView />
          {/* Conversation History */}
          <MessageBox messages={messages} />
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

          <Text fontWeight={700} fontSize={"12px"} mt={4}>
            📖 After 3 turns, the diary will be automatically created.
          </Text>
          <Flex width={"100%"}>
            <Button
              backgroundColor={ColorButtomPink}
              textColor={"white"}
              w="100%"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                if (textInput.length < 10) {
                  alert(
                    "Your entry is a bit short. How about adding a bit more?"
                  );
                } else {
                  sendConversationToBackend();
                }
              }}
            >
              💬 대답하기
              {/* 💬 Send Response */}
            </Button>
          </Flex>
          {summary !== "" && (
            <>
              <DiaryView diary={summary} saveDiary={CheckToday} />
              {/* <Text>{summary}</Text>{" "} */}
              {/* <Button onClick={() => setStep(2)}>일기 마무리하기</Button> */}
            </>
          )}
        </Flex>
      ) : (
        <LikertScaleSurvey
          responses={responses}
          setResponses={setResponses}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Write2;
