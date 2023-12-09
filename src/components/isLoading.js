import React from 'react';
import './css/style.css'
import { Box, Container, Flex, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Loading = () => {
  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;
  return (
    <Container  mx={'auto'} h="100vh" display="flex" alignItems={'center'} justifyContent="center">
      <Flex justifyContent={'center'} alignItems={'center'} w={'100px'} h={'100px'} borderRadius={'50%'} border={'2px'} borderColor={'blue.200'}>
         <Box
      as={motion.div}
      animation={animation}
      // not work: transition={{ ... }}
      padding="2"
      // @ts-ignore - "Does not exist" Type Error against Motion
      bgGradient="linear-gradient(to left, #E4F3E3, #5CA9E9)"
      width="12"
      height="12"
      display="flex"
    />
      </Flex>
   
  </Container>
  );
};

export default Loading;
