import React, { useState, useEffect } from 'react';
// import './css/style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance';
import {
 Box, Button, 
 Image,

 Stack,
  Flex,
} from '@chakra-ui/react'


const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const Navigate = useNavigate()

 
  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
      const fetchData = async () => {
        try {
          const fetchedProducts = await axiosInstance(`dashboard/products/list/?page=${currentPage}`,{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }})
        if(fetchedProducts.data){
          setIsLoading(false)
        }
          setProducts(fetchedProducts.data.results || []);
          setHasNextPage(fetchedProducts.data.next !== null);
          setHasPrevPage(fetchedProducts.data.previous !== null);

        } catch (error) {
          console.log(error);
          setIsLoading(false)
        }
      };
      fetchData();
    } else {
      setAuthenticated(false);
      Navigate('/signin')
    }
  }, [accessToken, currentPage, Navigate]);

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
      {isLoading ? (<Loading />) : (
        authenticated && (
        
             <Box >
  {products.map((product, index) => (
    <Stack
    mt={5}
    mx={'auto'}
      maxW={'1000px'}
      key={product.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      boxShadow={'md'}
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Product No:</strong> {index+1}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Product:</strong> {product.name}
      </Box>
      <Box w={'30px'} h={'30px'} >
      <Image objectFit={'contain'} src={product.image} alt={product.name} />
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Description:</strong> {product.description.slice(0, 20)}{product.description.length > 100 ? '...' : ''}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Price:</strong> {product.price}
      </Box>
      <Box> <Button className="bi bi-pencil-square" to={`/product/${product.id}/update`} as={Link}> Edit</Button></Box>
      <Box> <Button bg={'red.400'} _hover={{bg:'red.600'}} color={'white'} className="bi bi-trash" to={`/product/${product.id}/delete`} as={Link}> Delete</Button> </Box>
    </Stack>
  ))} 
            <Flex align="center" justify="center" mt={4} w="100%">
              {hasPrevPage && <Button onClick={handlePrevPage}>Previous</Button>}
              <Box padding={2} boxShadow={'md'} >  Page&nbsp;{currentPage}</Box>
              {hasNextPage && <Button onClick={handleNextPage}>Next</Button>}
            </Flex>
</Box>
            
           
            
           
         
        )
      )}

    </>
  );
};

export default Product;
