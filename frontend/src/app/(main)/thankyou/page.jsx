'use client'

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_URL } from '@/app/config';

// Ek chhota component jo Suspense ke saath kaam karega
const ThankYouContent = () => {
    const searchParams = useSearchParams();
    const hasRun = useRef(false);

    const [paymentStatus, setPaymentStatus] = useState('processing'); // 'processing', 'succeeded', 'failed'
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // User data ko safely load karein
        const sessionData = sessionStorage.getItem('user');
        if (sessionData) {
            setCurrentUser(JSON.parse(sessionData).user);
        }

        // URL se payment details lein
        const redirectStatus = searchParams.get('redirect_status');
        const paymentIntentId = searchParams.get('payment_intent');

        const retrievePaymentIntent = async () => {
            try {
                const response = await fetch(`${API_URL}/payment/retrieve-payment-intent`, {
                    method: 'POST',
                    body: JSON.stringify({ paymentIntentId }),
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) throw new Error('Failed to retrieve payment details');
                return await response.json();
            } catch (err) {
                console.error(err);
                return null;
            }
        };

        const savePayment = async () => {
            const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
            const spaceDetails = JSON.parse(sessionStorage.getItem('spaceDetails'));
            
            // currentUser ko direct state se use karein
            if (!currentUser || !bookingDetails || !spaceDetails) {
                setPaymentStatus('failed');
                return;
            }
            
            const paymentDetails = await retrievePaymentIntent();
            if (!paymentDetails) {
                setPaymentStatus('failed');
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}/booking/addBooking`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        space: spaceDetails._id,
                        user: currentUser._id,
                        date: bookingDetails.date,
                        time: bookingDetails.time,
                        duration: bookingDetails.duration,
                        paymentDetails,
                        intentId: paymentIntentId,
                    })
                });
                
                if (response.status === 200) {
                    setPaymentStatus('succeeded');
                    // Zaroori nahi hai, par aacha hai ki use hone ke baad details clear kar dein
                    sessionStorage.removeItem('bookingDetails');
                    sessionStorage.removeItem('spaceDetails');
                } else {
                    setPaymentStatus('failed');
                }
            } catch (err) {
                console.error("Error saving booking:", err);
                setPaymentStatus('failed');
            }
        };

        if (redirectStatus === 'succeeded' && !hasRun.current && currentUser) {
            hasRun.current = true;
            savePayment();
        } else if (redirectStatus !== 'succeeded') {
            setPaymentStatus('failed');
        }

    }, [currentUser]); // currentUser load hone ke baad effect run karein

    if (paymentStatus === 'processing') {
        return <div className="text-center mt-20 text-xl font-semibold">Processing your payment...</div>;
    }

    if (paymentStatus === 'succeeded') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h1 className="text-4xl font-bold text-gray-800">Payment Successful!</h1>
                <p className="mt-2 text-lg text-gray-600">Thank you for your booking. Your space is confirmed.</p>
                <Link href="/user/order" className="mt-8 btn-primary">
                    View My Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">Payment Failed</h1>
            <p className="mt-2 text-lg text-gray-600">Your payment was not successful. Please try again.</p>
            <p className="text-sm text-gray-500">If the problem persists, please contact support.</p>
            <Link href="/browse-space" className="mt-8 btn-secondary">
                Back to Spaces
            </Link>
        </div>
    );
};

// Main component jo Suspense ka istemal karega
const ThankYou = () => {
    return (
        <Suspense fallback={<div className="text-center mt-20 text-xl font-semibold">Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    )
}

export default ThankYou;