import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import './css/user.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'
import {

  Stack,
Box,
Button,
  
} from '@chakra-ui/react'

const CustomersInfo = () => {
    const {accessToken} = useAuth()
    const [customerDetail, setCustomerrDetails] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {

        // Simulate data loading with a setTimeout
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    

      if(accessToken){
        setAuthenticated(true);
        const fetchCustomer = ()=>{
          axiosInstance.get('dashboard/customer/list/',{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => {
            setCustomerrDetails(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
              
        }
        fetchCustomer()
      }
      else{
        setAuthenticated(false);
        window.location.href = '/signin'
      }
          // Clear the timeout if component is unmounted
          return () => clearTimeout(loadingTimeout);

    }, [accessToken])

  return (  isLoading?(<Loading/>):(
    authenticated &&(
     <Box >
  {customerDetail.map((user, index) => (
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
    
   )
      )
    
    
   
  )
}

export default CustomersInfo