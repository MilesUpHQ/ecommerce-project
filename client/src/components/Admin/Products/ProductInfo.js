import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import "../../Common/css/admin-style.css";
import "../css/product.css";
import { useParams } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ProductInfo = () => {
  let { id } = useParams("id");
  const [product, setProduct] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  
  useEffect(() => {
    axios
      .get(`/admin/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

  const deleteVariant = (id,variantid, name)=>{
      if (window.confirm(`Are you sure you want to Delete this variant of ${name} Product?`)) {
        axios
          .delete("/delete/variant",{params: { variantid }})
          .then((res)=>{
            let newVariants = [...product];
            newVariants = newVariants.filter((xxx) => xxx.variant_id !== variantid);
            setProduct(newVariants);
          })
          .catch((err) => {
            setErrormsg(`Sorry! Couldn't delete this variant under ${name} product`);
          });
      }
    }

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-white">
            <li className="breadcrumb-item">
              <a href="/admin/products">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Info
            </li>
          </ol>
        </nav>
        <div id="leftCol" className="a-column a-span4 dp_aib_left_column_t1">
          <div className="image-space">
            <h2 className="pdp-title">{product.name}</h2>
            <h3 className="pdp-name">{product.description}</h3>
            {/* <img
              className="rounded-circle z-depth-2"
              alt="75x75"
              src={BASE_URL + "/" + product.image_url}
              data-holder-rendered="true"
            /> */}
          </div>
        </div>
        <div className="view-user p-5">
          <div className="row mb-5">
            <div className="col text-center">
              <h3>
                <b>Variant's Available</b>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    
                    <th scope="col">Size</th>
                    <th scope="col">Colour</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                { product.map((product) => (
                  <tr>
                    <td>{product.size}</td>
                    <td>{product.color}</td>
                    <td>{product.type}</td>
                    <td>{product.price}</td>
                    <td>
                    <a
                              href={`/admin/product/variant/${product.variant_id}/update`}
                              type="button"
                              className="btn btn-light btn-small mr-2"
                            >
                              <i className="fas fa-edit"></i> Edit
                     </a>
                     <a
                              type="button"
                               onClick={() =>
                                deleteVariant(
                                  product.id,
                                  product.variant_id,
                                  product.name
                                )
                              }
                              className="btn btn-danger btn-small mr-2"
                            >
                              <i className="fas fa-trash"></i> Variant
                            </a>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
