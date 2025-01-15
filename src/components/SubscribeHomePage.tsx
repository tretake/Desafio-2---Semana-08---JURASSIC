import React, { useState } from "react";
import Button from "./Button";

const SubscribeHomePage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ email: "", name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors = { email: "", name: "" };
    let isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (name.length <= 1 || /\d/.test(name)) {
      newErrors.name =
        "Name must be at least 2 characters and not contain numbers.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center px-[170px]  gap-16 bg-[#FFFCFC] py-[49px]  ">
      {/* Left Side */}
      <div className="flex flex-col gap-6 min-w-[241px] ">
        <h2 className="text-[#160A60] text-2xl/[48px] md:text-[40px] font-bold">
          Subscribe to Updates
        </h2>
        <p className="text-[#160A60] text-sm md:text-base text-left">
          Stay informed with our latest updates
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center gap-10 w-[353px] md:w-[520px]">
        {/* Email Row */}
        <div className="max-w-[404px] w-full">
          <label className="text-[#160A60] text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-[#00000080] rounded-lg w-full h-9 px-3 outline-none"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <p className="text-[#00000080]  text-xs mt-1">
            We promise not to spam.
          </p>
        </div>

        {/* Name Row */}
        <div className="w-full max-w-[404px]">
          <label className="text-[#160A60] text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border border-opacity-50 rounded-lg w-full h-9 px-3 outline-none"
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>

        <div className="w-full flex justify-center lg:justify-start  max-w-[404px] ">
          <Button
            label="Subscribe"
            kind="primary"
            type="button"
            size="sm-subscribe"
            onClick={handleSubmit}
          />
        </div>
      </div>
      {/* Subscribe Button */}

      {/* Modal Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold">
              Thank you for subscribing!
            </h3>
            <p className="mt-4 text-sm">
              You will start receiving updates to the email address you
              provided.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-6 py-2 rounded-lg bg-[#1E293B] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribeHomePage;
