import React, { useState, useEffect } from 'react';
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
export const UpdateProducts = (props) => {
    const [product, setProduct] = useState([]);
    const [errormsg, setErrormsg] = useState(null);
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
      console.log("hbbh",product.name);
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
                      placeholder='name please'
                      
                      
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
                      <input type="text" class="form-control" id="color" placeholder="make it vibrant"
                      
                      
                      />
                    </div>

                    <div class="form-group">
                      <label for="Category">Category</label>
                        <select className='form-control form-control-sm' name='Category' 
                        >
                            <option value="0">Select From The Following</option>
                           
                        </select>
                    </div>

                    <div class="form-group">
                      <label for="Type">Type</label>
                      <input type="text" class="form-control" id="type" placeholder="List the type of your product"
                     
                      />
                    </div>

                  <div className="form-group">
                    <label for="exampleInputPrice1">Price</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      placeholder="0"
                     
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                     
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
