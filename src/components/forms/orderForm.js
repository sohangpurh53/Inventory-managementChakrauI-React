import React, {useEffect, useState} from 'react'
import Loading from '../isLoading'
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,

Select,
  Button,
  Heading,
  Flex,
  useToast,


} from '@chakra-ui/react'

const OrderForm = () => {
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [customerDetail, setCustomerDetail] =useState([])
    const [productDetail, setProductDetail] = useState([])
    const [orderFormData, setOrderFormData] = useState({
        customer:'',
        order_status:'pending',
        product:'',
        price:'',
        quantity:'',
    })
    const  Navigate = useNavigate()
    const toast = useToast()

    useEffect(()=>{
     
     
      if(accessToken){
        setAuthenticated(true);
        const fetchdata = async ()=>{
          try {
              const [productData, customerData] = await Promise.all
              ([axiosInstance.get('purchases/', {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}),
              axiosInstance.get('dashboard/customer/list/', {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
          ])
              if(productData.data && customerData.data){
                 setProductDetail(productData.data)
              setCustomerDetail(customerData.data)
              setIsLoading(false)
              }
             
              
          } catch (error) {
              console.log(`error while fetching data: ${error}`)
              setIsLoading(false)
          }
      }
      fetchdata()
      }else{
        setAuthenticated(false);
        Navigate('/signin')
      }

        
      

        
    }, [accessToken, Navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderFormData({
          ...orderFormData,
          [name]: value,
        });
      };



    const createOrder = async (e)=>{
        e.preventDefault();
        const data = {
          order:{customer:orderFormData.customer,
            order_status:orderFormData.order_status,},
            product:orderFormData.product,
            quantity:orderFormData.quantity,
            price:orderFormData.price,
        }
  try {
    const response = await axiosInstance.post('order-item/create/', data)
    if (response.data) {
          toast({
            title: 'Order Entry Created Successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position:'top-right'
          })
        }
  } catch (error) {
    toast({
          title: `Please check all require fields`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:'top-rght'
        });
  }


    }
    
  return (
   
    <>
 {isLoading? (<Loading/>):( authenticated &&(
      <Flex mx={'auto'}  padding={5} wrap={'wrap'} boxShadow={'md'} maxW={{base:'md', md:'md', lg:'lg'}}>
      <Heading mx={'auto'}  size={'lg'} color={'gray.300'}> Order </Heading>
          <FormControl isRequired>
                <FormLabel htmlFor="product">Product:</FormLabel>
        <Select
        name="product"
        value={orderFormData.product}
        onChange={handleChange}
        required
      >
      <option value="" disabled>Select a Product</option>
      {productDetail.map(products => (
        <option key={products.id} value={products.product.id}>
          {products.product.name}
        </option>
      ))}
    </Select>
          </FormControl>

    <FormControl isRequired>
    <FormLabel htmlFor="order status">Order Status:</FormLabel>
    <Select
      name="order_status"
      value={orderFormData.order_status}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Select a Order Status</option>
        <option value='pending'>Pending</option>
        <option value='successful'>Successful</option>
      
    </Select>
    </FormControl>

    <FormControl isRequired>
   <FormLabel htmlFor="customer">Customer:</FormLabel>
   <Select
     name="customer"
     value={orderFormData.customer}
     onChange={handleChange}
     required
   >
     <option value="" disabled>Select a Customer</option>
     {customerDetail.map(customer => (
       <option key={customer.id} value={customer.id}>
         {customer.full_name}
       </option>
     ))}
   </Select>
  </FormControl>

  <FormControl isRequired>
         <FormLabel htmlFor="quantity">Quantity:</FormLabel>
         <Input
           type="number"
          
           name="quantity"
           value={orderFormData.quantity}
           onChange={handleChange}
           required
         />
       </FormControl>

  <FormControl isRequired>
         <FormLabel htmlFor="price">Price:</FormLabel>
         <Input
           type="number"
          
           name="price"
           value={orderFormData.price}
           onChange={handleChange}
           required
         />
  </FormControl>
  
  
       <Button color={'white'} _hover={{bg:'green.600'}} bg={'green.400'} m={2} onClick={createOrder}> Generate Order</Button>
      
  
  
          </Flex>
    )
  
 )}

       
    </>
  )
}

export default OrderForm