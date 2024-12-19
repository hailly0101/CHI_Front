import { Flex, Text, Image, Textarea, Button, Box } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { ColorButtomGray, ColorButtomPink } from "../utils/_Palette";

const Write2 = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [textInput, setTextInput] = useState(""); // User input
  const [messages, setMessages] = useState([{ role: "assistant", content: "제가 도와드릴 수 있어요! 어떻게 도와드릴까요?" }]); // Initialize with assistant message
  const [currentMessage, setCurrentMessage] = useState("제가 도와드릴 수 있어요! 어떻게 도와드릴까요?"); // Default message
  const conversationId = useRef(null); // Ref to store conversation ID

  // Function to send the conversation data to the backend
  const sendConversationToBackend = async () => {
    if (!textInput) return; // Validate user input

    try {
      const response = await fetch("http://127.0.0.1:8000/standalone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [...messages, { role: "user", content: textInput }],
          user: "test@example.com", // Use user email
          num: "1",
          turn: messages.length + 1,
          module: "Main session",
          model: "gpt-4",
        }),
      });
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
        
        // Alert the assistant's response
        alert(data.options[0]);  // Show alert with backend response
        
      } else {
        console.error("잘못된 응답: options 필드 없음");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Flex flexDir={"column"} mx="16px" flex={1} overflowX="scroll">
      <Flex alignItems="center">
        <Image src="/image/joural.png" w="40px" h="40px" mr="10px" />
        <Text fontWeight={700} fontSize={"18px"} mt="20px" display="flex">
          Pocket-mind with Organize
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

      {/* Conversation History */}
      <Box mt={4}>
        <Text fontWeight={700} fontSize={"14px"} mb={2}>
          Conversation History:
        </Text>
        <Box
          border="1px solid #ccc"
          borderRadius="md"
          p={2}
          maxHeight="300px"
          overflowY="auto"
        >
          {messages.length === 0 ? (
            <Text>No conversation yet.</Text>
          ) : (
            messages.map((message, index) => (
              <Flex
                key={index}
                mb={2}
                flexDirection={message.role === "user" ? "row-reverse" : "row"}
              >
                <Box
                  p={2}
                  borderRadius="md"
                  bg={message.role === "user" ? "#e1e1e1" : "#f0f0f0"}
                  maxWidth="75%"
                >
                  <Text fontSize="12px">{message.content}</Text>
                </Box>
              </Flex>
            ))
          )}
        </Box>
      </Box>

      <Text fontWeight={700} fontSize={"12px"} mt={4}>
        📖 After 3 turns, the diary will be automatically created.
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
              sendConversationToBackend();
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
