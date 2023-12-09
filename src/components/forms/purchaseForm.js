import React, { useEffect, useState } from "react"
import '../css/style.css'
import Loading from "../isLoading";
import axiosInstance from "../../utils/axiosInstance";
import NotificationComponent from "../Notification";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {
  const {accessToken} = useAuth()
  const [authenticated, setAuthenticated] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [productOption, setProductOption] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [purchaseform, setPurchaseForm] = useState({
        supplier:'',
        product:'',
        quantity:'',
    });
    const  Navigate = useNavigate()

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if(accessToken){
      setAuthenticated(true);
     
    const fetchData = async () => {
      try { 
          const [suppliers, products] = await Promise.all([
            axiosInstance.get('suppliers/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data),
            axiosInstance.get('products/', {headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => response.data)
           
          ]);
    
          setSupplierOptions(suppliers);
          setProductOption(products);
         
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();

    }else{
      setAuthenticated(false);
      Navigate('/signin')
    }




    return () => clearTimeout(loadingTimeout);
  }, [accessToken, Navigate]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm({
      ...purchaseform,
      [name]: value,
    });
  };


  const createPurchase = (e)=>{
    e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('supplier', purchaseform.supplier);
        formDataToSend.append('product', purchaseform.product);
        formDataToSend.append('quantity', purchaseform.quantity);
    
        axiosInstance.post('purchase/create/', 
          formDataToSend, {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }})
          .then(response => {if (response.data) {
            setNotificationMessage(`Purchase Entry created successfully!`);
            setTimeout(() => {
              setNotificationMessage(''); // Reset notification after 5 seconds
            }, 5000);
          } else {
            setNotificationMessage('Failed to create entry.');
          }})
          .catch(error => console.error('Error creating product:', error));
  }

  return (
    <div className="body">

{isLoading? (<Loading/>):(
  authenticated &&(
<fieldset className="container-form">
<NotificationComponent message={notificationMessage} />
 <legend> <h3>Purchase</h3> </legend>
 <form encType="multipart/form-data"> 
<div>
<label htmlFor="product">Product:</label>
<select
name="product"
value={purchaseform.product}
onChange={handleChange}
required
>
<option value="" disabled>Select a Product</option>
{productOption.map(products => (
<option key={products.id} value={products.id}>
{products.name}
</option>
))}
</select>
</div>



<div>
<label htmlFor="name">Quantity:</label>
<input
  type="number"
 
  name="quantity"
  value={purchaseform.quantity}
  onChange={handleChange}
  required
/>
</div>

<div>
<label htmlFor="supplier">Supplier:</label>
<select
name="supplier"
value={purchaseform.supplier}
onChange={handleChange}
required
>
<option value="" disabled>Select a supplier</option>
{supplierOptions.map(supplier => (
<option key={supplier.id} value={supplier.id}>
{supplier.full_name}
</option>
))}
</select>
</div>


<button onClick={createPurchase} >Create Purchase</button>

</form>
</fieldset>
  )
 
)}
     
    </div>
  )
}

export default PurchaseForm