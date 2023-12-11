// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
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

const ProductUpdateForm = () => {
  const {accessToken} = useAuth()
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    image: undefined,
    price: '',
    supplier: '',
  });
  const  Navigate = useNavigate()
  const toast = useToast()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await axiosInstance.get(`dashboard/product/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
        const [suppliers, categories] = await Promise.all([
          axiosInstance.get('dashboard/supplier/list/').then(response => response.data),
          axiosInstance.get('categories/').then(response => response.data),

        ]);

        setSupplierOptions(suppliers);
        setCategoryOptions(categories);
        
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      image: file,
    });
  };

  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateProduct = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', product.name);
    formDataToSend.append('category', product.category);
    formDataToSend.append('description', product.description);
    formDataToSend.append('image', product.image);
    formDataToSend.append('price', product.price);
    formDataToSend.append('supplier', product.supplier);
try {
  const response = axiosInstance.put(`dashboard/product/${id}/update/`, formDataToSend,{headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
  
  }})
  if (response.data) {
    toast({
      title: 'Product Updated Successfully',
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
    title: 'Please cheak all require field',
    status: 'info',
    duration: 5000,
    position:'top-right',
    isClosable: true,
  })
}
   
      
     
     
  };

  return (
    <Flex maxW={{base:'md', md:'md', lg:'lg'}} wrap={'wrap'} mx={'auto'}>
      
    
        <Heading textAlign={'center'} size={{base:'sm', lg:'lg'}}> <h3>Update Product</h3></Heading>


        

          <FormControl isRequired>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"

              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="category">Category:</FormLabel>
            <Select
              name="category"
              value={product.category}
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

          <FormControl isRequired>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Input
              type="text"

              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="image">Image:</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Price:</FormLabel>
            <Input
              type="number"

              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="supplier">Supplier:</FormLabel>
            <Select
              name="supplier"
              value={product.supplier}
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


          <Button color={'white'} bg={'green.400'} _hover={{bg:'green.600'}} onClick={updateProduct}>Update Product</Button>

      
      
    </Flex>
  );
};

export default ProductUpdateForm;
