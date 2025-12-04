"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ProductPageLoading from "@/components/loading/ProductPageLoading";

const ProductPage = () => {
  const { productId } = useParams();
  const router = useRouter();
  const productPageRef = useRef<HTMLDivElement | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    const fetchProduct = () => {
      setLoading(true);
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            setLoading(false);
            setError("Product not found");
          }
          return response.json();
        })
        .then((data) => {
          if (!data || !data.id) {
            console.error("Invalid product data, redirecting to homepage");
            setError("Invalid product data");
            setLoading(false);
            return;
          }
          setCurrentProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
          setError("Error fetching product");
        });
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
    return <ProductPageLoading />;
  }

  if (error || !currentProduct) {
    return (
      <div className="product-page" ref={productPageRef}>
        <div className="error-state">
          <i className="ri-error-warning-line error-icon"></i>
          <h2 className="error-message">Product Not Found</h2>
          <p className="error-description">
            {error || "The product you are looking for does not exist."}
          </p>
          <button className="error-button" onClick={() => router.push("/")}>
            Back to Shop
          </button>
        </div>
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
