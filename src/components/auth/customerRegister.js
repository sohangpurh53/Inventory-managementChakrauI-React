import React, { useState, useEffect } from 'react';
import './supplier.css'
import Loading from '../isLoading';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';


const CustomerRegister = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name:'',
    email:'',
    address: '',
    mobile_no: ''
  });

  

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('customer/create/', formData);
      if (!response.ok) {
        throw new Error('Network response was not ok or Unauthorized');
      }

      const data = await response.json();
      console.log('User registered:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    authenticated &&(
      <div className="container-auth">
      {isLoading? (<Loading/>):(
        <form onSubmit={handleSubmit}>
       <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>

        <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required className="form-group"
        />
      </div>
      
      
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          required
        />
      </div>
      <button className='btn' type="submit">Save</button>
    </form>
      )}
    
    </div>
    )
    
  );
};

export default CustomerRegister;
