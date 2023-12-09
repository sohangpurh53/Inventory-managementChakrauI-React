import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css'

const Footer = () => {
  return (
    <div className="footer-main">
      <nav className="footer">
        <ul className="footer-list">
          <li className="footer-item">
            <Link to="/" className="footer-link">Home</Link>
          </li>
         
          <li className="footer-item">
            <Link to="/product/" className="footer-link">Products</Link>
          </li>
         
          <li className="footer-item">
            <Link to="/category/" className="footer-link">Catergories</Link>
          </li>
          <li className="footer-item">
            <Link to="/order/" className="footer-link">Orders</Link>
          </li>
          <li className="footer-item">
            <Link to="/purchase/" className="footer-link">Purchase</Link>
          </li>
          <li className="footer-item">
            <Link to="/stock/" className="footer-link">Stocks</Link>
          </li>
          <li className="footer-item">
            <Link to="/customer/" className="footer-link">Customer</Link>
          </li>
         
          <li className="footer-item">
            <Link to="/supplier/" className="footer-link">Supplier</Link>
          </li>
         
          <li className="footer-item">
            <Link to="/inventory/" className="footer-link">Inventory</Link>
          </li>
         
        </ul>
      </nav>
    </div>
  );
}

export default Footer;
