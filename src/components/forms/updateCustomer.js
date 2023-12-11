import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import '../auth/supplier.css'
import { useAuth } from '../../context/AuthContext';
import {
  FormControl,
  FormLabel,
  Input,
useToast,

  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

const UpdateCustomer = () => {
  const {accessToken} = useAuth()
    const {id} = useParams()
  const [customerDetails, setCustomerDetails] = useState({
    full_name:'',
    email:'',
    address: '',
    mobile_no: ''
  })
  const  Navigate = useNavigate() 
 const toast = useToast()
    useEffect(()=> {
        const fetchCustomer = async ()=>{
            try {
                 const customerData = await axiosInstance.get(`dashboard/customer/${id}/update/`, {headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'multipart/form-data',
              
              }}).then(response=> response.data);
                 setCustomerDetails(customerData);
            } catch (error) {
                console.log(`error while fetching customer data ${error.message}`)
            }
        }
        fetchCustomer()
    }, [id, accessToken])

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCustomerDetails({
            ...customerDetails,
            [name]:value
        })}

     const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
            const response =  await axiosInstance.put(`dashboard/customer/${id}/update/`, customerDetails, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
                if (response.data) {
                  toast({
                    title: 'Customer Updated Successfully',
                    status: 'success',
                    duration: 5000,
                    position:'top-right',
                    isClosable: true,
                  })

                  setTimeout(() => {
                    Navigate('/customer/')
                  }, 2000);
                }
             
             
            } catch (error) {
              if(error){
                toast({
                  title: 'Please check all required fields',
                  status: 'info',
                  duration: 5000,
                  position:'top-right',
                  isClosable: true,
                })
              }
            }
          };
 

  return (
    <>
       <Flex mx={'auto'} wrap={'wrap'} maxW={{base:'md', md:'md', lg:'lg'}}>
      <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}>Update Customer</Heading>
     
       <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          name="full_name"
          value={customerDetails.full_name}
          onChange={handleChange}
          required
        />
      </FormControl>

        <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          value={customerDetails.email}
          onChange={handleChange}
          required
        />
      </FormControl>
      
      
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          name="address"
          value={customerDetails.address}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          type="text"
          name="mobile_no"
          value={customerDetails.mobile_no}
          onChange={handleChange}
          required
        />
      </FormControl>
      <Button onClick={handleSubmit} type="submit">Save</Button>
  
    </Flex>
    </>
  )
}

export default UpdateCustomer