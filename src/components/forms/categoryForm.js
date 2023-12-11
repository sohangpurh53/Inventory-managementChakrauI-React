import React, { useState, useEffect } from 'react';
// import '../css/style.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';
import {
  FormControl,
  FormLabel,
  Input,
useToast,
  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';


const CategoryForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [categoryform, setCategoryForm] = useState({
    name: '',
  });
  const  Navigate = useNavigate()
  const toast = useToast()


  const categoryHandleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({
      ...categoryform,
      [name]: value,
    });
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if(accessToken){
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }

    return () => clearTimeout(loadingTimeout);
  }, [accessToken, Navigate]);


  const createCategory = async (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append('name', categoryform.name);
   try {
    const response = await axiosInstance.post('category/create/', categoryData, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
  if(response.data) {
    toast({
      title: 'Category entry created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position:'top-right'
    })
  } 
   } catch (error) {
      toast({
      title: 'Please check all required field',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position:'top-right'
    })
     
    // console.error('Error creating Category:', error)
   }
    
    
    
  }
  return (
    <>
      {isLoading? (<Loading/>):( authenticated && (
      <Flex wrap={'wrap'} mx={'auto'} boxShadow={'md'} maxW={{base:'md', md:'md', lg:'lg'}}> 
          <Heading mx={'auto'}  size={'lg'} color={'blue.200'}> Category </Heading>
          <FormControl ml={5} isRequired>
            <FormLabel>Name:</FormLabel>
            <Input   
                  
              type="text"
              w={'90%'}
              name="name"
              value={categoryform.name}
              onChange={categoryHandleChange}
              required
            />
          </FormControl>
          <Button  color={'white'} bg={'green.400'} _hover={{bg:'green.600'}} m={5} onClick={createCategory} >Create Category</Button>
        
          
    
      </Flex>) ) }

     
    </>
  )
}

export default CategoryForm