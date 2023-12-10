import React, { useState, useEffect } from 'react';
import '../css/style.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

const ProductForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productform, setProductform] = useState({
    name: '',
    category: '',
    description: '',
    image: null,
    price: '',
    supplier: '',
  });
  const  Navigate = useNavigate()
  const toast = useToast()

  // useEffect(() => {
    
  // }, []);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if(accessToken){
      setAuthenticated(true);

      const fetchData = async () => {

        try {
          const [suppliers, categories] = await Promise.all([
            axiosInstance.get('dashboard/supplier/list/',{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data),
            axiosInstance.get('categories/',{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data),
  
          ]);
  
          setSupplierOptions(suppliers);
          setCategoryOptions(categories);
  
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();

    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }

  
    return () => clearTimeout(loadingTimeout);
  }, [accessToken, Navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductform({
      ...productform,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    // Ensure 'file' exists and is of type 'File' before updating the state
    if (file instanceof File) {
      setProductform({
        ...productform,
        image: file,
      });
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', productform.name);
    formDataToSend.append('category', productform.category);
    formDataToSend.append('description', productform.description);
    formDataToSend.append('price', productform.price);
    formDataToSend.append('supplier', productform.supplier);
    formDataToSend.append('image', productform.image, productform.image.name);  
    try {
      const response = await axiosInstance.post('product/create/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data) {
        toast({
          title: 'Product Created Successfully',
          status: 'success',
          duration: 5000,
          position:'top-right',
          isClosable: true,
        })
      } 
    } catch (error) {
      // console.log(`error while create product ${error.message}`);
      toast({
          title: 'error while create product',
          status: 'warning',
          position:'top-right',
          duration: 5000,
          isClosable: true,
        })
    }
  }
   
      

  return (
    <>
      {isLoading? (<Loading/>):(authenticated &&( <Flex wrap={'wrap'} boxShadow={'md'} padding={5} justifyContent={'center'}  mx={'auto'} maxW={{base:'md', md:'md', lg:'lg'}}>

 <Heading mx={'auto'}  size={'lg'} color={'blackAlpha.200'}> Product </Heading>
          <FormControl >
            <FormLabel >Name:</FormLabel>
            <Input
              type="text"

              name="name"
              value={productform.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel >Category:</FormLabel>
            <Select
              name="category"
              value={productform.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Category</option>
              {categoryOptions.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl  >
            <FormLabel >Description:</FormLabel>
            <Input
              type="text"
            
              name="description"
              value={productform.description}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel >Image:</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              
            />
          </FormControl>

          <FormControl  >
            <FormLabel >Price:</FormLabel>
            <Input
              type="number"

              name="price"
              value={productform.price}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel >Supplier:</FormLabel>
            <Select
              name="supplier"
              value={productform.supplier}
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


          <Button color={'white'} m={5} _hover={{bg:'green.600'}}  bg={'green.400'} onClick={createProduct}>Create Product</Button>

      


      </Flex>)
       
      )}
      
    </>
  )
}

export default ProductForm