import React from 'react';
import { Box, Text, Flex, Image, Button } from '@chakra-ui/react';
import { ColorRed } from '../../utils/_Palette';
function Diary({ userName, diaryList, lastDate, navigateToWriting, navigateToReview, Unix_timestamp }) {
    return (
        <Flex flexDir='column' height={'100%'} backgroundColor={'white'}>
            <Text>오늘도 와주셔서 감사합니다</Text>
            <Text>오늘도 와주셔서 감사합니다</Text>
            <Image src='/image/diary.png' w='198px' h='206px'/>
            <Button backgroundColor={'yellow'}  color={ColorRed}  w='198px' h='206px'>오늘 하루 기록하기</Button>
            <Text>        📅 마지막 일기는 <b>{Unix_timestamp(lastDate)}</b> 일기에요.
                         <br/>
                        📖 지금까지 <b>{diaryList.length}</b>개의 일기를 작성하셨네요!</Text>
        </Flex>
    )
}

export default Diary;
