import { useState, useEffect } from "react";
import "./buyerFormDetails.css";
import FormInput from "./BuyerFormInput";
import { useNavigate } from "react-router-dom";

const FormDetails = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    home: "",
  });

  const [data, setData] = useState([]);

  const addressOptions = data.map((item) => item.address);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username is required",
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
      placeholder: "Address",
      label: "Address",
      errorMessage: "Address is required",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: values.username,
      email: values.email,
      address: values.address,
      home: values.home,
    };

    try {
      const updatedItem = data.find((item) => item.address === values.home)

      if (updatedItem) {
        const updatedData = {
          ...updatedItem,
          interested: updatedItem.interested + 1,
        };
        console.log(updatedData)

        await fetch(`http://localhost:3000/data/${updatedData.id}`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: { "Content-Type": "application/json" },
        });
      }




      await fetch("http://localhost:3000/buyer", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      setValues({
        username: "",
        email: "",
        address: "",
        home: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        <div className="formInput">
          <label htmlFor="home">Choose Home</label>
          <select
            className="homelist"
            value={values.home}
            name="home"
            onChange={onChange}
          >
            {addressOptions.map((address, ind) => (
              <option key={ind} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
        <button className="formButton">Submit</button>
      </form>
    </div>
  );
};

export default FormDetails;
