import React, {useEffect, useState} from 'react'
import './css/style.css'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import {

  
  Stack,
Box,
Button,
  Flex,
} from '@chakra-ui/react'

const StockList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [stockDetails, setStockDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const Navigate = useNavigate()

    useEffect(()=>{
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);


      if(accessToken){
        setAuthenticated(true);

        
      const loadStock = async ()=>{
         
         try {
          const stockData = await axiosInstance.get(`dashboard/stock/list/?page=${currentPage}`,{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}
            ).then(response=> response.data);
          setStockDetails(stockData);
          setStockDetails(stockData.results || []);
                setHasNextPage(stockData.next !== null);
                setHasPrevPage(stockData.previous !== null);
         } catch (error) {
              console.log(error)
         }

      }
      loadStock()
      }
      else{
        setAuthenticated(false);
        Navigate('/signin') 
      }
      return () => clearTimeout(loadingTimeout);
        
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
        (authenticated && (
      
      <Box   >
  {stockDetails.map((stock, index) => (
    <Stack
    mt={5}
   mx={'auto'}
      maxW={'1000px'}
      key={stock.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      borderBottom="1px solid #ccc"
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Product Name:</strong> {stock.product.name}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Quantity:</strong> {stock.quantity}
      </Box>    
      <Box> <Button as={Link} to={`/stock/${stock.id}/update`} className="bi bi-pencil-square update-icon">Update</Button>  </Box>
      
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
        ))
      )}
      
      
    
    </div>
  )
}

export default StockList