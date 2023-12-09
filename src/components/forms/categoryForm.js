import React, { useState, useEffect } from 'react';
import '../css/style.css'
import Loading from '../isLoading';
import NotificationComponent from '../Notification';
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,


} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';


const CategoryForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryform, setCategoryForm] = useState({
    name: '',
  });
  const  Navigate = useNavigate()


  const categoryHandleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({
      ...categoryform,
      [name]: value,
    });
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if(accessToken){
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }

    return () => clearTimeout(loadingTimeout);
  }, [accessToken, Navigate]);


  const createCategory = (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append('name', categoryform.name);
    axiosInstance.post('category/create/', categoryData, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }}).then(response => {
      if (response.data) {
        setNotificationMessage('Category Entry created successfully!');
        setTimeout(() => {
          setNotificationMessage(''); // Reset notification after 5 seconds
        }, 2500);
      } else {
        setNotificationMessage('Failed to create entry.');
      }
    }).catch(error => console.error('Error creating Category:', error));
    
    
  }
  return (
    <div className='body'>
      {isLoading? (<Loading/>):( authenticated && (
      <Box w={{base:'md', lg:'lg'}}> 
      <NotificationComponent message={notificationMessage} />
          
          <FormControl>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={categoryform.name}
              onChange={categoryHandleChange}
              required
            />
          </FormControl>
          <Button mt={2} onClick={createCategory} >Create Category</Button>
        
          
    
      </Box>) ) }

     
    </div>
  )
}

export default CategoryForm