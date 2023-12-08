import React, {useState, useEffect} from 'react'
import './css/style.css'
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance'
import { Link } from 'react-router-dom';

const OrderItemList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [orderDetails, setOrderDetails] = useState([]);
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
                  const orderData = await axiosInstance.get(`dashboard/order/list/?page=${currentPage}`,{headers: {
                    Authorization: `Bearer ${accessToken}`,
                
                }}).then(response => response.data);
                  setOrderDetails(orderData.results || []);
                  setHasNextPage(orderData.next !== null);
                  setHasPrevPage(orderData.previous !== null);

                } catch (error) {
                    console.log(error)
                } 
                
        }
        loadPurchase()
      }else{
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
        (authenticated && 
          (<div className="order-container">
           <table>
                 <thead>
                   
                     <tr>
                         <th>Product Name</th>
                         <th> Quantity</th>
                         <th> Price </th>
                         <th>Total Price </th>
                         <th>Customer Name</th>
                         <th>Order Status</th>
                     </tr>
                     
                    
                    
                     </thead>
         
                     {orderDetails.map((order, index) => (
                         <tbody key={index}>
                             <tr>
                                 <td> {order.product.name} </td>
                                 <td> {order.quantity} </td>
                                 <td> {order.price} </td>
                                 <td> {order.quantity*order.price} </td>
                                 <td> {order.order.customer.full_name} </td>
                                 <td> {order.order.order_status} </td>
                                 <td> <Link  to={`/order/${order.id}/update`}> <button className="bi bi-pencil-square update-icon">Update</button> </Link> </td>
                             </tr>
                             
                          
                         </tbody>
                     ))}
               
             </table>
             <div className="pagination">
                   {hasPrevPage && <button onClick={handlePrevPage}>Previous</button>}
                   <span className='page-number'> Page&nbsp;{currentPage}</span>
                   {hasNextPage && <button onClick={handleNextPage}>Next</button>}
                 </div>
             </div>))
      )}

 
    </div>
  )
}

export default OrderItemList