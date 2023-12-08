import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css'
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { accessToken } = useAuth()
  return (
    <div className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/customer/form/" className="nav-link">Customer</Link>
          </li>
          <li className="nav-item">
            <Link to="/supplier/" className="nav-link">Supplier</Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/product/" className="nav-link">Product</Link>
          </li>
          <li className="nav-item">
            <Link to="/purchase/form/" className="nav-link">Purchase Form</Link>
          </li>
          <li className="nav-item">
            <Link to="/product/form/" className="nav-link">Product Form</Link>
          </li>
          <li className="nav-item">
            <Link to="/order/form/" className="nav-link">Order Form</Link>
          </li>
          <li className="nav-item">
            <Link to="/category/form/" className="nav-link">Category Form</Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/dashboard/" className="nav-link">Home</Link>
          </li> */}
          {accessToken ?(<li className="nav-item">
            <Link to="/signout/" className="nav-link">SignOut</Link>
          </li>):(<li className="nav-item">
            <Link to="/signin/" className="nav-link">SignIn</Link>
          </li>
          )}
          
          
        </ul>
      </nav>
    </div>
  );
}

export default Header;