import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "./Navbar";
import FeaturedProductsList from "./FeaturedProductsList";
import ErrorAlert from "./ErrorAlert";

const FeaturedProducts = () => {
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const images = [
    {
      url: "https://image.shutterstock.com/image-vector/welcome-poster-spectrum-brush-strokes-260nw-1146069941.jpg",
    },
    {
      url: "https://in.apparelresources.com/wp-content/uploads/sites/3/2020/07/Myntra-Fashion-brands.jpg",
    },
    {
      url: "https://static.toiimg.com/photo/msid-73928266/73928266.jpg",
    },
    {
      url: "https://media-exp1.licdn.com/dms/image/C511BAQG98tWEb3usAw/company-background_10000/0/1540729740206?e=2159024400&v=beta&t=m4VWC0NtZ0kMKloXcm4pNJTL6KLAGP2ZrKIIwZOcBMg",
    },
    {
      url: "https://static.magicpin.com/storage/blog/images/myntra-online-shopping-for-mens_Cover12.png",
    },
    {
      url: "https://www.indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2019/08/19/rao.jpg?itok=kMYIvYbR",
    },
  ];

  const handlePagination = (page) => {
    axios
      .get(`/featured_products?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };
  useEffect(async () => {
    axios
      .get("/featured_products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setfeaturedProducts(res.data.featuredProducts);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <div>
      {featuredProducts && (
        <div>
          <Navbar />
          <div style={{ width: "fit-content", height: "200px" }}>
            <SimpleImageSlider
              width="100%"
              height="90%"
              images={images}
              showBullets={true}
              autoPlay={true}
              style={{
                border: "solid 1px pink",
                marginTop: "60px",
              }}
            />
          </div>
          {errorMsg && <ErrorAlert msg={errorMsg} />}
          <div style={{ backgroundColor: "#fcf0e2" }}>
            <FeaturedProductsList
              featuredProducts={featuredProducts}
              currPage={currPage}
              lastPage={lastPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
              setfeaturedProducts={setfeaturedProducts}
              setCurrPage={setCurrPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
