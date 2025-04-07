'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react'; // Import useSession and signIn
import PricingPlans from '@/components/PricingPlanCard';
import { useRouter } from 'next/navigation';


const VirtualTryOn = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Use useSession instead of useAuth
  const [userImage, setUserImage] = useState(null);
  const [apparelImage, setApparelImage] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [apparelImagePreview, setApparelImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [matchingAnalysis, setMatchingAnalysis] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [polling, setPolling] = useState(false);
  const [pollIntervalId, setPollIntervalId] = useState(null);
  const [tryOnCount, setTryOnCount] = useState(0);
  const [showPricingPlans, setShowPricingPlans] = useState(false);

  // Load environment variables
  const UPLOAD_API_URL = process.env.NEXT_PUBLIC_UPLOAD_API_URL;
  const FITANALYSIS_API_URL = process.env.NEXT_PUBLIC_FITANALYSIS_API_URL;
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail || status !== 'authenticated') return;
    const storedCount = sessionStorage.getItem('tryOnCount');
    if (storedCount) {
      setTryOnCount(parseInt(storedCount));
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_TRYON_TRACK}?userEmail=${userEmail}`)
      .then((res) => {
        console.log('getrack API Response:', res.data); // Debugging
        const count = res.data.tryOnCount || 0;
        setTryOnCount(count);
        sessionStorage.setItem('tryOnCount', count);
      })
      .catch((err) => console.error('Error fetching try-on count:', err));
  }, [userEmail, status]);

  console.log('Rendering with tryOnCount:', tryOnCount);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      setUserImagePreview(URL.createObjectURL(file));
    }
  };

  const handleApparelImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApparelImage(file);
      setApparelImagePreview(URL.createObjectURL(file));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const uploadImageToGateway = async (imageFile, imageType) => {
    const base64 = await toBase64(imageFile);
    const contentType = imageFile.type;
    const fileName = imageFile.name;

    try {
      const response = await axios.post(UPLOAD_API_URL, {
        fileName,
        fileDataBase64: base64,
        contentType,
        imageType,
      });
      return response.data?.imageUrl; // Return the uploaded image URL
    } catch (err) {
      console.error('Error uploading image:', err);
      throw new Error('Failed to upload image.');
    }
  };

  const pollTryonStatus = (taskId) => {
    const API_STATUS_URL = `${process.env.NEXT_PUBLIC_FYUSEAPI}/process-tryon-result`;
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`${API_STATUS_URL}?taskId=${taskId}`);
        if (response.data.status === 'succeed') {
          clearInterval(intervalId);
          setPollIntervalId(null);
          setPolling(false);
          setResultImageUrl(response.data.generatedImageUrl);
          window.generatedImageUrl = response.data.generatedImageUrl;
        } else if (response.data.status === 'not_found') {
          console.log('Status not yet available. Still waiting...');
        } else {
          console.log('Still processing...');
        }
      } catch (err) {
        console.error('Polling error:', err);
        setError('Error checking try-on status.');
        clearInterval(intervalId);
        setPolling(false);
      }
    }, 5000);
    setPollIntervalId(intervalId);
    setPolling(true);
  };

// Handle Matching Analysis
const handleMatchingAnalysis = async () => {

  if (!userImage || !apparelImage) {
    setError("Please upload both user and apparel images.");
    return;
  }

  if (status !== 'authenticated') {
    alert("You need to log in to analyze fit.");
    signIn(); // Trigger sign-in flow
    return;
  }

  try {
    setLoading(true);
    setError(null);
    setMatchingAnalysis(null);

    // Upload images
    const userImageUrl = await uploadImageToGateway(userImage, "user");
    const apparelImageUrl = await uploadImageToGateway(apparelImage, "apparel");

    // Call the Matching Analysis API
    const response = await axios.post(FITANALYSIS_API_URL, {
      userImage: userImageUrl,
      apparelImageUrl: apparelImageUrl,
      userEmail: userEmail,
      analysisType: "direct",
    });

    if (response.data?.analysis?.analysisText) {
      setMatchingAnalysis(response.data.analysis.analysisText);
      router.push(`/virtual-tryon-result?matchingAnalysis=${encodeURIComponent(response.data.analysis.analysisText)}`);
    } else {
      setError("Matching Analysis failed.");
    }
  } catch (err) {
    console.error("Matching Analysis error:", err);
    setError(err.response?.data?.error || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

// Handle Virtual Try-On
const handleTryOn = async () => {

  if (!userImage || !apparelImage) {
    setError("Please upload both user and apparel images.");
    return;
  }

  if (status !== 'authenticated') {
    alert("You need to log in to generate a try-on result.");
    signIn(); // Trigger sign-in flow
    return;
  }
  
  if (tryOnCount >= 3) {
    setShowPricingPlans(true);
    return;
  }

  try {
    setLoading(true);
    setError(null);
    setResultImageUrl(null);

    // Upload images
    const userImageUrl = await uploadImageToGateway(userImage, "user");
    const apparelImageUrl = await uploadImageToGateway(apparelImage, "apparel");

    // Call the Virtual Try-On API
    const tryonResponse = await axios.post(`${API_BASE_URL}/tryon-image`, {
      person_image_url: userImageUrl,
      garment_image_url: apparelImageUrl,
      userEmail: userEmail,
      analysisType: "virtual",
    });

    if (tryonResponse?.data?.taskId) {
      setTaskId(tryonResponse.data.taskId);
      pollTryonStatus(tryonResponse.data.taskId);
      await axios.post(`${API_BASE_URL}/tryontrack`, { userEmail });
      setTryOnCount((prevCount) => prevCount + 1);
    }
  } catch (err) {
    console.error("Virtual Try-On error:", err);
    setError(err.response?.data?.error || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    return () => {
      if (pollIntervalId) clearInterval(pollIntervalId);
    };
  }, [pollIntervalId]);

  if (status === 'loading') {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Virtual Try-On</h1>
        <p className="text-white mt-2">Experience the perfect fit.</p>
      </header>
      {showPricingPlans ? (
        <PricingPlans onSelectPlan={(plan) => alert(`Plan selected: ${plan}`)} />
      ) : (
        <div className="bg-[#1a1a2f] w-full max-w-4xl rounded-lg shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-medium text-white text-center mb-4">
            Step 1: Upload Your Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-white mb-4">Your Photo</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleUserImageChange}
                className="hidden"
                id="userPhoto"
              />
              <label htmlFor="userPhoto" className="cursor-pointer">
                {userImagePreview ? (
                  <img
                    src={userImagePreview}
                    alt="User Preview"
                    className="mx-auto max-h-48 object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-48">
                    <p className="text-white">Click to upload</p>
                  </div>
                )}
              </label>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-white mb-4">Clothing Item</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleApparelImageChange}
                className="hidden"
                id="apparelPhoto"
              />
              <label htmlFor="apparelPhoto" className="cursor-pointer">
                {apparelImagePreview ? (
                  <img
                    src={apparelImagePreview}
                    alt="Apparel Preview"
                    className="mx-auto max-h-48 object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-48">
                    <p className="text-white">Click to upload</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleTryOn}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Generate Try-On Result
            </button>
            <button
              type="button"
              onClick={handleMatchingAnalysis}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 mt-4"
            >
              Analyze Fit
            </button>
          </div>
          <p className="text-sm mt-2 text-center text-white">
            You have used {tryOnCount} out of 3 try-ons this month.
          </p>
          {polling && !resultImageUrl && (
            <p className="text-yellow-500 text-center mt-4">Waiting for result... polling server.</p>
          )}
          {loading && <p className="text-gray-400 text-center animate-pulse">Processing...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      )}
      {resultImageUrl && (
        <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-medium text-gray-800 text-center">Step 2: Try-On Result</h2>
          <img
            src={resultImageUrl}
            alt="Try-On Result"
            className="rounded-lg shadow-md mx-auto max-h-96 object-contain"
          />
        </div>
      )}
      {matchingAnalysis && (
        <div className="mt-6 w-full max-w-4xl bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-800">Fit Analysis</h3>
          <p className="text-lg text-gray-600">{matchingAnalysis}</p>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
