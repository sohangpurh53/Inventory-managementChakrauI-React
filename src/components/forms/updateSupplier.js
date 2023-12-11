import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import '../auth/supplier.css'
import NotificationComponent from '../Notification';
import { useAuth } from '../../context/AuthContext';
import {
  FormControl,
  FormLabel,
  Input,
useToast,
Select,
  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

const UpdateSupplier = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
    const {id} = useParams()
  const [supplierDetails, setSupplierDetails] = useState({
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
                 const customerData = await axiosInstance.get(`dashboard/supplier/${id}/update/`,{headers: {
                  Authorization: `Bearer ${accessToken}`,
              
              }}).then(response=> response.data);
                 setSupplierDetails(customerData);
            } catch (error) {
                console.log(`error while fetching supplier data ${error.message}`)
            }
        }
        fetchCustomer()
    }, [id, accessToken])

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setSupplierDetails({
            ...supplierDetails,
            [name]:value
        })}

     const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
             const response =  await axiosInstance.put(`dashboard/supplier/${id}/update/`, supplierDetails, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }})
            if(response.data){
              toast({
                title: 'Supplier Updated Successfully',
                status: 'success',
                duration: 5000,
                position:'top-right',
                isClosable: true,
              })
            }
            setTimeout(() => {
              Navigate('/')
            }, 2000);
             
            } catch (error) {
              toast({
                title: 'Please check all require fields',
                status: 'info',
                duration: 5000,
                position:'top-right',
                isClosable: true,
              })
            }
          };
 

  return (
    <>
       <Flex maxW={{base:'md', md:'md', lg:'lg'}} wrap={'wrap'} mx={'auto'}>
       
    <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}>Update Supplier</Heading>
       <FormControl isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          name="full_name"
          value={supplierDetails.full_name}
          onChange={handleChange}
          required
        />
      </FormControl>

        <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="email"
          value={supplierDetails.email}
          onChange={handleChange}
          required
        />
      </FormControl>
      
      
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          name="address"
          value={supplierDetails.address}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          type="text"
          name="mobile_no"
          value={supplierDetails.mobile_no}
          onChange={handleChange}
          required
        />
      </FormControl>
      <Button color={'white'} bg={'green.400'} _hover={{bg:'green.600'}} onClick={handleSubmit}  type="submit">Update</Button>
 
    </Flex>
    </>
  )
}

export default UpdateSupplier