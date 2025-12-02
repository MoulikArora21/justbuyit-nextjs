"use client";
import Link from "next/link";
const Header = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link className="logo" href="/">
          JustBuyIt!
        </Link>

        <div className="middle">
          <div className="item">DISCOVER</div>
          <div className="item">TRENDING</div>
          <div className="item">OFFERS</div>
          <div className="item">CONTACT US</div>
        </div>

        <div className="end">
          <div className="notifs-logo">
            <i className="ri-notification-2-line"></i>
          </div>
          <div className="cart-logo">
            <i className="ri-shopping-cart-line"></i>
          </div>
          <div>
            <i id="account-logo" className="ri-user-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
