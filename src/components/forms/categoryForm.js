import React, { useState, useEffect } from 'react';
import '../css/style.css'
import Loading from '../isLoading';
import NotificationComponent from '../Notification';
import axiosInstance from '../../utils/axiosInstance'
import { useAuth } from '../../context/AuthContext';



const CategoryForm = () => {
  const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryform, setCategoryForm] = useState({
    name: '',
  });
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
      window.location.href ='/signin'
    }

    return () => clearTimeout(loadingTimeout);
  }, [accessToken]);


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
      {isLoading? (<Loading/>):( authenticated && (<fieldset className="container-form"> 
      <NotificationComponent message={notificationMessage} />
      <legend> <h3>Category</h3> </legend>
        <form >
          <div>
            <label htmlFor="category">Name:</label>
            <input
              type="text"
              name="name"
              value={categoryform.name}
              onChange={categoryHandleChange}
              required
            />
          </div>
          <button onClick={createCategory} >Create Category</button>
          
        </form>
      </fieldset>) ) }

     
    </div>
  )
}

export default CategoryForm