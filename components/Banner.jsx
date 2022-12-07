import Link from "next/link";
import React from "react";
import { urlFor } from "../library/client";

const Banner = ({ bannerData }) => {
  return (
    <div className="hero-banner-container">
      <div className="main-container">
        <div className="hero-banner-info">
          <p className="beats-solo">{bannerData[0]?.smallText}</p>
          <h3>{bannerData[0]?.midText}</h3>
          <h1>{bannerData[0]?.largeText1}</h1>
        </div>
        <img
          className="hero-banner-image"
          src={urlFor(bannerData[0]?.image)}
          alt="headphones"
        />
        <div>
          <Link href={`/product/${bannerData[0]?.product}`}>
            <button type="button">{bannerData[0]?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{bannerData[0]?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
