"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Stripe Promise ko component ke bahar initialize karein
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

// Payment form ko ek alag component banayein jo Elements ke andar render hoga
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);
    toast.loading('Processing payment...', { id: 'payment-toast' });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Payment complete hone ke baad user ko is URL par bhejein
        return_url: `${window.location.origin}/thankyou`,
      },
    });

    if (error) {
      // Aam taur par user yahan nahi aayega kyunki Stripe redirect kar dega.
      // Yeh error tab dikhega jab card details galat hon ya koi immediate error ho.
      toast.error(error.message, { id: 'payment-toast' });
    } else {
      toast.success("Payment initiated!", { id: 'payment-toast' });
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        type="submit" 
        className="w-full btn-primary mt-6"
      >
        <span>{isProcessing ? "Processing..." : "Pay Now"}</span>
      </button>
    </form>
  )
}

// Main checkout page component
const CheckoutPage = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
   
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setCurrentUser(JSON.parse(userSession).user);
    }

    fetch(`http://localhost:5500/space/getbyid/${id}`)
      .then(res => res.json())
      .then(data => setSpaceDetails(data))
      .catch(err => {
        console.error(err);
        toast.error("Could not load space details.");
      });
  }, [id]);

  useEffect(() => {
   
    if (currentUser && spaceDetails) {
      const customerData = {
        name: currentUser.name,
        email: currentUser.email,
       
      };

      fetch('http://localhost:5500/payment/create-payment-intent', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: spaceDetails.price, 
          customerData: customerData,
        }),
      })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Could not initialize payment.");
        setLoading(false);
      });
    }
  }, [currentUser, spaceDetails]); 

  if (loading || !spaceDetails) {
    return <div className="text-center mt-20 text-xl font-semibold">Preparing your checkout...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 p-8">
        {/* Left Side: Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center">
                    <img src={`http://localhost:5500/${spaceDetails.image}`} alt={spaceDetails.name} className="w-20 h-20 rounded-lg object-cover mr-4"/>
                    <div>
                        <p className="font-semibold">{spaceDetails.name}</p>
                        <p className="text-sm text-gray-500">{spaceDetails.address}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p>₹{spaceDetails.price.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-gray-600">Taxes & Fees</p>
                    <p>Calculated at next step</p>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                    <p>Total</p>
                    <p>₹{spaceDetails.price.toFixed(2)}</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            ) : (
              <p>Initializing payment gateway...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;