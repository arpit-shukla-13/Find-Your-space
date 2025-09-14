'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '@/app/config';


const ViewContact = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true); 

  
  const getContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/contact/getall`);
      if (!res.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await res.json();
      setContactList(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch contacts.");
    } finally {
      setLoading(false); 
    }
  };


  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_URL}/contact/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        toast.success('Contact deleted successfully');
       
        setContactList(currentContacts => currentContacts.filter(contact => contact._id !== id));
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred.');
    }
  };


  useEffect(() => {
    getContacts();
  }, []);


  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Contacts...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-black text-3xl text-center my-4 font-bold'>
        View <span className='text-blue-700'>Contacts</span>
      </h1>
      
      {contactList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Message</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact) => (
                <tr key={contact._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {contact.name}
                  </th>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.subject}</td>
                  <td className="px-6 py-4 max-w-sm truncate">{contact.message}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => deleteContact(contact._id)} 
                      className='font-medium text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">No contact messages found.</p>
      )}
    </div>
  );
};

export default ViewContact;