import React from "react";
import Product from "../components/Product";
import Banner from "../components/Banner";
import { FooterBanner } from "../components/FooterBanner";
import { client } from "../library/client";

const Home = ({ products, bannerData }) => {
  const array = ["Porduct1 ", "Porduct2 ", "Porduct3 "];
  console.log(products);
  return (
    <>
      <Banner bannerData={bannerData} />
      <div className="main-container">
        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData },
  };
};

export default Home;
