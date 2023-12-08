// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from '../Notification';
import { useAuth } from '../../context/AuthContext';

const CategoryUpdateForm = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategory = await axiosInstance.get(`dashboard/category/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
      
        
        setCategory(fetchedCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };


  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateCategory = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', category.name);
 

    axiosInstance.put(`dashboard/category/${id}/update/`, formDataToSend, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
      .then(response => {
        if (response.data) {
          setNotificationMessage('Category Entry Updated successfully!');
          setTimeout(() => {
            setNotificationMessage(''); // Reset notification after 5 seconds
          }, 2500);
        } else {
          setNotificationMessage('Failed to create entry.');
        }
      })
      .catch(error => console.error('Error updating category:', error));
  };

  return (
    <div className='body'>
      <fieldset className="container-form">
      <NotificationComponent message={notificationMessage} />
        <legend> <h3>Update Category</h3></legend>


        <form encType="multipart/form-data">

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"

              name="name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </div>

        
          <button onClick={updateCategory}>Update Category</button>

        </form>
        </fieldset>
    </div>
  );
};

export default CategoryUpdateForm;
