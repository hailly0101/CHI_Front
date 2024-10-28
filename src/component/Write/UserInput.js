import { Flex, Textarea, Button, Image, Text, Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import { ColorButtomGray, ColorButtomPink } from "../../utils/_Palette";


function Userinput({prompt,setInputUser, inputUser,addConversationFromUser, setLoading, turnCount, setDiary, textInput, setTextInput, toggleListening, isListening, setShow,  show}) {
    const temp_comment_input = useRef("");
    return (
        <Box minH={'calc(100vh - 130px)'} mx='12px'>
        <Flex flexDir={'column'} > 
        <Flex alignItems="center">
        <Image src='/image/joural.png' w='40px' h='40px' mr='10px' />
        <Text mt='20px' display="flex" alignItems="center" textAlign="center">Poket-mind와 정리하는 10/19</Text>
        </Flex>
        <Text>오늘 하루는 어땠나요? 오늘은 어떤 고민이 있었나요? 함께 이야기 해봐요🙂</Text>
            <Flex>
                <Image src='/image/doctor.png' w='43px' h='40px' justifyContent={'center'} mr='12px' mb='12px'/>
                <Text>{prompt}</Text>
            </Flex>
            <Flex mb={'10px'}>
                <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    // resize={'none'}
                    height={'222px'}
                    placeholder="편안하고 자유롭게 최근에 있었던 일을 작성해주세요 :)"
                    textStyle={'md'}
                    maxLength={1000}
                    variant="unstyled"
                    
                    _placeholder={{ color: '#b8bcc8', fontWeight: '400' }}
                />
                </Flex>
                <Text> 📖 3턴이 넘어가면 다이어리가 자동으로 생성됩니다. </Text>
                <Flex width={'100%'}    justifyContent="space-between">
                    <Button
                         w="48%"
                         justifyContent="center"
                         alignItems="center"
                            backgroundColor={ColorButtomGray}
                            textColor={'white'}
                            onClick={toggleListening}>
                            {isListening ? '🛑 응답 종료하기' : '🎙️ 목소리로 응답하기'}
                    </Button>
                    <Button
                        backgroundColor={ColorButtomPink}
                        textColor={'white'}
                        w="48%"
                         justifyContent="center"
                         alignItems="center"
                        onClick={() => {
                            (function () {
                                if (textInput.length < 10) {
                                    alert("입력한 내용이 너무 짧아요. 조금만 더 입력해볼까요?")
                                } else if (isListening === true) {
                                    toggleListening()
                                    addConversationFromUser(textInput, temp_comment_input.current)
                                } else {
                                    addConversationFromUser(textInput, temp_comment_input.current)
                                }
                            })()
                        }}>💬 응답 전송하기
                    </Button>
                </Flex>

      
            
        </Flex>
        </Box>
    )
}


export default Userinput