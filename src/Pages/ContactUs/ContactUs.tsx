import React, { useState } from "react";
import InputField from "../../Components/Forms/InputField2";
import { Button } from "../../Components/Common/Button";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);


      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#e8e3dc]">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl text-center mb-4 italic text-[#a0785e]">
          Inquiries
        </h1>

        <p className="text-center mb-12 text-gray-700">
          For questions regarding our products and services you can also <br />
          contact us by filling out the form below.
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                First Name <span className="text-[#a0785e]">*</span>
              </label>
              <InputField
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>


            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Last Name <span className="text-[#a0785e]">*</span>
              </label>
              <InputField
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Email <span className="text-[#a0785e]">*</span>
            </label>
            <InputField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Subject</label>
            <InputField
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

     
          <div>
            <label className="block text-sm mb-2 text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-0 py-2 border-b-2 border-[#a0785e] focus:outline-none focus:ring-0 resize-none bg-transparent"
            />
          </div>


          <div className="flex justify-center pt-4">
            <Button
            text="       Submit"
              onClick={handleSubmit}
              className="px-20 py-3 border-2 border-[#a0785e] text-[#a0785e] hover:bg-[#a0785e] hover:text-white transition-colors duration-200"
            />
       
       
          </div>

          {isSubmitted && (
            <div className="text-center text-green-600 font-medium">
              Thank you for your inquiry! We'll get back to you soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
