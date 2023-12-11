import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import './css/style.css'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'
import axiosInstance from '../utils/axiosInstance'
import {
  Box, 
  Button, 
  Image,
  Stack,
  Flex,
} from '@chakra-ui/react'

const PurchaseList = () => {
    const { accessToken } = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [purchaseDetail, setPurchaseDetail] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const Navigate = useNavigate()

    useEffect(()=>{
    

       if(accessToken){
        setAuthenticated(true);
        const loadPurchase = async ()=>{
             try {
              const purchaseData = await axiosInstance.get(`/dashboard/purchase/list/?page=${currentPage}`, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
            if(purchaseData.data){
              setIsLoading(false)
            }
              setPurchaseDetail(purchaseData.data.results || []);
              setHasNextPage(purchaseData.data.next !== null);
              setHasPrevPage(purchaseData.data.previous !== null);

            } catch (error) {
                console.log(error)
                setIsLoading(false)
            } 
            
    }
    loadPurchase()
       }
       else{
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
    <>

      {isLoading? (<Loading/>):(
(authenticated && (
 
  <Box   >
  {purchaseDetail.map((purchase, index) => (
    <Stack
    mt={5}
   mx={'auto'}
      maxW={'1000px'}
      key={purchase.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      boxShadow={'md'}
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Purchase Index:</strong> {index+1}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Puchase:</strong> {purchase.product.name}
      </Box>
      <Box w={'30px'} h={'30px'} >
      <Image objectFit={'contain'} src={purchase.product.image} alt={purchase.product.name} />
      </Box>
      
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Price:</strong> {purchase.product.price}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Quantity:</strong> {purchase.quantity}
      </Box>
      <Box> <Button className="bi bi-pencil-square" to={`/purchase/${purchase.id}/update`} as={Link}> Edit</Button></Box>
      <Box> <Button bg={'red.400'} _hover={{bg:'red.600'}} color={'white'} className="bi bi-trash" to={`/purchase/${purchase.id}/delete`} as={Link}> Delete</Button> </Box>
    </Stack>
  ))} 
           <Flex align="center" justify="center" mt={4} w="100%">
    {hasPrevPage && (
      <Button onClick={handlePrevPage} mr={2}>
        Previous
      </Button>
    )}
    <Box padding={2} boxShadow={'md'}   mx={2}>
      Page&nbsp;{currentPage}
    </Box>
    {hasNextPage && (
      <Button onClick={handleNextPage} ml={2}>
        Next
      </Button>
    )}
  </Flex>
</Box>
  ) )
      )}
      
        

    </>
  )
}

export default PurchaseList