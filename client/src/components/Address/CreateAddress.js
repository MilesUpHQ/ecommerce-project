import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "../../utils/ajax-helper";
import "./address.css";
import AddressForm from "./AddressForm";
import SimpleNavBar from "../SimpleNavBar/SimpleNavBar";
import { useForm } from "react-hook-form";

const CreateAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <SimpleNavBar />
      <br />
      {
        <div style={{ marginLeft: "10%" }}>
          <AddressForm register={register} handleSubmit={handleSubmit} />
        </div>
      }
    </div>
  );
};

export default CreateAddress;
