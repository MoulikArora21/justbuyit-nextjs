"use client";

const Footer = () => {
  return (
    <div className="mega-footer">
      <div className="footer-bg">
        <h1 className="footer-bg-text">JustBuyIt!</h1>
      </div>
      <div className="footer-wrapper">
        <div className="footer-section">
          <div className="footer-section-heading">
            <h1>About Us</h1>
          </div>
          <div className="footer-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            tempora delectus fuga recusandae earum reiciendis dignissimos,
            soluta id totam architecto?
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-section-heading">
            <h1>Contacts</h1>
          </div>
          <div className="footer-content">Phone: +371 26613241</div>
          <div className="footer-content">Email: moulikarora12@gmail.com</div>
        </div>
        <div className="footer-section">
          <div className="footer-section-heading">
            <h1>Socials</h1>
          </div>
          <div className="footer-content">Facebook</div>
          <div className="footer-content">Instagram</div>
          <div className="footer-content">X</div>
        </div>

        <div className="footer-bottom">
          <h2>
            <i className="ri-copyright-line"></i>JustBuyIt.com All Rights
            Reserved
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
