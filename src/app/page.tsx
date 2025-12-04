"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import Paginator from "@/components/common/Paginator";
import ProductCardLoading from "@/components/loading/ProductCardLoading";
import { Product } from "@/types/product";

const Home = () => {
  // Animation Refs and GSAP setup
  gsap.registerPlugin(ScrollTrigger);
  const page1Ref = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const productListRef = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({ scope: productListRef });
  const productRefs = useRef<Record<number, HTMLElement | null>>({});

  // State Variables
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const itemsPerPage = 9;
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // GSAP Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        delay: 1,
        ease: "linear",
      });
      tlRef.current = tl;
      tl.fromTo(
        ".marquee-row-1",
        {
          x: "50vw",
          duration: 10,
        },
        {
          x: "-80%",
          ease: "none",
          duration: 10,
        }
      );
      tl.fromTo(
        ".marquee-row-2",
        {
          x: "-80%",
          duration: 10,
        },
        {
          x: "10%",
          ease: "none",
          duration: 10,
        },
        0
      );
      tl.fromTo(
        ".marquee-row-3",
        {
          x: "50vw",
          duration: 10,
        },
        {
          x: "-80%",
          ease: "none",
          duration: 10,
        },
        0
      );
    },
    { scope: page1Ref }
  );

  // Scroll-triggered GSAP Animation to change navbar and body colors
  useGSAP(() => {
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: page1Ref.current,
        start: "top 100px",
        end: "+=2000",
        scrub: 2,
        pin: true,
      },
    });
    tl2.to(
      ".navbar-wrapper",
      {
        backgroundColor: "black",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );
    tl2.to(
      "body",
      {
        backgroundColor: "black",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );
    tl2.to(".navbar-wrapper", {
      color: "white",
      borderColor: "white",
      duration: 1,
      ease: "power2.inOut",
    });

    ScrollTrigger.create({
      trigger: page1Ref.current,
      start: "350%",
      onEnter: () => tlRef.current?.paused(true),
      onLeaveBack: () => tlRef.current?.paused(false),
    });
  });

  // Function to filter products based on current page
  const filterProductsByPage = (
    products: Product[],
    page: number,
    itemsPerPage: number
  ) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  // Function to Fetch All products from API
  const fetchProducts = () => {
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setFilteredData(fetchedData);
        setMaxPage(Math.ceil(fetchedData.length / itemsPerPage));
        setProductsToShow(filterProductsByPage(fetchedData, 1, itemsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update products to show when page changes
  useEffect(() => {
    setProductsToShow(filterProductsByPage(filteredData, page, itemsPerPage));
  }, [page, filteredData]);

  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter products based on debounced search term
  useEffect(() => {
    const filteredProducts = debouncedSearchTerm
      ? data.filter((product) =>
          product.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        )
      : data;
    setFilteredData(filteredProducts);
    setMaxPage(Math.ceil(filteredProducts.length / itemsPerPage));
    setPage(1);
  }, [debouncedSearchTerm]);

  // Handle product click to navigate to product detail page
  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <>
      <div>
        <div ref={page1Ref} className="page1">
          <div className="marquee-row marquee-row-1">
            <span className="marquee-text">
              <span className="highlight-letter">B</span>IG
            </span>
            <span className="marquee-text">SALE</span>
            <span className="marquee-text">SHOP</span>
            <span className="marquee-text">DEALS</span>
            <span className="marquee-text">TRENDING</span>
            <span className="marquee-text">PREMIUM</span>
            <span className="marquee-text">SALE</span>
            <span className="marquee-text">SHOP</span>
            <span className="marquee-text">BIG DEALS</span>
            <span className="marquee-text">TRENDING</span>
            <span className="marquee-text">FASHION</span>
            <span className="marquee-text">TODAY</span>
            <span className="marquee-text">
              FASHIO<span className="highlight-letter">N</span>
            </span>
          </div>
          <div className="marquee-row marquee-row-2">
            <span className="marquee-text">GREAT!</span>
            <span className="marquee-text">
              <span className="highlight-letter">O</span>FFERS
            </span>
            <span className="marquee-text">LIMITED</span>
            <span className="marquee-text">PREMIUM</span>
            <span className="marquee-text">OFFERS</span>
            <span className="marquee-text">DISCOUNT</span>
            <span className="marquee-text">LIMITED</span>
            <span className="marquee-text">EXCLUSIVE</span>
            <span className="marquee-text">PREMIUM</span>
            <span className="marquee-text">SHOP</span>
            <span className="marquee-text">OFFERS</span>
            <span className="marquee-text">
              FOR YO<span className="highlight-letter">U</span>
            </span>
          </div>

          <div className="marquee-row marquee-row-3">
            <span className="marquee-text">
              <span className="highlight-letter">Y</span>EAR ROUND
            </span>
            <span className="marquee-text">BEST</span>
            <span className="marquee-text">PRICES</span>
            <span className="marquee-text">TODAY</span>
            <span className="marquee-text">AWESOME</span>
            <span className="marquee-text">AMAZING</span>
            <span className="marquee-text">BEST</span>
            <span className="marquee-text">PRICE</span>
            <span className="marquee-text">TODAY</span>
            <span className="marquee-text">AWESOME</span>
            <span className="marquee-text">AMAZING</span>
            <span className="marquee-text">
              FLO<span className="highlight-letter">W</span>
            </span>
          </div>

          <div className="leftimage">
            <img className="main-image" src="./pants.png" alt="left image" />
            <img className="image-part1" src="./pants1.png" alt="" />
            <img className="image-part2" src="./pants2.png" alt="" />
            <img className="image-part3" src="./pants3.png" alt="" />
          </div>

          <div className="rightimage">
            <img className="main-image" src="./hoodie.png" alt="right image" />
            <img className="image-part1" src="./hoodie1.png" alt="" />
            <img className="image-part2" src="./hoodie2.png" alt="" />
            <img className="image-part3" src="./hoodie3.png" alt="" />
          </div>
        </div>
      </div>

      <div className="page2">
        <h1 className="products-heading" ref={productListRef}>
          BROWSE PRODUCTS
        </h1>

        <div className="products">
          <div className="search-bar">
            <input
              className="search-box"
              type="text"
              placeholder="SEARCH PRODUCTS..."
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
          <Paginator page={page} maxPage={maxPage} setPage={setPage} />
          {loading ? (
            <>
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductCardLoading key={index} />
              ))}
            </>
          ) : productsToShow.length === 0 ? (
            <div className="error-state">
              <i className="ri-search-line error-icon"></i>
              <h2 className="error-message">No Products Found</h2>
              <p className="error-description">
                We couldn't find any products matching your search. Try
                different keywords or browse all products.
              </p>
              <button
                className="error-button"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            productsToShow.map((product) => (
              <div
                key={product.id}
                ref={(el) => {
                  productRefs.current[product.id] = el;
                }}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h2 className="product-title" title={product.title}>
                    <span className="title-text">{product.title}</span>
                  </h2>
                  <p className="product-price">€ {product.price}</p>
                  <p className="product-category">{product.category.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <Paginator page={page} maxPage={maxPage} setPage={setPage} />
      </div>
    </>
  );
};

export default Home;
