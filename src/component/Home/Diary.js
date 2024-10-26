import React from 'react';
import { Box, Text, Flex, Image, Button, useSize } from '@chakra-ui/react';
import { ColorSigniture } from '../../utils/_Palette';
import { WecomeText1, WecomeText2 } from '../../utils/_Text';

function Diary({ userName, diaryList, lastDate, navigateToWriting, navigateToReview, Unix_timestamp }) {

    return (
        <Flex flexDir='column' height={'100%'} backgroundColor={'white'} mx='12px'>
            <Text mt='20px' fontSize={'24px'} fontWeight={'700'}>{WecomeText1}</Text>
            <Text fontSize={'20px'} fontWeight={'400'}>{WecomeText2}</Text>
            <Flex alignItems={'center'}
                  justifyContent={'center'}  my='30px'> <Image src='/image/diary.png' w='198px' h='206px' justifyContent={'center'}  /></Flex>
              <Flex alignItems={'center'}
                  justifyContent={'center'} textAlign={'center'}  my='30px'> 
                <Button backgroundColor={ColorSigniture}  color={'white'} w='100%' h='43px' borderRadius='20px' onClick={navigateToWriting} textAlign={'center'}>오늘 하루 기록하기</Button>
            </Flex>

            <Flex alignItems={'center'}
                  justifyContent={'center'}  mb='30px' textAlign={'center'}> 
                      <Text>        Last Date With Poket-minde <b>{Unix_timestamp(lastDate)}</b> <br/>
                        📖 지금까지 <b>{diaryList.length}</b>개의 일기를 작성하셨네요!</Text>
            </Flex>
        </Flex>
    )
}

export default Diary;
