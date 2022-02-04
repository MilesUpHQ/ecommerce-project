// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsByCategory.css";

export default function ProductsByCategory() {
	const [products, setProducts] = React.useState([]);
	const categoryId = useParams().category;
	console.log("categoryId", categoryId);
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`/products/category/${categoryId}`);
			setProducts(data);
		};
		fetchData();
	}, [categoryId]);

	return (
		<div>
			<h1>Products By Category</h1>
			<div className="row">
				{console.log(products)}
				{products.length > 0
					? products.map((product) => (
							<div className="col-md-4" key={product.id}>
								{console.log(product)}
								<div className="card mb-4 shadow-sm card-width">
									<img
										src={product.image_url}
										className="card-img-top card-img"
										alt="product"
									/>
									<div className="card-body">
										<p className="card-text">{product.name}</p>
										<div className="d-flex justify-content-between align-items-center">
											<p className="text-muted">${product.price}</p>
										</div>
									</div>
								</div>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}
