import React, { useState, useEffect } from 'react';
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
export const UpdateProducts = (props) => {
    const [product, setProduct] = useState([]);
    const [errormsg, setErrormsg] = useState(null);
    const [categories , setCategories] = useState([]);
    useEffect(() => {
        axios
          .get(`/product_info/${props.id}`)
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            setErrormsg("Sorry! Something went wrong. Please Try again");
          });
      }, []);
      useEffect(() => {
        axios
        .get("/admin/add_products")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          setErrormsg("Oopps! Something went wrong. Please Try again", err);
        });
      }, []);
  return (
    <div className="main-panel">
    <div className="content-wrapper">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/display-products">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Updation
          </li>
        </ol>
      </nav>
      <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>
                
                <form className="forms-sample" >
                  <div className="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={product.map(product=>(product.name))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageupload">Upload image</label>
                    <input
                      type="file"
                      name="image"
                      
                    />
                  </div>

                  <div class="form-group ">
                    <label for="exampleFormControlSelect3">Select Size</label>
                    <select className="form-control form-control-sm" id="exampleFormControlSelect3"
                       value={product.map(product=>(product.size))}
                       >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                 
                  <div class="form-group">
                      <label for="Color">Color</label>
                      <input type="text" class="form-control" id="color" 
                       value={product.map(product=>(product.color))}
                      />
                    </div>

                    <div class="form-group">
                      <label for="Category">Category</label>
                        <select className='form-control form-control-sm' name='Category'  >
                            <option value="0">Reselect From The Following</option>
                            {categories.map((Category) => {
                                return (
                                    <option  
                                    value={Category.id}>{Category.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div class="form-group">
                      <label for="Type">Type</label>
                      <input type="text" class="form-control" id="type"
                       value={product.map(product=>(product.type))}
                      />
                    </div>

                  <div className="form-group">
                    <label for="exampleInputPrice1">Price</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      value={product.map(product=>(product.price))}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                      value={product.map(product=>(product.description))} 
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">
                    Update
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>

    </div>
    </div>
  );
};
