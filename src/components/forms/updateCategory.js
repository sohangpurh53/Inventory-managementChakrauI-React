// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const CategoryUpdateForm = () => {
  const {accessToken} = useAuth()
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: '',
  });
  const toast = useToast()
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategory = await axiosInstance.get(`dashboard/category/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
      
        
        setCategory(fetchedCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };


  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateCategory = async(e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', category.name);
 try {
  const response = await axiosInstance.put(`dashboard/category/${id}/update/`, formDataToSend, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
  if(response.data){
    toast({
      title: 'Category Updated Successfully',
      status: 'success',
      duration: 5000,
      position:'top-right',
      isClosable: true,
    })
    setTimeout(() => {
      Navigate('/')
    }, 2000);
  }
 } catch (error) {
  if(error){
    toast({
    title: 'Please check all require field',
    status: 'info',
    duration: 5000,
    position:'top-right',
    isClosable: true,
  })
  }
  
 }

   
      
    
  };

  return (
    <>
      <Flex maxW={{base:'md', md:'md', lg:'lg'}} mx={'auto'} wrap={'wrap'}>
        <Heading size={{base:'sm', lg:'lg'}}>Update Category</Heading>


       

          <FormControl isRequired>
            <FormLabel >Name:</FormLabel>
            <Input
              type="text"

              name="name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </FormControl>

        
          <Button bg={'blue.400'} _hover={{bg:'blue.600'}} color={'white'} onClick={updateCategory}>Update Category</Button>

       
        </Flex>
    </>
  );
};

export default CategoryUpdateForm;
