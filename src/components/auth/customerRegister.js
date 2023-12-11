import React, { useState, useEffect } from 'react';
import './supplier.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
useToast,

  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

const CustomerRegister = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name:'',
    email:'',
    address: '',
    mobile_no: ''
  });
  const Navigate = useNavigate()
  const toast = useToast()

  

  useEffect(() => {
   if(accessToken){
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
      Navigate('/signin/')
    }

  }, [accessToken, Navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('customer/create/', formData);
      if (response.data) {
        
        toast({
          title: 'Customer entry created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:'top-right'
        })
        setFormData({
          full_name:'',
          email:'',
          address: '',
          mobile_no: ''
        })
      }

    } catch (error) {
      if(error){
        toast({
        title: 'Please check all required field.',
        status: 'warning',
        duration: 5000,
        position:'top-right',
        isClosable: true,
      })
      }
      
      setIsLoading(false)
    }
  };

  return (
    authenticated &&(
      <>
      {isLoading? (<Loading/>):(
        <Flex wrap={'wrap'} boxShadow={'md'} padding={5} mx={'auto'}  maxW={{base:'md', md:'md', lg:'lg'}}>
          <Heading mx={'auto'}  size={'lg'} color={'blue.200'}>Customer</Heading>
       <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </FormControl>

        <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required className="form-group"
        />
      </FormControl>
      
      
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          type="text"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          required
        />
      </FormControl>
      <Button mt={2} bg={'blue.400'} color={'white'} _hover={{bg:'blue.600'}} onClick={handleSubmit} type="submit">Save</Button>
    </Flex>
      )}
    
    </>
    )
    
  );
};

export default CustomerRegister;
