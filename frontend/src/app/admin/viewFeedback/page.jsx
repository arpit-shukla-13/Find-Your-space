'use client';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import toast from 'react-hot-toast';
import { API_URL } from '@/app/config';
// Component name should be in PascalCase
const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch all feedback from the API
  const getFeedback = async () => {
    try {
      const res = await fetch(`${API_URL}/feedback/getall`);
      if (!res.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch feedback.");
    } finally {
      setLoading(false); // Stop loading once data is fetched or an error occurs
    }
  };

  // Function to delete a feedback entry
  const deleteFeedback = async (id) => {
    toast.loading('Deleting feedback...', { id: 'delete-toast' });
    try {
      const response = await fetch(`${API_URL}/feedback/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        toast.success('Feedback deleted successfully', { id: 'delete-toast' });
        // Optimistically update the UI by removing the deleted feedback from the state
        setFeedbackList(currentFeedback => currentFeedback.filter(feed => feed._id !== id));
      } else {
        toast.error('Failed to delete feedback', { id: 'delete-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred.', { id: 'delete-toast' });
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getFeedback();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Feedback...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-black text-3xl text-center my-4 font-bold'>
        View <span className='text-blue-700'>Feedback</span>
      </h1>

      {feedbackList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Comment</th>
                <th scope="col" className="px-6 py-3">Rating</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((feed) => (
                <tr key={feed._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {feed.name}
                  </th>
                  <td className="px-6 py-4">{feed.email}</td>
                  <td className="px-6 py-4 max-w-sm">{feed.comment}</td>
                  <td className="px-6 py-4">
                    <StarRatings
                      rating={feed.rating}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name='rating'
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteFeedback(feed._id)} className='font-medium text-red-600 hover:underline'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">No feedback has been submitted yet.</p>
      )}
    </div>
  );
};

export default ViewFeedback;