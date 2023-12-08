// ProductUpdateForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from '../Notification';
import { useAuth } from '../../context/AuthContext';

const OrderUpdateForm = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItemDetails, setOrderItemDetails] = useState({
    product:'',
    price:'',
    quantity:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrderItem = await axiosInstance.get(`dashboard/orderitem/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data);
        const orderData = await 
          axiosInstance.get('order-item/').then(response => response.data);

        setOrderDetails(orderData);
        setOrderItemDetails(fetchedOrderItem);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderItemDetails({
      ...orderItemDetails,
      [name]: value,
    });
  };
  

  // Implement the rest of your update form here, similar to the create form but with pre-filled values from `product`

  const updateOrder = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('product', orderItemDetails.product);
    formDataToSend.append('quantity', orderItemDetails.quantity);
    formDataToSend.append('price', orderItemDetails.price);

   

    axiosInstance.put(`dashboard/orderitem/${id}/update/`, formDataToSend, {headers: {
      Authorization: `Bearer ${accessToken}`,
  
  }})
      .then(response => {
        if (response.data) {
          setNotificationMessage('Order Entry Updated successfully!');
          setTimeout(() => {
            setNotificationMessage(''); // Reset notification after 5 seconds
            window.location.href='/'
          }, 2500);
        } else {
          setNotificationMessage('Failed to create entry.');
        }
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className='body'>
      <fieldset className="container-form">
      <NotificationComponent message={notificationMessage} />
        <legend> <h3>Update Order Item</h3></legend>


        <form encType="multipart/form-data">

      
          <div>
            <label htmlFor="product">Product:</label>
            <select
              name="product"
              value={orderDetails.product}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Product</option>
              {orderDetails.map((order, index) => (
                <option key={index} value={order.id}>
                  {order.product.name}
                </option>
              ))}
            </select>
          </div>



         
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"

              name="quantity"
              value={orderItemDetails.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
       <label htmlFor="price">Price:</label>
       <input
         type="number"
        
         name="price"
         value={orderItemDetails.price}
         onChange={handleChange}
         required
       />
     </div>
         

          <button onClick={updateOrder}>Update Order</button>

        </form>
        </fieldset>
    </div>
  );
};

export default OrderUpdateForm;
