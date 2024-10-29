import { Flex, Textarea, Button, Image, Text, Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import { ColorButtomGray, ColorButtomPink } from "../../utils/_Palette";


function Userinput({prompt,setInputUser, inputUser,addConversationFromUser, setLoading, turnCount, setDiary, textInput, setTextInput, toggleListening, isListening, setShow,  show}) {
    const temp_comment_input = useRef("");
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return (
        <Box maxW={'450px'}>
        <Flex flexDir={'column'} > 
        <Flex alignItems="center">
        <Image src='/image/joural.png' w='40px' h='40px' mr='10px' />
        <Text fontWeight={700} fontSize={'18px'} mt='20px' display="flex">Poket-mind with Organize<br/> {formattedDate}</Text>
        </Flex>
        <Text fontWeight={400} fontSize={'14px'}>How was your day? What challenges did you face today? <br/>Let’s talk about it together 🙂</Text>
            <Flex mt={'10px'} align={'center'}>
                <Image src='/image/doctor.png' w='43px' h='40px' justifyContent={'center'} mr='12px' mb='12px'/>
                <Text  fontWeight={700} fontSize={'14px'}>{prompt}</Text>
            </Flex>
            <Flex mb={'10px'}>
                <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    // resize={'none'}
                    height={'222px'}
                    placeholder="Feel free to write about anything recent in a comfortable and open way. :)"
                    textStyle={'md'}
                    maxLength={1000}
                    variant="unstyled"
                    
                    _placeholder={{ color: '#b8bcc8', fontWeight: '400', fontSize:'12px'}}
                />
                </Flex>
                <Text  fontWeight={700} fontSize={'12px'}> 📖 After 3 turns, the diary will be automatically created. </Text>
                <Flex width={'100%'}    justifyContent="space-between">
                    <Button
                         w="48%"
                         justifyContent="center"
                         alignItems="center"
                            backgroundColor={ColorButtomGray}
                            textColor={'white'}
                            onClick={toggleListening}>
                            {isListening ? '🛑 End Response' : '🎙️ with Voice'}
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
                                    alert("Your entry is a bit short. How about adding a bit more?")
                                } else if (isListening === true) {
                                    toggleListening()
                                    addConversationFromUser(textInput, temp_comment_input.current)
                                } else {
                                    addConversationFromUser(textInput, temp_comment_input.current)
                                }
                            })()
                        }}>💬 Send Response
                    </Button>
                </Flex>

      
            
        </Flex>
        </Box>
    )
}


export default Userinput