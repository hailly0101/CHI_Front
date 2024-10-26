import { Box, Flex, Text, Image, Stack } from "@chakra-ui/react";
import React from 'react';
import {useNavigate} from "react-router-dom";
const TopNav = () => {
  const navigate = useNavigate();

  return (
    <Flex bg="#F7F2EB" height="80px" align="center" alignItems="center" width={'100%'} onClick={()=>navigate('/')}>
    <Flex alignItems="center"  px={4}>
      {/* 로고 이미지 */}
      <Image
        src="/image/logo.png" // 여기에 실제 이미지 경로를 입력하세요.
        alt="Pocket Mind-Bot Logo"
        w="45px"
        h="45px"
        mr={4} 
      />
      
      {/* 텍스트 스택 */}
      <Flex align="center" alignItems="center">

        <Text fontSize="xl" fontWeight="bold" color="black" mr='5px'>
          Pocket
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="pink.400">
          Mind-bot
        </Text>
      </Flex>
    </Flex>
  </Flex>
  
  );
};

export default TopNav;
