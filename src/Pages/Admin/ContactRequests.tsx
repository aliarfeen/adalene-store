import React, { useEffect, useState } from "react";
import apiFactory from "../../Api/apiFactory";
import type { Contact } from "../../Types/Contact";

const ContactRequests: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactsData = async () => {
      try {
        const response = await apiFactory.fetchContacts();
        setContacts(response);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contact inquiries.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactsData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#faf8f6]">
        <p className="text-lg text-gray-600">Loading inquiries...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#faf8f6]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen  flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Received Messages
        </h1>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No messages found.</p>
        ) : (
          <div
            className={`space-y-4 ${
              contacts.length > 5 ? "max-h-[450px] overflow-y-auto" : ""
            }`}
          >
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 shadow-sm bg-[#fcfbfa]"
              >
                <div className="flex justify-between items-center mb-1">
                  <h2 className="font-medium text-gray-800">
                    {/* {contact.firstName} {contact.lastName}{" "} */}
                    {contact.email }
                  </h2>
                  {/* <span className="text-sm text-gray-400">
                    {new Date(contact.createdAt || Date.now()).toLocaleString()}
                  </span> */}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Subject:</span>{" "}
                  {contact.subject}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Message:</span>{" "}
                  {contact.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactRequests;
