import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import './css/user.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'


const CustomersInfo = () => {
    const {accessToken} = useAuth()
    const [customerDetail, setCustomerrDetails] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {

        // Simulate data loading with a setTimeout
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    

      if(accessToken){
        setAuthenticated(true);
        const fetchCustomer = ()=>{
          axiosInstance.get('dashboard/customer/list/',{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => {
            setCustomerrDetails(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
              
        }
        fetchCustomer()
      }
      else{
        setAuthenticated(false);
        window.location.href = '/signin'
      }
          // Clear the timeout if component is unmounted
          return () => clearTimeout(loadingTimeout);

    }, [accessToken])

  return (  isLoading?(<Loading/>):(
    authenticated &&( <>
     <div className="user-profile-list">
      {customerDetail.map((user) => (
        <div className="user-profile-card" key={user.id}>
          {/* <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" /> */}
          <div className="user-info">
            <h3 className="user-name">Name: {user.full_name}</h3>
            <p className="user-email">Email: {user.email}</p>
            <p className="user-location">Address: {user.address}</p>
            <p className="user-location">Mobile No: {user.mobile_no}</p>
          </div>
          <Link className="edit-button-customer" to={`/customer/${user.id}/update`}> <p className="bi bi-pencil">Update Customer</p> </Link>
        </div>
      ))}
    </div> 
    
    </>)
      )
    
    
   
  )
}

export default CustomersInfo