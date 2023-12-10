import React, { useEffect, useState } from "react"
import '../css/style.css'
import Loading from "../isLoading";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,

Select,
  Button,
  Heading,
  Flex,
  useToast,


} from '@chakra-ui/react'

const PurchaseForm = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [productOption, setProductOption] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [purchaseform, setPurchaseForm] = useState({
        supplier:'',
        product:'',
        quantity:'',
    });
    const  Navigate = useNavigate()
    const toast = useToast()

  useEffect(() => {
    if(accessToken){
      setAuthenticated(true);
     
    const fetchData = async () => {
      try { 
          const [suppliers, products] = await Promise.all([
            axiosInstance.get('suppliers/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}),
            axiosInstance.get('products/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}),

           
          ]);
          if(suppliers.data && products.data){
            setIsLoading(false)
          }
    
          setSupplierOptions(suppliers.data);
          setProductOption(products.data);
         
        } catch (error) {
          console.log(error);
          setIsLoading(false)
        }
      };
  
      fetchData();

    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }




  
  }, [accessToken, Navigate]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm({
      ...purchaseform,
      [name]: value,
    });
  };


  const createPurchase = async (e)=>{
    e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('supplier', purchaseform.supplier);
        formDataToSend.append('product', purchaseform.product);
        formDataToSend.append('quantity', purchaseform.quantity);
    
      try {
       const response = await axiosInstance.post('purchase/create/', 
          formDataToSend, {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }})
        if(response.request.status===201) {
          toast({
            title: 'Purchase Entry Created Successfully',
            status: 'success',
            duration: 5000,
            position:'top-right',
            isClosable: true,
          })
          
          } 
      } catch (error) {
          toast({
          title: `Please check all require fields`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:'top-rght'
        });      
        
      }  
         
  }

  return (
    <div className="body">

{isLoading? (<Loading/>):(
  authenticated &&(
<Flex mx={'auto'} gap={3} boxShadow={'md'} padding={5} wrap={'wrap'} maxW={{base:'md', md:'md', lg:'lg'}}>
 <Heading mx={'auto'} color={'gray.300'}> Purchase </Heading>
 <> 
<FormControl isRequired>
<FormLabel htmlFor="product">Product:</FormLabel>
<Select
name="product"
value={purchaseform.product}
onChange={handleChange}
required
>
<option value="" disabled>Select a Product</option>
{productOption.map(products => (
<option key={products.id} value={products.id}>
{products.name}
</option>
))}
</Select>
</FormControl>



<FormControl isRequired>
<FormLabel htmlFor="name">Quantity:</FormLabel>
<Input
  type="number"
 
  name="quantity"
  value={purchaseform.quantity}
  onChange={handleChange}
  required
/>
</FormControl>

<FormControl isRequired>
<FormLabel htmlFor="supplier">Supplier:</FormLabel>
<Select
name="supplier"
value={purchaseform.supplier}
onChange={handleChange}
required
>
<option value="" disabled>Select a supplier</option>
{supplierOptions.map(supplier => (
<option key={supplier.id} value={supplier.id}>
{supplier.full_name}
</option>
))}
</Select>
</FormControl>


<Button bg={'green.400'} color={'white'} _hover={{bg:'green.600'}} onClick={createPurchase} >Create Purchase</Button>

</>
</Flex>
  )
 
)}
     
    </div>
  )
}

export default PurchaseForm