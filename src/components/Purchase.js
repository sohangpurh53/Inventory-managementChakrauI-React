import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './css/style.css'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading'
import axiosInstance from '../utils/axiosInstance'

const PurchaseList = () => {
    const { accessToken } = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [purchaseDetail, setPurchaseDetail] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    useEffect(()=>{
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
     

       if(accessToken){
        setAuthenticated(true);
        const loadPurchase = async ()=>{
             try {
              const purchaseData = await axiosInstance.get(`/dashboard/purchase/list/?page=${currentPage}`, {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}).then(response => response.data);
              setPurchaseDetail(purchaseData.results || []);
              setHasNextPage(purchaseData.next !== null);
              setHasPrevPage(purchaseData.previous !== null);

            } catch (error) {
                console.log(error)
            } 
            
    }
    loadPurchase()
       }
       else{
        setAuthenticated(false);
        window.location.href = '/signin'
       }
            
       
       return () => clearTimeout(loadingTimeout);
    }, [accessToken, currentPage])

    const handleNextPage = () => {
      if (hasNextPage) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (hasPrevPage) {
        setCurrentPage(currentPage - 1);
      }
    };


  return (
    <div>

      {isLoading? (<Loading/>):(
(authenticated && (
  <div className="purchase-container">
      <table>
    <thead> 
    
   <tr>
    <th> Product Image</th>
      <th> Product Name </th>
      <th> Quantity </th>
      </tr>   
    </thead>
      {purchaseDetail.map(purchase => (   
        <tbody key={purchase.id}>
      <tr> 
        <td > <img src={purchase.product.image} alt="" /> </td>
        <td> {purchase.product.name}  </td>
        <td> {purchase.quantity}</td>
        <td> <Link  to={`/purchase/${purchase.id}/update`}> <button className="bi bi-pencil-square update-icon">Update</button> </Link></td>
        <td> <Link  to={`/purchase/${purchase.id}/delete`}> <button className="bi bi-trash delete-icon">Delete</button> </Link></td>
        
        </tr>
        </tbody>
      ))}
  </table>
  <div className="pagination">
      {hasPrevPage && <button onClick={handlePrevPage}>Previous</button>}
      <span className='page-number'> Page&nbsp;{currentPage}</span>
      {hasNextPage && <button onClick={handleNextPage}>Next</button>}
    </div>
  </div>) )
      )}
      
        

    </div>
  )
}

export default PurchaseList