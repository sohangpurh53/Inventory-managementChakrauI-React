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

const SupplierRegister = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name:'',
    email:'',
    address: '',
    mobile_no: ''
  });
  const  Navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
  
    if(accessToken){
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }
    setTimeout(()=> {setIsLoading(false)},1000)

   
  }, [accessToken, Navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('supplier/create/', formData)
       if(response){
         toast({
        title: 'Seller entry created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'top-right'
      })
      setIsLoading(false)
     setFormData({
        full_name:'',
        email:'',
        address: '',
        mobile_no: ''
      })
       }
      
      
    } catch (error) {
      toast({
        title: 'Check all require field.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'top-right'
      })
      setIsLoading(false)
    }
  };

  return (
    authenticated &&(
    <>
      {isLoading? (<Loading/>):(
        <Flex wrap={'wrap'} mx={'auto'} padding={5} boxShadow={'md'} maxW={{base:'md', md:'md', lg:'lg'}}>
          <Heading mx={'auto'}  size={'lg'} color={'blue.200'}>Supplier</Heading>
        <FormControl>
         <FormLabel>Full Name</FormLabel>
         <Input
           type="text"
           name="full_name"
           value={formData.first_name}
           onChange={handleChange}
           required
         />
       </FormControl>
         
         <FormControl>
         <FormLabel>Email</FormLabel>
         <Input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           required
         />
       </FormControl>
      
       
       <FormControl>
         <FormLabel>Address</FormLabel>
         <Input
           type="text"
           name="address"
           value={formData.address}
           onChange={handleChange}
           required
         />
       </FormControl>
       <FormControl>
         <FormLabel>Mobile Number</FormLabel>
         <Input
           type="number"
           name="mobile_no"
           value={formData.mobile_no}
           onChange={handleChange}
           required
         />
       </FormControl>
       <Button mt={2} bg={'blue.500'} color={'white'} _hover={{bg:'blue.700'}} onClick={handleSubmit} type="submit">Register</Button>
     </Flex>
      )}
    
    </>
    )
    
  );
};

export default SupplierRegister;
