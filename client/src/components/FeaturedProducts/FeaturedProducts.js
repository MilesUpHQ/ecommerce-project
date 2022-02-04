import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "../Navbar/Navbar";
import FeaturedProductsList from "./FeaturedProductsList";
import ErrorAlert from "./ErrorAlert";
import { Carousel } from "react-bootstrap";

const FeaturedProducts = () => {
	let [featuredProducts, setfeaturedProducts] = useState([]);
	const [currPage, setCurrPage] = useState(null);
	const [lastPage, setLastPage] = useState(null);
	const [totalPages, setTotalPages] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [imgArray, setimgArray] = useState([]);

	const handlePagination = (page) => {
		axios
			.get(`/products?page=${page}`)
			.then((res) => {
				setfeaturedProducts(res.data.featuredProducts);
				setimgArray(res.data.imgArray);
				setCurrPage(res.data.currPage);
			})
			.catch((err) => {
				setErrorMsg("Sorry! Something went wrong. Please Try again", err);
			});
	};
	useEffect(async () => {
		axios
			.get("/products")
			.then((res) => {
				setCurrPage(res.data.currPage);
				setLastPage(res.data.lastPage);
				setTotalPages(res.data.totalPages);
				setfeaturedProducts(res.data.featuredProducts);
				setimgArray(res.data.imgArray);
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
					{errorMsg && <ErrorAlert msg={errorMsg} />}
					<Carousel>
						{imgArray &&
							imgArray.map((imageUrl) => {
								return (
									<Carousel.Item interval={1000}>
										<img
											className="d-block w-100"
											src={imageUrl}
											className="imageSlide"
										/>
									</Carousel.Item>
								);
							})}
					</Carousel>

					<div className="mainContainer">
						<FeaturedProductsList
							featuredProducts={featuredProducts}
							currPage={currPage}
							lastPage={lastPage}
							totalPages={totalPages}
							handlePagination={handlePagination}
							setfeaturedProducts={setfeaturedProducts}
							setCurrPage={setCurrPage}
							imgArray={imgArray}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default FeaturedProducts;
