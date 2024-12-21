import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function WriteIntroduceView() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <>
      <Flex alignItems="center">
        <Image src="/image/joural.png" w="40px" h="40px" mr="10px" />
        <Text fontWeight={700} fontSize={"18px"} mt="20px" display="flex">
          Pocket-mind with Organize
          <br /> {formattedDate}
        </Text>
      </Flex>
      <Text fontWeight={400} fontSize={"14px"}>
        {/* How was your day? What challenges did you face today? <br />
    Let’s talk about it together 🙂 */}
        오늘 하루는 어땠나요? <br />
        함께 이야기 해봐요 🙂
      </Text>
    </>
  );
}
export default WriteIntroduceView;
