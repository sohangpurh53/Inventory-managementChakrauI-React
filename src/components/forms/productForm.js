import React, { useState, useEffect } from 'react';
import '../css/style.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from "../Notification";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,

Select,
  Button,
  Heading,
  Flex,


} from '@chakra-ui/react'

const ProductForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
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
    setProductform({
      ...productform,
      image: file, // Set the file object, not just the metadata
    });
  };
console.log(productform)
  const createProduct = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', productform.name);
    formDataToSend.append('category', productform.category);
    formDataToSend.append('description', productform.description);
    formDataToSend.append('price', productform.price);
    formDataToSend.append('supplier', productform.supplier);
    formDataToSend.append('image', productform.image); // Incorrect: Needs to be corrected
  
    try {
      const response = await axiosInstance.post('product/create/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.data) {
        setNotificationMessage(`Product Entry created successfully!`);
        setTimeout(() => {
          setNotificationMessage('');
        }, 5000);
      } else {
        setNotificationMessage('Failed to create entry.');
      }
    } catch (error) {
      console.log(error);
    }
  }
   
      

  return (
    <>
      {isLoading? (<Loading/>):(authenticated &&( <Flex wrap={'wrap'} boxShadow={'md'} padding={5} justifyContent={'center'}  mx={'auto'} maxW={{base:'md', md:'md', lg:'lg'}}>
        <NotificationComponent message={notificationMessage} />
       


       
 <Heading mx={'auto'}  size={'lg'} color={'blackAlpha.200'}> Product </Heading>
          <FormControl >
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"

              name="name"
              value={productform.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel htmlFor="category">Category:</FormLabel>
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
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Input
              type="text"
            
              name="description"
              value={productform.description}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel htmlFor="image">Image:</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              
            />
          </FormControl>

          <FormControl  >
            <FormLabel htmlFor="name">Price:</FormLabel>
            <Input
              type="number"

              name="price"
              value={productform.price}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl  >
            <FormLabel htmlFor="supplier">Supplier:</FormLabel>
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