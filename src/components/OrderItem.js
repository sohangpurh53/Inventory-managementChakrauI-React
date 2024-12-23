import React, {useState, useEffect} from 'react'
// import './css/style.css'
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance'
import { Link, useNavigate } from 'react-router-dom';
import {

  Badge,
  Stack,
Box,
Button,
  Flex,
} from '@chakra-ui/react'

const OrderItemList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [orderDetails, setOrderDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const Navigate = useNavigate()

    useEffect(()=>{
   

      if(accessToken){
        setAuthenticated(true);
    
            const loadPurchase = async ()=>{
                 try {
                  const orderData = await axiosInstance.get(`dashboard/order/list/?page=${currentPage}`,{headers: {
                    Authorization: `Bearer ${accessToken}`,
                
                }})
                if(orderData.data){
                  setIsLoading(false)
                }
                  setOrderDetails(orderData.data.results || []);
                  setHasNextPage(orderData.data.next !== null);
                  setHasPrevPage(orderData.data.previous !== null);

                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                } 
                
        }
        loadPurchase()
      }else{
          setAuthenticated(false);
          Navigate('/signin/') 
        }

      
            
       
        
    }, [accessToken, currentPage, Navigate])

    const handleNextPage = () => {
      if (hasNextPage) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (hasPrevPage) {
        setCurrentPage(currentPage - 1);
      }
    };
   
  return (
    <div>
      {isLoading? (<Loading/>):(
        (authenticated && <Box   >
  {orderDetails.map((order, index) => (
    <Stack
    mt={5}
   mx={'auto'}
      maxW={'1000px'}
      key={order.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      boxShadow={'md'}
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Product Name:</strong> {order.product.name}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Quantity:</strong> {order.quantity}
      </Box>    
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Price:</strong> {order.price}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Total Price:</strong> {order.quantity*order.price}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Customer:</strong> {order.order.customer.full_name}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Order Status:</strong> <Badge color={'white'} bg={'green.300'}>{order.order.order_status}</Badge> 
      </Box>
      <Box> <Button as={Link} to={`/order/${order.id}/update`} className="bi bi-pencil-square update-icon">Update</Button>  </Box>
      
    </Stack>
  ))} 
           <Flex align="center" justify="center" mt={4} w="100%">
    {hasPrevPage && (
      <Button onClick={handlePrevPage} mr={2}>
        Previous
      </Button>
    )}
    <Box  mx={2}>
      Page&nbsp;{currentPage}
    </Box>
    {hasNextPage && (
      <Button onClick={handleNextPage} ml={2}>
        Next
      </Button>
    )}
  </Flex>
</Box>
       )
        
      )}

 
    </div>
  )
}

export default OrderItemList