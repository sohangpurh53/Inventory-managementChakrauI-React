import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import NotificationComponent from "../Notification";
import { useAuth } from '../../context/AuthContext';

const UpdatePurchase = () => {
  const {accessToken} = useAuth( )
    const [notificationMessage, setNotificationMessage] = useState('');
    const [suppliers, setSupplier]= useState([]);
    const [products, setProduct]= useState([]);
    const [purchase, setPurchase] = useState({
      product:'',
      quantity:'',
      supplier:'',
    });
    const { id } = useParams();

    useEffect(()=>{
      const fetchPurchase = async() =>{
      try {
        await axiosInstance.get(`dashboard/purchase/${id}/update/`, {headers: {
          Authorization: `Bearer ${accessToken}`,
      
      }}).then(response => response.data).then(data=> setPurchase(data));
        const [supplierData, productData] = await Promise.all(
          [axiosInstance.get('dashboard/supplier/list/', {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data),
          axiosInstance.get('products/', {headers: {
            Authorization: `Bearer ${accessToken}`,
        
        }}).then(response => response.data),]
        ) 
        setSupplier(supplierData)
        setProduct(productData)
      } catch (error) {
        console.log(`Failed to load: ${error}`)
      }
      }
      fetchPurchase()
    }, [id, accessToken])

    

    const handleChange = (e)=>{
      const {name, value} = e.target; 
      
    setPurchase({
        ...purchase,
        [name]: value,
      });

    }
    

    const handleSubmit = async (e)=>{
      e.preventDefault();

      const updateFormData = new FormData();
        updateFormData.append('supplier' ,purchase.supplier);
        updateFormData.append('product' ,purchase.product);
        updateFormData.append('quantity' ,purchase.quantity);
        await axiosInstance.put(`dashboard/purchase/${id}/update/`,updateFormData,{headers: {
              Authorization: `Bearer ${accessToken}`,
          
          }}).then(response => {if (response.data) {
          setNotificationMessage(`Purchase Entry Upadted successfully!`);
          setTimeout(() => {
            setNotificationMessage(''); // Reset notification after 5 seconds
            window.location.href='/'
          }, 3000);
        } else {
          setNotificationMessage('Failed to create entry.');
        }})
        .catch((error) => console.log(`Error while submit purhase update form: ${error}`));

    };



  return (
    <div className='body'>
      <fieldset className='container-form'>    
      <NotificationComponent message={notificationMessage} />

        <legend>
          Purchase Update
        </legend>
         <form>
          <label htmlFor="supplier">Supplier</label>
          <select name="supplier" value={purchase.supplier} onChange={handleChange} required>
            <option value="" disabled> Select Supplier </option>
            {suppliers.map(supplier=>{
              return <option key={supplier.id} value={supplier.id}>{supplier.full_name}</option>
            })}
          </select>



          <label htmlFor="product">Product</label>
          <select name="product" value={purchase.product} onChange={handleChange} required>
            <option value='' disabled> Select Product </option>
            {products.map(product=>{
              return <option key={product.id} value={product.id}>{product.name}</option>
            })}
          </select>


          <label htmlFor="quantity">Quantity</label>
          <input required value={purchase.quantity}
          name='quantity'
          onChange={handleChange}
           type="number" />
           <button onClick={handleSubmit}>Update Purchase</button>
        </form>
       
      </fieldset>
   




    </div>
  )
}

export default UpdatePurchase