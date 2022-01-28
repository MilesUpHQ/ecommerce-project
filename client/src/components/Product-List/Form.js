import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";


const Form = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [Categories, setCategories] = useState([]);
  const [image, setimage] = useState("");
  const[namee ,setnamee]=useState();
  const[fileData, setFileData] = useState([]);
  //const []
  useEffect(async () => {
    getCategories()
}, []);
const getCategories = async () => {
  try {
       axios.get('/admin/addproducts')
          .then(async (response) => {
              // console.log("getting users", response.data)
              setCategories(response.data)
          }).catch((err) => {
              console.log("erro in getting users")
          })
  } catch (error) {

  }
}

console.log(fileData)

//sending data after usestate dec part
  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    // data.append('file',fileData)
    imageData.append('name', namee);
    imageData.append('file', fileData);

    // console.log("Filedata",fileData)
    
    axios
    .post("/admin/addproducts", {
      name: name,
      price : price,
      description:description,
      imageData, 
    })
    .then((res) => {
      //console.log(res);
      
    })
    .catch((err) => {
      console.log("failed");
    });
}

const fileChangeHandler = (e) => {
  console.log("target.files",e.target.files[0]);
  setFileData(e.target.files[0]);
  };

// On file upload (click the upload button)
/*const onFileUpload = () => {

  // Create an object of formData
  const formData = new FormData();

  // Update the formData object
  formData.append(
    image
  )};*/


   return (
    <div className="main-panel">        
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Products</h4>
              <p className="card-description">
                Enter product details
              </p>
              <form className="forms-sample" onSubmit={submitHandler} >
                <div className="form-group">
                  <label for="exampleInputName1">Name</label>
                  <input type="text" className="form-control" id="exampleInputName1" placeholder="Name" value={name}  onChange={(e) => setname(e.target.value)}/>
                </div>
                <div className="form-group"  >

                <label htmlFor='imageupload' >Upload image</label>
                                <input type="file" name="image"  onChange={fileChangeHandler} />
                </div>

              
                                                    


                <div className="form-group">
                  <label for="exampleInputPrice1">Price</label>
                  <input type="integer" className="form-control" id="exampleInputPrice1" placeholder="0" value={price}  onChange={(e) => setprice(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea1">Description</label>
                  <textarea className="form-control" id="exampleTextarea1" rows="4" value={description}  onChange={(e) => setdescription(e.target.value)}></textarea>
                </div>
                <button type="submit"  className="btn btn-primary mr-2">Submit</button>
                <button className="btn btn-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <footer className="footer">
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="ti-heart text-danger ml-1"></i></span>
      </div>
    </footer>
   
  </div>
  
  
    )}


    export default Form;