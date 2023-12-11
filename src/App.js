import SupplierRegister from './components/auth/supplierRegister'
import CustomerRegister from './components/auth/customerRegister'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './components/Home';
import Product from './components/Product';
import PurchaseForm from './components/forms/purchaseForm';
import ProductForm from './components/forms/productForm';
import OrderForm from './components/forms/orderForm';
import CategoryForm from './components/forms/categoryForm';
import ProductUpdate from './components/forms/updateProduct';
import UpdatePurchase from './components/forms/updatePurchase'
import PurchaseList from './components/Purchase';
import SignInComponent from './components/auth/signIn';
import SignOutComponent from './components/auth/signOut';
import './App.css'
import CategoryList from './components/Categories';
import CategoryUpdateForm from './components/forms/updateCategory';
import DeleteCategory from './components/forms/deleteCategoryComponent';
import DeleteProduct from './components/forms/deleteProduct';
import DeletePurchase from './components/forms/deletePurchase';
import OrderItemList from './components/OrderItem';
import OrderUpdateForm from './components/forms/updateOrderItem';
import UpdateCustomer from './components/forms/updateCustomer';
import StockUpdateForm from './components/forms/updateStock';
import UpdateSupplier from './components/forms/updateSupplier';
import StockList from './components/Stock';
import CustomersInfo from './components/customerInfo';
import SuppliersInfo from './components/suppliersInfo';
import Table from './components/table';
import AdminDashboard from './components/Dashboard';
import NavBar from './components/Header';
function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <div className="app-container">
        <Routes>
          <Route path="/customer/form" element={<CustomerRegister />} />
          <Route path="/supplier/form" element={<SupplierRegister />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<OrderItemList />} />
          <Route path="/category" element={<CategoryList/>} />
          <Route path="/purchase/form" element={<PurchaseForm />} />
          <Route path="/product/form" element={<ProductForm />} />
          <Route path="/order/form" element={<OrderForm />} />
          <Route path="/category/form" element={<CategoryForm />} />
          {/* <Route path="/dashboard" element={ <Home />} /> */}
          <Route  path="/product/:id/update" element={<ProductUpdate />} />
          <Route path="/customer/:id/update" element={<UpdateCustomer />} />
          <Route path="/supplier/:id/update" element={<UpdateSupplier />} />
          <Route path="/stock/:id/update" element={<StockUpdateForm />} />
          <Route path="/product/:id/delete" element={<DeleteProduct />} />
          <Route path="/category/:id/update" element={<CategoryUpdateForm />} />
          <Route path="/category/:id/delete" element={<DeleteCategory />} />
          <Route path="/purchase/:id/update" element={<UpdatePurchase />} />
          <Route path="/purchase/:id/delete" element={<DeletePurchase />} />
          <Route path="/order/:id/update" element={<OrderUpdateForm />} />
          <Route path="/purchase" element={<PurchaseList />} />
          <Route path="/stock" element={<StockList />} />
          <Route path="/customer" element={<CustomersInfo />} />
          <Route path="/inventory" element={<Table />} />
          <Route path="/supplier" element={<SuppliersInfo />} />
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signout" element={<SignOutComponent />} />
          <Route path="/" element={<AdminDashboard />} />
           
        </Routes>
        </div>
      <Footer/>
      </Router> 
    </>
  );
}

export default App;
