import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import './css/user.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'


const SuppliersInfo = () => {
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [supplierDetail, setSupplierDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=> { 
        // Simulate data loading with a setTimeout
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
      
      if(accessToken){
        setAuthenticated(true);
        const fetchSupplier = ()=>{
          axiosInstance.get('dashboard/supplier/list/',{headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => {
               setSupplierDetails(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
              
        }
        fetchSupplier()
      }else{
        setAuthenticated(false);
        window.location.href ='/signin'
      }

      // Clear the timeout if component is unmounted
      return () => clearTimeout(loadingTimeout);
        

    }, [accessToken])

  return (
    isLoading ? (
      <Loading />
    ) : (
      authenticated &&(
        <>
        <div className="user-profile-list">
         {supplierDetail.map((user) => (
           <div className="user-profile-card" key={user.id}>
             {/* <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" /> */}
             <div className="user-info">
               <h3 className="user-name">{user.full_name}</h3>
               <h3 className="user-name">{user.email}</h3>
               <p className="user-email">{user.mobile_no}</p>
               <p className="user-location">{user.address}</p>
             </div>
             <Link className="edit-button-customer" to={`/supplier/${user.id}/update`}> <p className="bi bi-pencil">Update Supplier</p> </Link>
           </div>
           
         ))}
       </div> 
       
       </>
     )
      
    )


    
   
  )
}

export default SuppliersInfo