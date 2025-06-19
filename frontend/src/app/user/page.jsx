"use client";
import React from "react";

export default function Home() {
    return (
        <html lang="en">
            <body>
                <div className="netmeds-home">
                    {/* Header */}
                    <header className="header">
                        <div className="container">
                            <div className="header-content">
                                <div className="logo">
                                    <img src="/netmeds-logo.png" alt="Netmeds.com" />
                                </div>
                                <div className="search-container">
                                    <div className="location-selector">
                                        <span>Deliver to</span>
                                        <span className="pincode">110002</span>
                                        <i className="dropdown-icon">▼</i>
                                    </div>
                                    <div className="search-bar">
                                        <input type="text" placeholder="Search for medicine & wellness products..." />
                                        <button className="search-button">
                                            <i className="search-icon">🔍</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="user-actions">
                                    <div className="cart">
                                        <i className="cart-icon">🛒</i>
                                        <span>Cart</span>
                                    </div>
                                    <div className="sign-in">
                                        <i className="user-icon">👤</i>
                                        <span>Sign in / Sign</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Navigation */}
                    <nav className="main-nav">
                        <div className="container">
                            <ul className="nav-items">
                                <li className="nav-item">
                                    <img src="/medicine-icon.png" alt="" className="nav-icon" />
                                    <span>Medicine</span>
                                </li>
                                <li className="nav-item">
                                    <img src="/wellness-icon.png" alt="" className="nav-icon" />
                                    <span>Wellness</span>
                                </li>
                                <li className="nav-item">
                                    <img src="/lab-tests-icon.png" alt="" className="nav-icon" />
                                    <span>Lab Tests</span>
                                </li>
                                <li className="nav-item">
                                    <img src="/beauty-icon.png" alt="" className="nav-icon" />
                                    <span>Beauty</span>
                                    <i className="dropdown-icon">▼</i>
                                </li>
                                <li className="nav-item">
                                    <img src="/health-corner-icon.png" alt="" className="nav-icon" />
                                    <span>Health Corner</span>
                                    <i className="dropdown-icon">▼</i>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Hero Banner */}
                    <section className="hero-banner">
                        <div className="container">
                            <div className="banner-content">
                                <div className="offer-content">
                                    <div className="welcome-tag">
                                        <div className="welcome-offer">#WelcomeOffer</div>
                                        <div className="perkfect-deal">Perkfect Start Deal</div>
                                    </div>
                                    <div className="offer-details">
                                        <p className="first-order">Place your first order and get</p>
                                        <div className="discount">
                                            Flat <span className="percentage">25% off</span>
                                        </div>
                                        <div className="additional-offer">
                                            Up to <span className="cashback">10%</span> cash-in-wallet <span className="plus-icon">⊕</span> free shipping
                                        </div>
                                        <div className="promo-actions">
                                            <div className="promo-code">
                                                Code: <span className="code">NMSNEW</span>
                                            </div>
                                            <button className="shop-now">Shop now</button>
                                        </div>
                                        <p className="limited-offer">*Limited period offer</p>
                                    </div>
                                </div>
                                <div className="banner-image">
                                    <img src="/happy-customer.png" alt="Happy Customer" />
                                </div>
                            </div>
                        </div>
                        <div className="banner-indicators">
                            <span className="indicator active"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                            <span className="indicator"></span>
                        </div>
                    </section>

                    {/* Trending Today */}
                    <section className="trending-section">
                        <div className="container">
                            <h2 className="section-title">Trending Today</h2>
                            <div className="trending-products">
                                <div className="product-card">
                                    <img src="/omnigel.jpg" alt="Omnigel" />
                                </div>
                                <div className="product-card">
                                    <img src="/glow-getter.jpg" alt="Be The Glow Getter" />
                                </div>
                                <div className="product-card">
                                    <img src="/skincare.jpg" alt="Skincare Products" />
                                </div>
                                <div className="product-card">
                                    <img src="/ahaglow.jpg" alt="Ahaglow Personal Care" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Service Cards */}
                    <section className="services-section">
                        <div className="container">
                            <h2 className="section-title">Our Services</h2>
                            <div className="service-cards">
                                <div className="service-card patient-card">
                                    <div className="card-icon">👨‍⚕️</div>
                                    <h3>For Patients</h3>
                                    <p>Access your medical records, book appointments, and order prescriptions online.</p>
                                    <a href="#" className="learn-more">Learn More →</a>
                                </div>
                                <div className="service-card doctor-card">
                                    <div className="card-icon">🩺</div>
                                    <h3>For Doctors</h3>
                                    <p>Manage your practice, connect with patients, and access medical resources.</p>
                                    <a href="#" className="learn-more">Learn More →</a>
                                </div>
                                <div className="service-card store-card">
                                    <div className="card-icon">💊</div>
                                    <h3>Medical Stores</h3>
                                    <p>Register your pharmacy, manage inventory, and fulfill online orders.</p>
                                    <a href="#" className="learn-more">Learn More →</a>
                                </div>
                                <div className="service-card location-card">
                                    <div className="card-icon">📍</div>
                                    <h3>Find Nearby</h3>
                                    <p>Locate nearby pharmacies, hospitals, clinics, and healthcare facilities.</p>
                                    <a href="#" className="find-now">Find Now →</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <style jsx>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
        
        ul {
          list-style: none;
        }
        
        /* Header Styles */
        .header {
          background-color: #20B2AA;
          padding: 15px 0;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo img {
          height: 40px;
        }
        
        .search-container {
          display: flex;
          flex: 1;
          margin: 0 20px;
        }
        
        .location-selector {
          display: flex;
          align-items: center;
          background-color: white;
          padding: 8px 12px;
          border-radius: 4px 0 0 4px;
          border-right: 1px solid #ddd;
        }
        
        .pincode {
          color: #20B2AA;
          font-weight: bold;
          margin: 0 5px;
        }
        
        .dropdown-icon {
          font-size: 10px;
          color: #20B2AA;
        }
        
        .search-bar {
          flex: 1;
          position: relative;
        }
        
        .search-bar input {
          width: 100%;
          padding: 8px 40px 8px 15px;
          border: none;
          border-radius: 0 4px 4px 0;
          outline: none;
        }
        
        .search-button {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .user-actions {
          display: flex;
          align-items: center;
          color: white;
        }
        
        .cart, .sign-in {
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
        
        .cart-icon, .user-icon {
          margin-right: 5px;
        }
        
        /* Navigation Styles */
        .main-nav {
          background-color: #20B2AA;
          padding-bottom: 15px;
        }
        
        .nav-items {
          display: flex;
          justify-content: space-between;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          color: white;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .nav-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        
        /* Hero Banner Styles */
        .hero-banner {
          background-color: #581C87;
          color: white;
          padding: 30px 0;
          position: relative;
        }
        
        .banner-content {
          display: flex;
          align-items: center;
        }
        
        .offer-content {
          flex: 1;
        }
        
        .welcome-tag {
          background: linear-gradient(to right, #FF7E00, #FFD700);
          display: inline-block;
          padding: 15px;
          border-radius: 8px;
          transform: rotate(-6deg);
          margin-bottom: 20px;
        }
        
        .welcome-offer {
          font-size: 18px;
          font-weight: bold;
        }
        
        .perkfect-deal {
          font-size: 28px;
          font-weight: 800;
          color: #4C1D95;
        }
        
        .first-order {
          font-size: 18px;
          margin-bottom: 10px;
        }
        
        .discount {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .percentage {
          font-size: 48px;
          color: #FFD700;
        }
        
        .additional-offer {
          font-size: 24px;
          margin-bottom: 15px;
        }
        
        .cashback {
          font-size: 36px;
          color: #FFD700;
        }
        
        .plus-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: white;
          color: #581C87;
          border-radius: 50%;
          margin: 0 5px;
        }
        
        .promo-actions {
          display: flex;
          align-items: center;
          margin-top: 15px;
        }
        
        .promo-code {
          background-color: white;
          color: #4C1D95;
          padding: 8px 15px;
          border-radius: 50px;
          font-weight: bold;
          margin-right: 15px;
        }
        
        .code {
          color: #6B21A8;
        }
        
        .shop-now {
          background-color: #EC4899;
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .shop-now:hover {
          background-color: #DB2777;
        }
        
        .limited-offer {
          font-size: 14px;
          margin-top: 10px;
        }
        
        .banner-image {
          flex: 1;
          text-align: right;
        }
        
        .banner-image img {
          max-width: 100%;
          height: auto;
        }
        
        .banner-indicators {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
        }
        
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
        }
        
        .indicator.active {
          background-color: white;
        }
        
        /* Trending Section Styles */
        .trending-section {
          padding: 30px 0;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .trending-products {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 10px;
        }
        
        .product-card {
          min-width: 250px;
          height: 150px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .product-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Service Cards Styles */
        .services-section {
          padding: 40px 0;
          background-color: #f8f9fa;
        }
        
        .service-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .service-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }
        
        .patient-card .card-icon {
          background-color: #E0F2FE;
        }
        
        .doctor-card .card-icon {
          background-color: #DCFCE7;
        }
        
        .store-card .card-icon {
          background-color: #F3E8FF;
        }
        
        .location-card .card-icon {
          background-color: #FFEDD5;
        }
        
        .service-card h3 {
          padding: 15px 15px 5px;
          font-size: 18px;
          font-weight: 600;
        }
        
        .patient-card h3 {
          color: #0369A1;
        }
        
        .doctor-card h3 {
          color: #15803D;
        }
        
        .store-card h3 {
          color: #7E22CE;
        }
        
        .location-card h3 {
          color: #C2410C;
        }
        
        .service-card p {
          padding: 0 15px 15px;
          color: #666;
        }
        
        .service-card a {
          display: inline-block;
          margin: 0 15px 15px;
          font-weight: 500;
        }
        
        .patient-card a {
          color: #0284C7;
        }
        
        .doctor-card a {
          color: #16A34A;
        }
        
        .store-card a {
          color: #9333EA;
        }
        
        .location-card a {
          color: #EA580C;
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .banner-content {
            flex-direction: column;
          }
          
          .banner-image {
            margin-top: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }
          
          .search-container {
            width: 100%;
            margin: 15px 0;
          }
          
          .nav-items {
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .nav-item {
            flex: 1 0 auto;
          }
        }
      `}</style>
                </div>
            </body>
        </html>
    );
}