import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com"; // ✅ Import EmailJS
import AdalenaLogo from "../Logo/Logo";
import { Button } from "../Common/Button";

export const Footer = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📨 Form submit triggered"); // debug log
    setIsSending(true);
    setStatusMessage("");

    if (!formRef.current) {
      console.error("❌ No form reference found");
      return;
    }

    emailjs
      .sendForm("service_luvpbsn", "template_yrrgn48", formRef.current, "erFneWtAsWyDpUKJ2")
      .then(
        (result) => {
          console.log("✅ EmailJS Success:", result.text); // debug log
          setIsSending(false);
          setStatusMessage("✅ Thank you for subscribing!");
          formRef.current?.reset();
        },
        (error) => {
          console.error("❌ EmailJS Error:", error); // debug log
          setIsSending(false);
          setStatusMessage("❌ Failed to subscribe. Please try again later.");
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

          {/* ✅ Newsletter Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <ul className="flex flex-col p-4 md:p-0 mt-4 md:space-y-4 md:flex-col md:mt-0 md:border-0">
                <h1 className="font-bold hover:text-orange-800 outline-none">Join Us!</h1>

                <label className="font-thin">Email*</label>
                <input
                  type="email"
                  name="user_email" // ✅ must match variable in EmailJS
                  required
                  className="border-0 border-b-2 border-solid border-orange-800 focus:outline-none focus:ring-0"
                />

                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="subscribe" className="text-orange-800" />
                  <label className="font-thin">Yes, subscribe me to your newsletter.</label>
                </div>

                <Button
                  type="submit"   // make sure it's submit
                  text={isSending ? "Sending..." : "Send"}
                  className="mt-3"
                  disabled={isSending}
                  onClick={() => console.log("🖱️ Button clicked")} // debug click
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
