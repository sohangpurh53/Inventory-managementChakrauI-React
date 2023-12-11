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

const StockUpdateForm = () => {
  const {accessToken} = useAuth()
  const { id } = useParams();
  const [stocksDetail, setStocksDetail] = useState({
    quantity:'',
  });
  const  Navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStock = await axiosInstance.get(`dashboard/stock/${id}/update/`,{headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
      
        
        setStocksDetail(fetchedStock);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStocksDetail({
      ...stocksDetail,
      [name]: value,
    });
  };


  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateCategory = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('quantity', stocksDetail.quantity);
 
try {
  const response =  axiosInstance.put(`dashboard/stock/${id}/update/`, formDataToSend,{headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
  
  }})
  if(response.data){
    toast({
      title: 'Stock Updated Successfully',
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
  toast({
    title: 'Please check all required fields',
    status: 'info',
    duration: 5000,
    position:'top-right',
    isClosable: true,
  })
}
   
    
  };

  return (
    <Flex maxW={{base:'md', md:'md', lg:'lg'}} wrap={'wrap'} mx={'auto'}>
     
      
        <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}> Update Stock</Heading>


          <FormControl isRequired>
            <FormLabel htmlFor="quantity">Quantity:</FormLabel>
            <Input
              type="text"
              name="quantity"
              value={stocksDetail.quantity}
              onChange={handleChange}
              required
            />
          </FormControl>

        
          <Button color={'white'} bg={'green.400'} _hover={{bg:'green.600'}} onClick={updateCategory}>Update Stock</Button>

       
       
    </Flex>
  );
};

export default StockUpdateForm;
