import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";

const FormForProducts = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size , setSize] = useState("");
  const [color , setColor] = useState("");
  const [type , setType] = useState("");
  const [categories , setCategories] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  const [categoryid, setCategory] = useState('');

  //sending data after usestate dec part
  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("name", name);
    imageData.append("price", price);
    imageData.append("description", description);
    imageData.append("size", size);
    imageData.append("color", color);
    imageData.append("type", type);
    imageData.append("category", categoryid);
     console.log("Filedata:::",imageData);
    if (name == "") {
      setErrormsg("Name cannot be empty");
      return;
    }
    axios
      .post("/admin/add_products", 
        imageData
      )
      .then((res) => {
        console.log("ggggg", res);
        navigate("/display-products");
      })
      .catch((err) => {
        setErrormsg("Oppsie! Something went wrong. Please try entering valid datas");
      });
  };

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

  const fileChangeHandler = (e) => {
    console.log("target.files", e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>

                <form className="forms-sample" onSubmit={submitHandler}>
                  <div className="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageupload">Upload image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={fileChangeHandler}
                    />
                  </div>

                  <div class="form-group ">
                    <label for="exampleFormControlSelect3">Select Size</label>
                    <select className="form-control form-control-sm" id="exampleFormControlSelect3"
                        onChange={(e) => setSize(e.target.value)}>
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
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <label for="Category">Category</label>
                        <select value={categoryid} className='form-control form-control-sm' name='Category' 
                        onChange={(e) => setCategory(e.target.value)}>
                            <option value="0">Select From The Following</option>
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
                      <input type="text" class="form-control" id="type" placeholder="List the type of your product"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      />
                    </div>

                  <div className="form-group">
                    <label for="exampleInputPrice1">Price</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2021. Premium{" "}
            <a href="https://www.bootstrapdash.com/" target="_blank">
              Bootstrap admin template
            </a>{" "}
            from BootstrapDash. All rights reserved.
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Hand-crafted & made with{" "}
            <i className="ti-heart text-danger ml-1"></i>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default FormForProducts;
