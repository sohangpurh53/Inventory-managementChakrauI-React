import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'
import axiosInstance from '../utils/axiosInstance'
import {
  Table,
  Thead,Box, Button, 
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from '@chakra-ui/react'

const CategoryList = () => {
    const { accessToken } = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [categoryDetail, setCategoryDetail] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const Navigate = useNavigate()

    useEffect(()=>{
     

       if(accessToken){
        setAuthenticated(true);
        const loadPurchase = async ()=>{
             try {
              const categoryData = await axiosInstance.get(`dashboard/category/list/?page=${currentPage}`,{headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
            if(categoryData){
              setCategoryDetail(categoryData.data.results || []);
              setHasNextPage(categoryData.data.next !== null);
              setHasPrevPage(categoryData.data.previous !== null);
              setIsLoading(false)
            }
              

            } catch (error) {
                console.log(error)
                setIsLoading(false)
            } 
            
    }
    loadPurchase()
       }
       else{
        setAuthenticated(false);
        Navigate( '/signin')
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
    <Box >

      {isLoading? (<Loading/>):(
(authenticated && (
  <Flex mt={5} direction="column" align="center" maxW="100%">
   <Flex
    flexWrap="wrap"
    justifyContent="center"
    maxW="lg" 
    minH={'md'}
  >
 <Table  variant={'simple'} size='sm'>
<Thead >
<Tr >
  <Th>Category Name</Th>
  <Th>Action</Th>
</Tr>
</Thead>    
<Tbody >
{categoryDetail.map(category => ( 
 <Tr key={category.id}>
  <Td> {category.name}</Td>
  <Td> <Button  bg={'blue.50'}  fontSize={'sm'}  as={Link}  to={`/category/${category.id}/update`} >Update</Button> </Td>
  <Td>  <Button bg={'red.400'}  fontSize={'sm'}  color={'white'} as={Link} to={`/category/${category.id}/delete`}>Delete</Button> </Td> 
</Tr> ))} 
</Tbody>
    </Table>
  </Flex>
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
</Flex>) )
      )}
      
        

    </Box>
  )
}

export default CategoryList