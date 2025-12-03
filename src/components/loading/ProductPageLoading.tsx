const ProductPageLoading = () => {
  return (
    <div className="product-page-loading">
      <div className="product-wrapper-loading">
        <div className="product-images-loading">
          <div className="main-product-image-loading"></div>
          <div className="product-mini-images-loading"></div>
        </div>

        <div className="product-information-loading">
          <div className="product-detail-category-loading"></div>
          <div className="product-detail-title-loading"></div>
          <div className="product-detail-price-loading"></div>

          <div className="product-description-loading">
            <div className="description-heading-loading"></div>
            <div className="description-text-loading"></div>
          </div>

          <div className="product-actions-loading">
            <div className="quantity-section-loading"></div>

            <div className="action-buttons-loading">
              <div className="add-to-cart-button-loading"></div>
              <div className="buy-now-button-loading"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-button-loading"></div>
    </div>
  );
};

export default ProductPageLoading;
