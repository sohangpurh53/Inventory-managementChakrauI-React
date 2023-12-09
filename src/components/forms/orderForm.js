import React, {useEffect, useState} from 'react'
import Loading from '../isLoading'
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from "../Notification";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const OrderForm = () => {
    const {accessToken} = useAuth()
    const [authenticated, setAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [customerDetail, setCustomerDetail] =useState([])
    const [productDetail, setProductDetail] = useState([])
    const [orderFormData, setOrderFormData] = useState({
        customer:'',
        order_status:'pending',
        product:'',
        price:'',
        quantity:'',
    })
    const  Navigate = useNavigate()

    useEffect(()=>{
     
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if(accessToken){
        setAuthenticated(true);
        const fetchdata = async ()=>{
          try {
              const [productData, customerData] = await Promise.all
              ([axiosInstance.get('purchases/', {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}).then(response => response.data),
              axiosInstance.get('dashboard/customer/list/', {headers: {
                Authorization: `Bearer ${accessToken}`,
            
            }}).then(response => response.data),
          ])
              
              setProductDetail(productData)
              setCustomerDetail(customerData)
              
          } catch (error) {
              console.log(`error while fetching data: ${error}`)
          }
      }
      fetchdata()
      }else{
        setAuthenticated(false);
        Navigate('/signin')
      }

        
        return () => clearTimeout(loadingTimeout);

        
    }, [accessToken, Navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderFormData({
          ...orderFormData,
          [name]: value,
        });
      };



    const createOrder = async (e)=>{
        e.preventDefault();
        const data = {
          order:{customer:orderFormData.customer,
            order_status:orderFormData.order_status,},
            product:orderFormData.product,
            quantity:orderFormData.quantity,
            price:orderFormData.price,
        }
  
        await axiosInstance.post('order-item/create/', data).then(response => {if (response.data) {
          setNotificationMessage(`Order Entry created successfully!`);
          setTimeout(() => {
            setNotificationMessage(''); // Reset notification after 5 seconds
          }, 5000);
        } else {
          setNotificationMessage('Failed to create entry.');
        }}).catch(error => console.error('Error creating product:', error));

    }
    
  return (
   
    <div className='body'>
 {isLoading? (<Loading/>):( authenticated &&(
      <fieldset className="container-form">
      <NotificationComponent message={notificationMessage} />
          <legend> <h3>Order</h3> </legend>
          <form >
  
          <div>
   <label htmlFor="product">Product:</label>
   <select
     name="product"
     value={orderFormData.product}
     onChange={handleChange}
     required
   >
     <option value="" disabled>Select a Product</option>
     {productDetail.map(products => (
       <option key={products.id} value={products.product.id}>
         {products.product.name}
       </option>
     ))}
   </select>
  </div>
  
  <div>
   <label htmlFor="order status">Order Status:</label>
   <select
     name="order_status"
     value={orderFormData.order_status}
     onChange={handleChange}
     required
   >
     <option value="" disabled>Select a Order Status</option>
       <option value='pending'>Pending</option>
       <option value='successful'>Successful</option>
    
   </select>
  </div>
          <div>
   <label htmlFor="customer">Customer:</label>
   <select
     name="customer"
     value={orderFormData.customer}
     onChange={handleChange}
     required
   >
     <option value="" disabled>Select a Customer</option>
     {customerDetail.map(customer => (
       <option key={customer.id} value={customer.id}>
         {customer.full_name}
       </option>
     ))}
   </select>
  </div>
  <div>
         <label htmlFor="quantity">Quantity:</label>
         <input
           type="number"
          
           name="quantity"
           value={orderFormData.quantity}
           onChange={handleChange}
           required
         />
       </div>
  <div>
         <label htmlFor="price">Price:</label>
         <input
           type="number"
          
           name="price"
           value={orderFormData.price}
           onChange={handleChange}
           required
         />
       </div>
  
  
       <button onClick={createOrder}> Generate Order</button>
          </form>
  
  
          </fieldset>
    )
  
 )}

       
    </div>
  )
}

export default OrderForm