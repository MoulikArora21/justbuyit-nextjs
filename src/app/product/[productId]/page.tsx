"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";

const ProductPage = () => {
  const { productId } = useParams();
  const router = useRouter();
  const productPageRef = useRef<HTMLDivElement | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const mainImageRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: productPageRef });

  // Set navbar and body colors on mount
  useGSAP(() => {
    gsap.set(".navbar-wrapper", {
      backgroundColor: "black",
      borderColor: "white",
    });
    gsap.set("body", { backgroundColor: "black" });
    gsap.set(".navbar", { color: "white" });
  });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        );
        const data = await response.json();
        setCurrentProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [productId]);

  // Animate image change
  const handleImageChange = contextSafe((index: number) => {
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        onComplete: () => {
          setSelectedImage(index);
          gsap.to(mainImageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          });
        },
      });
    }
  });

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

  if (loading) {
    return (
      <div className="product-page" ref={productPageRef}>
        <div className="loading-spinner">LOADING...</div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="product-page" ref={productPageRef}>
        <div className="error-message">PRODUCT NOT FOUND</div>
      </div>
    );
  }

  return (
    <div className="product-page" ref={productPageRef}>
      <div className="product-wrapper">
        <div className="product-images">
          <div className="main-product-image-container">
            <img
              ref={mainImageRef}
              src={currentProduct.images[selectedImage]}
              alt={currentProduct.title}
              className="main-product-image"
            />
          </div>
          <div className="product-mini-images">
            {currentProduct.images.map((image, index) => (
              <div
                key={index}
                className={`selection ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => handleImageChange(index)}
              >
                <img src={image} alt={`${currentProduct.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-information">
          <div className="product-detail-category">
            {currentProduct.category.name}
          </div>
          <h1 className="product-detail-title">{currentProduct.title}</h1>
          <div className="product-detail-price">€ {currentProduct.price}</div>

          <div className="product-description">
            <h3 className="description-heading">DESCRIPTION</h3>
            <p className="description-text">{currentProduct.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-section">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
              >
                <i className="ri-subtract-fill"></i>
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                <i className="ri-add-large-line"></i>
              </button>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="buy-now-button" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>
          </div>

          <button className="back-button" onClick={() => router.back()}>
            <i className="ri-arrow-left-line"></i> BACK TO SHOP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
