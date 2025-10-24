import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import AdalenaLogo from "../Logo/Logo";
import { Button } from "../Common/Button";
import InputField from "../Forms/InputField2";

export const Footer = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit triggered");

    if (!formRef.current) {
      console.error("No form reference found");
      return;
    }

    setIsSending(true);
    setStatusMessage("");

    emailjs
      .sendForm(
        "service_luvpbsn",
        "template_yrrgn48",
        formRef.current,
        "erFneWtAsWyDpUKJ2"
      )
      .then(
        (result) => {
          console.log("EmailJS Success:", result.text);
          setIsSending(false);
          setStatusMessage("Thank you for subscribing!");
          formRef.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsSending(false);
          setStatusMessage("Failed to subscribe. Please try again later.");
        }
      );
  };

  return (
    <>
      <div className="bg-white border-gray-200 shadow-sm mt-3 h-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <div>
            <AdalenaLogo className="hover:opacity-80 transition-opacity cursor-pointer" />
          </div>

          {/* Links 1 */}
          <div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-thin md:space-y-8 md:flex-col md:mt-0 md:border-0">
              <Link to=""><li className="hover:text-orange-800">Shop All</li></Link>
              <Link to=""><li className="hover:text-orange-800">Our Story</li></Link>
              <Link to=""><li className="hover:text-orange-800">Our Craft</li></Link>
              <Link to="/gift"><li className="hover:text-orange-800">Gift Card</li></Link>
              <Link to=""><li className="hover:text-orange-800">Contact</li></Link>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-thin md:space-y-8 md:flex-col md:mt-0 md:border-0">
              <Link to=""><li className="hover:text-orange-800">FAQ</li></Link>
              <Link to=""><li className="hover:text-orange-800">Shipping & Returns</li></Link>
              <Link to=""><li className="hover:text-orange-800">Store Policy</li></Link>
              <Link to=""><li className="hover:text-orange-800">Payment Method</li></Link>
              <Link to=""><li className="hover:text-orange-800">Stockists</li></Link>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 md:space-y-8 md:flex-col md:mt-0 md:border-0 font-thin">
              <Link to=""><li className="hover:text-orange-800">Facebook</li></Link>
              <Link to=""><li className="hover:text-orange-800">Instagram</li></Link>
              <Link to=""><li className="hover:text-orange-800">Twitter</li></Link>
              <Link to=""><li className="hover:text-orange-800">Pinterest</li></Link>
            </ul>
          </div>

          {/* Subscription form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <ul className="flex flex-col p-4 md:p-0 mt-4 md:space-y-4 md:flex-col md:mt-0 md:border-0">
                <h1 className="font-bold hover:text-orange-800 outline-none">Join Us!</h1>

                <label className="font-thin" htmlFor="user_email">Email*</label>
                <InputField type="email" name="user_email" required />

                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="checkbox"
                    name="subscribe"
                    className="w-5 h-5 text-orange-800 border-gray-400 rounded cursor-pointer"
                    required
                  />
                  <label className="font-thin cursor-pointer">
                    Yes, subscribe me to your newsletter.
                  </label>
                </div>

                <Button
                  type="submit"
                  text={isSending ? "Sending..." : "Send"}
                  className="mt-3"
                  disabled={isSending}
                  onClick={() => console.log("🖱️ Button clicked")}
                />

                {statusMessage && (
                  <p className="mt-2 text-sm text-gray-600">{statusMessage}</p>
                )}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
