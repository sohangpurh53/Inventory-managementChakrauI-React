import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
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

const UpdatePurchase = () => {
  const {accessToken} = useAuth( )
    const [suppliers, setSupplier]= useState([]);
    const [products, setProduct]= useState([]);
    const [purchase, setPurchase] = useState({
      product:'',
      quantity:'',
      supplier:'',
    });
    const { id } = useParams();
    const  Navigate = useNavigate()
    const toast = useToast()

    useEffect(()=>{
      const fetchPurchase = async() =>{
      try {
        await axiosInstance.get(`dashboard/purchase/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data).then(data=> setPurchase(data));
        const [supplierData, productData] = await Promise.all(
          [axiosInstance.get('dashboard/supplier/list/', {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data),
          axiosInstance.get('products/', {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data),]
        ) 
        setSupplier(supplierData)
        setProduct(productData)
      } catch (error) {
        console.log(`Failed to load: ${error}`)
      }
      }
      fetchPurchase()
    }, [id, accessToken])

    

    const handleChange = (e)=>{
      const {name, value} = e.target; 
      
    setPurchase({
        ...purchase,
        [name]: value,
      });

    }
    

    const handleSubmit = async (e)=>{
      e.preventDefault();

      const updateFormData = new FormData();
        updateFormData.append('supplier' ,purchase.supplier);
        updateFormData.append('product' ,purchase.product);
        updateFormData.append('quantity' ,purchase.quantity);

        try {
           const response = await axiosInstance.put(`dashboard/purchase/${id}/update/`,updateFormData,{headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
          
          }})
          if(response.data){
            toast({
              title: 'Purchase Updated Successfully',
              status: 'success',
              duration: 5000,
              position:'top-right',
              isClosable: true,
            })
            setTimeout(() => {
              Navigate('/')
            }, 2000);
          }
        } catch (error) {
          toast({
            title: 'Purchase Updated Successfully',
            status: 'success',
            duration: 5000,
            position:'top-right',
            isClosable: true,
          })
        }
       

    };



  return (
    <Flex maxW={{base:'md', md:'md', lg:'lg'}} wrap={'wrap'} mx={'auto'}>
      

        <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}>
          Purchase Update
        </Heading>
         
       <FormControl isRequired>
         <FormLabel htmlFor="supplier">Supplier</FormLabel>
          <Select name="supplier" value={purchase.supplier} onChange={handleChange} required>
            <option value="" disabled> Select Supplier </option>
            {suppliers.map(supplier=>{
              return <option key={supplier.id} value={supplier.id}>{supplier.full_name}</option>
            })}
          </Select>
       </FormControl>

       <FormControl isRequired>
         <FormLabel htmlFor="product">Product</FormLabel>
          <Select name="product" value={purchase.product} onChange={handleChange} required>
            <option value='' disabled> Select Product </option>
            {products.map(product=>{
              return <option key={product.id} value={product.id}>{product.name}</option>
            })}
          </Select>
       </FormControl>

       <FormControl isRequired>
      <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Input required value={purchase.quantity}
                name='quantity'
                onChange={handleChange}
                type="number" />
            </FormControl>        
           <Button color={'white'} bg={'green.400'} _hover={{bg:'green.600'}} onClick={handleSubmit}>Update Purchase</Button>
       
       
  
   




    </Flex>
  )
}

export default UpdatePurchase