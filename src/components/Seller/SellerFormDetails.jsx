import { useState } from "react";
import "./sellerFormDetails.css";
import FormInput from "./SellerFormInput";
import { useNavigate } from "react-router-dom";

const SellerFormDetails = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    bid: "",
    date: "",
    file: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username is required",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "House-Name, Address",
      label: "House-Name and Address",
      errorMessage:
        "Address is required",
      required: true,
    },
    {
      id: 4,
      name: "bid",
      type: "text",
      placeholder: "$",
      label: "Start Bid Amount",
      required: true,
      pattern: "^(0|[1-9][0-9]*)$",
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      label: "Auction Date and Time",
      required: true,
    },
    {
      id: 6,
      name: "file",
      type: "file",
      label: "Upload Image",
      accept:"image/*",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFile = values.file.split("\\").pop()
    // console.log(formattedFile)

    const body = {
      username : values.username,
      email : values.email,
      address : values.address,
      bid: values.bid,
      date : values.date,
      file : formattedFile,
      interested: 0
    } 

    try {
    await fetch("http://localhost:3000/data",{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type' : 'application/json'}
    })

    setValues({
      username: "",
      email: "",
      address: "",
      bid: "",
      date: "",
      file: "",
    });
    alert("Registration was Successful");
    navigate("/");

  } catch (error) {
    console.error("Registration Failed:", error);
  }

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="buyerForm">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="formButton">Submit</button>
      </form>
    </div>
  );
};

export default SellerFormDetails;
