import React, {useEffect, useState} from 'react'
import './css/style.css'
import { useAuth } from '../context/AuthContext'
import Loading from './isLoading';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

const StockList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [stockDetails, setStockDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(()=>{
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);


      if(accessToken){
        setAuthenticated(true);

        
      const loadStock = async ()=>{
         
         try {
          const stockData = await axiosInstance.get(`dashboard/stock/list/?page=${currentPage}`,{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}
            ).then(response=> response.data);
          setStockDetails(stockData);
          setStockDetails(stockData.results || []);
                setHasNextPage(stockData.next !== null);
                setHasPrevPage(stockData.previous !== null);
         } catch (error) {
              console.log(error)
         }

      }
      loadStock()
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
          <div className="container">
      <table>
          <thead>
              
              <tr>
                  <th>Product Name</th>
                  <th> Available Qty </th>
                 
              </tr>
              </thead>
  
              {stockDetails.map((stock, index) => (
                  <tbody key={index}>
                      <tr>
                          <td> {stock.product.name} </td>
                          <td> {stock.quantity} </td>
                          <td> <Link  className='edit-button' to={`/stock/${stock.id}/update`}> <p className="bi bi-pencil">Update</p> </Link></td>
                         
                       
                      </tr>
                  </tbody>
              ))}
        
      </table>
      <div className="pagination">
            {hasPrevPage && <button onClick={handlePrevPage}>Previous</button>}
            <span className='page-number'> Page&nbsp;{currentPage}</span>
            {hasNextPage && <button onClick={handleNextPage}>Next</button>}
          </div>
      </div>
        ))
      )}
      
      
    
    </div>
  )
}

export default StockList