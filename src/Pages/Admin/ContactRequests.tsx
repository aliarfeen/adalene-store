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
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading inquiries...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-semibold text-[#a0785e] mb-8 text-center">
        Contact Inquiries
      </h1>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contact inquiries found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div
            className={`${
              contacts.length > 6 ? "max-h-[400px] overflow-y-auto" : ""
            }`}
          >
            <table className="min-w-full">
              <thead className="bg-[#a0785e] text-white sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">First Name</th>
                  <th className="py-3 px-4 text-left">Last Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={contact.firstName || index}
                    className="border-b hover:bg-[#f3eee8] transition-colors duration-150"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-700">{contact.firstName}</td>
                    <td className="py-3 px-4 text-gray-700">{contact.lastName}</td>
                    <td className="py-3 px-4 text-gray-700">{contact.email}</td>
                    <td className="py-3 px-4 text-gray-700">{contact.subject}</td>
                    <td className="py-3 px-4 text-gray-700">{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
