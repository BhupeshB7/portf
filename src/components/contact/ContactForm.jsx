import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import CustomSelect from "./CustomSelect";
import "./CustomStyles.css";
import ContactCard from "./ContactCard";
import CBG from "../../assets/CBG.png";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [softwareOption, setSoftwareOption] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const apiUrl = process.env.REACT_APP_API_URL;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // const response = await axios.post(`http://localhost:5000/api/send-email`, data);
      const response = await axios.post(`https://portfolio-backend-red.vercel.app/api/send-email`, data);
      setSuccessMessage(response.data.message || "Message sent successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response.data.error ||
            "Sorry,Failed to send message. Try after some time"
        );
      } else {
        setErrorMessage(
          "Sorry, Failed to send message. Due to Technical Errors, Try after some time"
        );
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftwareOptionChange = (value) => {
    setSoftwareOption(value);
    setValue("softwareOption", value); // Register the value with react-hook-form
    if (value === "no") {
      setApplicationType(""); // Reset applicationType if "no" is selected
    }
  };

  const handleApplicationTypeChange = (value) => {
    setApplicationType(value);
    setValue("applicationType", value); // Register the value with react-hook-form
  };

  return (
    <div className="relative container mx-auto" id="contact">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat contact-bg"
        style={{ backgroundImage: `url(${CBG})`, zIndex: -1 }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-opacity-75">
        <div className="flex item-center justify-center">
          <ContactCard />
        </div>
        <div className="rounded-lg shadow-lg">
          <div>
            <h1 className="text-2xl text-purple-400">Contact Us</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formInput">
                <label>Name</label>
                <input
                  {...register("name", { required: "Name is required!" })}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address!",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="formInput">
                <label>Are you want to make a Software?</label>
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  onChange={handleSoftwareOptionChange}
                  placeholder="Select an option"
                />
                {errors.softwareOption && (
                  <p className="text-red-500">{errors.softwareOption.message}</p>
                )}
              </div>

              {softwareOption === "yes" && (
                <div className="formInput">
                  <label>Type of Application</label>
                  <CustomSelect
                    options={[
                      { value: "web", label: "Web Application (MERN)" },
                      {
                        value: "mobile",
                        label: "Mobile Application (React Native)",
                      },
                    ]}
                    onChange={handleApplicationTypeChange}
                    placeholder="Select application type"
                  />
                  {errors.applicationType && (
                    <p className="text-red-500">{errors.applicationType.message}</p>
                  )}
                </div>
              )}

              {(softwareOption === "yes" || softwareOption === "no") && (
                <>
                  <div className="formInput">
                    <label>Mobile No</label>
                    <input
                      {...register("mobileNo", {
                        required: "Mobile No is required!",
                      })}
                      placeholder="Enter your mobile number"
                      maxLength={10}
                      type="number"
                    />
                    {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
                  </div>

                  <div className="formInput">
                    <label>City</label>
                    <input
                      {...register("city", { required: "City is required!" })}
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                  </div>
                </>
              )}

              <div className="formInput">
                <label>Message</label>
                <textarea
                  rows={5}
                  {...register("message", { required: "Message is required!" })}
                  placeholder="Enter your message"
                />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
              </div>

              <button className="work-button flex justify-between items-center pl-5 pr-5 pt-1 pb-1" type="submit">
                {loading ? (
                  <>
                    Sending...{" "}
                    <BsFillSendArrowUpFill className="m-2" color="white" size="25px" />
                  </>
                ) : (
                  <>
                    Send <FiSend className="m-2" color="white" size="25px" />
                  </>
                )}
              </button> 
              <br/>
              {errorMessage && (
              <p className="errorMessage flex items-center justify-between gap-2 pr-4">
                <AiOutlineCloseCircle style={{ color: "red", marginLeft: "5px",}} />
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="successMessage flex items-center">
                <AiOutlineCheckCircle style={{ color: "green", marginLeft: "5px",}} />
                {successMessage}
              </p>
            )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
