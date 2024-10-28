import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
function ChatBox({ conversation }) {
    return (
        <Flex mt='20px'  maxWidth={'475px'} mx='12px'>
            <div className="chat-box">
                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.role}`} style={{ fontFamily: 'Arial, sans-serif'}}>
                     
                        {message.role === 'user' ? 
                        
                            <Flex justifyContent={"flex-end"}>   
                   
                                <Text mr='12px'>{message.content}</Text>
                                <Image src='/image/user.png'  w='43px' h='40px' justifyContent={'center'}/>
                            </Flex> : 
                            <Flex>   
                                <Image src='/image/doctor2.png' w='43px' h='40px' justifyContent={'center'} mr='12px'/>
                                <Text>{message.content}</Text>
                            </Flex>}
              
                    </div>
                ))}
            </div>
        </Flex>
    );
}

export default ChatBox;