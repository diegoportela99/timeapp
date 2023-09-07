import { Flex } from "@chakra-ui/react";
import { forwardRef } from "react";

const About = forwardRef((_props, ref:any) => {
  return (
      <Flex color={'white'} justifyContent={'center'} bg={'pink.500'} ref={ref} h={960} id="about">
          About text
      </Flex>
  );
});

export default About;