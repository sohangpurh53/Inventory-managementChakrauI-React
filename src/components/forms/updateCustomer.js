import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import '../auth/supplier.css'
import NotificationComponent from '../Notification';
import { useAuth } from '../../context/AuthContext';

const UpdateCustomer = () => {
  const {accessToken} = useAuth()
  const [notificationMessage, setNotificationMessage] = useState('');
    const {id} = useParams()
  const [customerDetails, setCustomerDetails] = useState({
    full_name:'',
    email:'',
    address: '',
    mobile_no: ''
  })
  const  Navigate = useNavigate() 

    useEffect(()=> {
        const fetchCustomer = async ()=>{
            try {
                 const customerData = await axiosInstance.get(`dashboard/customer/${id}/update/`, {headers: {
                  Authorization: `Bearer ${accessToken}`,
              
              }}).then(response=> response.data);
                 setCustomerDetails(customerData);
            } catch (error) {
                console.log(`error while fetching customer data ${error.message}`)
            }
        }
        fetchCustomer()
    }, [id, accessToken])

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setCustomerDetails({
            ...customerDetails,
            [name]:value
        })}

     const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
              await axiosInstance.put(`dashboard/customer/${id}/update/`, customerDetails, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}).then(response => {
                if (response.data) {
                  setNotificationMessage('Customer Entry Updated successfully!');
                  setTimeout(() => {
                    setNotificationMessage(''); // Reset notification after 5 seconds
                    Navigate('/')
                  }, 2500);
                } else {
                  setNotificationMessage('Failed to create entry.');
                }
              });
             
            } catch (error) {
              console.error('Error:', error);
            }
          };
 

  return (
    <>
       <div className="container-auth">
       <NotificationComponent message={notificationMessage} />
     <form onSubmit={handleSubmit}>
       <div className='form-group'>
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={customerDetails.full_name}
          onChange={handleChange}
          required
        />
      </div>

        <div className='form-group'>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={customerDetails.email}
          onChange={handleChange}
          required
        />
      </div>
      
      
      <div className='form-group'>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={customerDetails.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile_no"
          value={customerDetails.mobile_no}
          onChange={handleChange}
          required
        />
      </div>
      <button className='btn' type="submit">Save</button>
    </form>
    </div>
    </>
  )
}

export default UpdateCustomer