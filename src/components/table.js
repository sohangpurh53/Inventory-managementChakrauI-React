import React, { useEffect, useState } from 'react';
import './css/table.css';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loading from './isLoading';



const Table = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [orderDetails, setOrderDetails] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
      // Simulate data loading with a setTimeout
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  

    if(accessToken){
      setAuthenticated(true);
      const fetchData = async () => {
        try {
          const Data = await 
            axiosInstance.get('dashboard/list/table/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then((response) => response.data)
          
  
          setOrderDetails(Data.order_item_data);
          setPurchaseDetails(Data.purchase_data);
          setStockDetails(Data.stock_data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
          
        } 
      };
      fetchData();
    }else{
      setAuthenticated(false);
      window.location.href = '/signin'
    }
    // Clear the timeout if component is unmounted
     return () => clearTimeout(loadingTimeout);
    
  }, [accessToken]);

  
  // Total quantity calculation
  const totalStockQuantity = stockDetails.reduce((total, stock) => total + stock.quantity, 0);
  const totalOrderQuantity = orderDetails.reduce((total, order) => total + order.quantity, 0);
  const totalPurchaseQuantity = purchaseDetails.reduce((total, purchase) => total + purchase.quantity, 0);
  
  // total price calulation
  const totalOrdersalesPrice = orderDetails.reduce((total, order) => total + order.quantity * order.price, 0);
  const totalPurchasePrice = purchaseDetails.reduce((total, purchase) => total + purchase.quantity * purchase.product.price, 0);
 
  //  total profit/loss
  const totalProfitOrLoss = orderDetails.reduce((total, order) => total + order.price * order.quantity - order.product.price * order.quantity, 0);

  

  return (isLoading ? (
        <Loading />
      ) : (
        authenticated &&( 
          <div className="table-container">
          <div className="table-wrapper">
            <h2>Purchase</h2>
            <div className="data-table">
            <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchaseDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity * item.product.price}</td>
              </tr>
            ))}
             <tr>
              <td><b>Purchase Grand Total</b></td>
              <td> <b>{totalPurchaseQuantity}</b></td>
              <td> </td>
              <td><b>{totalPurchasePrice}</b></td>
            </tr>
          </tbody>
        </table>
            </div>
          </div>
        
          <div className="table-wrapper">
            <h2>Order</h2>
            <div className="data-table">
            <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Sale Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
            <tr>
              <td><b>Order Grand Total</b></td>
              <td> <b>{totalOrderQuantity}</b></td>
              <td> </td>
              <td><b>{totalOrdersalesPrice}</b></td>
            </tr>
          </tbody>
        </table>
            </div>
          </div>
        
          <div className="table-wrapper">
            <h2>Stock </h2>
            <div className="data-table">
            <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
            
          </thead>
          <tbody>
            {stockDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                
              </tr>
            ))}
           <tr>
              <td><b>Total Stock Quantity</b></td>
              <td>{totalStockQuantity}</td>
            </tr>
         
          </tbody>
        </table>
            </div>
          </div>
        
          <div className="table-wrapper">
            <h2>Profit and Loss </h2>
            <div className="data-table">
            <table>
          <thead>
            <tr>
              <th>Purchase Price Per Unit</th>
              <th>Sale Price Per Unit</th>
              <th>Qty Sold</th>
              <th>Balance Amount</th>
              <th>Profit or Loss</th>
             
              
            </tr>
          </thead>
          <tbody>
          {orderDetails.map((revenue, index) =>(
          <tr key={index}>
            <td>{revenue.product.price}</td>
            <td>{revenue.price}</td>
            <td>{revenue.quantity}</td>
            <td style={{ color: (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'green' : 'red' }}>{ revenue.price*revenue.quantity - revenue.product.price*revenue.quantity}</td>
            <td style={{ color: (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'green' : 'red' }}>
        { (revenue.price * revenue.quantity - revenue.product.price * revenue.quantity) >= 0 ? 'Profit' : 'Loss' }
        </td>
            </tr>
        ))}   
          <tr>
              <td><b>Total <i>Profit / Loss</i></b></td>
              <td> </td>
              <td> </td>
              <td style={{ color: (totalProfitOrLoss) >= 0 ? 'green' : 'red' }}><b>{totalProfitOrLoss}</b></td>
            </tr>
          </tbody>
        </table>
            </div>
          </div>
        </div>)
      )
 
   
  );
};

export default Table;
