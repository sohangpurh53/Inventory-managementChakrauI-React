import React, { useState, useEffect } from 'react';
import './css/style.css'
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
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
      const fetchData = async () => {
        try {
          const fetchedProducts = await axiosInstance(`dashboard/products/list/?page=${currentPage}`,{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data);
          setProducts(fetchedProducts.results || []);
          setHasNextPage(fetchedProducts.next !== null);
          setHasPrevPage(fetchedProducts.previous !== null);
        } catch (error) {
          console.log(error);
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
      <Box> <Button bg={'red.400'} color={'white'} className="bi bi-trash" to={`/product/${product.id}/delete`} as={Link}> Delete</Button> </Box>
    </Stack>
  ))} 
            <Flex align="center" justify="center" mt={4} w="100%">
              {hasPrevPage && <button onClick={handlePrevPage}>Previous</button>}
              <Box> Page&nbsp;{currentPage}</Box>
              {hasNextPage && <button onClick={handleNextPage}>Next</button>}
            </Flex>
</Box>
            
           
            
           
         
        )
      )}

    </>
  );
};

export default Product;
