// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from '../Notification';
import { useAuth } from '../../context/AuthContext';

const StockUpdateForm = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
  const { id } = useParams();
  const [stocksDetail, setStocksDetail] = useState({
    quantity:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStock = await axiosInstance.get(`dashboard/stock/${id}/update/`,{headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
      
        
        setStocksDetail(fetchedStock);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStocksDetail({
      ...stocksDetail,
      [name]: value,
    });
  };


  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateCategory = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('quantity', stocksDetail.quantity);
 

    axiosInstance.put(`dashboard/stock/${id}/update/`, formDataToSend,{headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
      .then(response => {
        if (response.data) {
          setNotificationMessage('Stock Entry Updated successfully!');
          setTimeout(() => {
            setNotificationMessage(''); // Reset notification after 5 seconds
            window.location.href='/'
          }, 2500);
        } else {
          setNotificationMessage('Failed to create entry.');
        }
      })
      .catch(error => console.error('Error updating stocksDetail:', error));
  };

  return (
    <div className='body'>
      <fieldset className="container-form">
      <NotificationComponent message={notificationMessage} />
        <legend> <h3>Update Stock</h3></legend>


        <form encType="multipart/form-data">

          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"

              name="quantity"
              value={stocksDetail.quantity}
              onChange={handleChange}
              required
            />
          </div>

        
          <button onClick={updateCategory}>Update Stock</button>

        </form>
        </fieldset>
    </div>
  );
};

export default StockUpdateForm;
