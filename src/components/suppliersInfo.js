import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
// import './css/user.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'
import {

  Stack,
Box,
Button,
  
} from '@chakra-ui/react'

const SuppliersInfo = () => {
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [supplierDetail, setSupplierDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const Navigate = useNavigate()


    useEffect(()=> { 
        // Simulate data loading with a setTimeout
       
      
      if(accessToken){
        setAuthenticated(true);
       
        const fetchSupplier = async ()=>{
           try {
         const responseSupplier = await axiosInstance.get('dashboard/supplier/list/',{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}) 
        if(responseSupplier.data){
           setSupplierDetails(responseSupplier.data);
           setIsLoading(false)
        }
            
              
        } catch (error) {
          console.log(`Error fetching data: ${error}`)
          setIsLoading(false)
        }
          
        }
        fetchSupplier()
      }else{
        setAuthenticated(false);
        Navigate('/signin')
      }

      // Clear the timeout if component is unmounted
      
        

    }, [accessToken, Navigate])

  return (
    isLoading ? (
      <Loading />
    ) : (
      authenticated &&(
        <>
        <Box >
  {supplierDetail.map((user, index) => (
    <Stack
    boxShadow={'md'}
    mt={5}
   mx={'auto'}
      maxW={'1000px'}
      key={user.id}
      direction={{ base: 'column', md: 'row' }}
      spacing="2"
      borderBottom="1px solid #ccc"
      p="2"
    >
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Full Name:</strong> {user.full_name}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Email:</strong> {user.email}
      </Box>    
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Mobile No:</strong> {user.mobile_no}
      </Box>
      <Box flex={{ base: '1', md: '2' }}>
        <strong>Address:</strong> {user.address}
      </Box>
    
      <Box> <Button as={Link} className="edit-button-customer" to={`/supplier/${user.id}/update`} >Update</Button>  </Box>
      
    </Stack>
  ))} 
          
</Box>
       
       </>
     )
      
    )


    
   
  )
}

export default SuppliersInfo