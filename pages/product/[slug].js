import React, { useCallback, useEffect, useState } from "react";
import { urlFor, client } from "../../library/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useStateContext } from "../../context/StateContext";
import ImageViewer from "react-simple-image-viewer";

const ProductDetails = ({ products, product }) => {
  const { decQty, incQty, qty, onAdd } = useStateContext();
  const { image, name, details, price } = product;
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const stars = 5;
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const [images, setImages] = useState([]);
  useEffect(() => {
    image?.map((item, i) => setImages(urlFor(item)));
  }, [image]);
  console.log(image, images);
  return (
    <div>
      <div
        className="product-detail-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
              onClick={() => openImageViewer(index)}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                className={i === index ? "small-image x-image" : "small-image"}
                onMouseEnter={() => setIndex(i)}
                src={urlFor(item)}
              />
            ))}
          </div>
        </div>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
            closeOnClickOutside={true}
          />
        )}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {[...Array(stars)].map((i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">$ {price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span
                style={{
                  dysplay: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="minus"
                onClick={decQty}
              >
                <AiOutlineMinus color="#000" />
              </span>
              <span
                className="num"
                style={{
                  dysplay: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {qty}
              </span>
              <span
                className="plus"
                onClick={incQty}
                style={{
                  dysplay: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiOutlinePlus color="#000" />
              </span>
            </p>
          </div>
          <div className="buttons" style={{ dysplay: "flex", gap: "20px" }}>
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              Add to cart
            </button>
            <button className="buy-now" type="button">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { products, product },
  };
};

export default ProductDetails;
