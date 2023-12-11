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
Select,
  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

const OrderUpdateForm = () => {
  const {accessToken} = useAuth()
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItemDetails, setOrderItemDetails] = useState({
    product:'',
    price:'',
    quantity:'',
  });
  const  Navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrderItem = await axiosInstance.get(`dashboard/orderitem/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
        const orderData = await 
          axiosInstance.get('order-item/').then(response => response.data);

        setOrderDetails(orderData);
        setOrderItemDetails(fetchedOrderItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderItemDetails({
      ...orderItemDetails,
      [name]: value,
    });
  };
  

  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateOrder = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('product', orderItemDetails.product);
    formDataToSend.append('quantity', orderItemDetails.quantity);
    formDataToSend.append('price', orderItemDetails.price);

   try {
     const response = axiosInstance.put(`dashboard/orderitem/${id}/update/`, formDataToSend, {headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
  
  }})
      
        if (response.data) {
          toast({
            title: 'Order Updated Successfully',
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
      title: 'Category Updated Successfully',
      status: 'info',
      duration: 5000,
      position:'top-right',
      isClosable: true,
    })
    }
    
   }


  };

  return (
    <Flex maxW={{base:'md', md:'md', lg:'lg'}} wrap={'wrap'} mx={'auto'}>
      
      
        <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}>Update Order Item</Heading>


       

      
          <FormControl isRequired>
            <FormLabel >Product:</FormLabel>
            <Select
              name="product"
              value={orderDetails.product}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Product</option>
              {orderDetails.map((order, index) => (
                <option key={index} value={order.id}>
                  {order.product.name}
                </option>
              ))}
            </Select>
          </FormControl>



         
          <FormControl isRequired>
            <FormLabel >Quantity:</FormLabel>
            <Input
              type="number"

              name="quantity"
              value={orderItemDetails.quantity}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
       <FormLabel isRequired>Price:</FormLabel>
       <Input
         type="number"
        
         name="price"
         value={orderItemDetails.price}
         onChange={handleChange}
         required
       />
     </FormControl>
         

          <Button onClick={updateOrder}>Update Order</Button>

      
       
    </Flex>
  );
};

export default OrderUpdateForm;
