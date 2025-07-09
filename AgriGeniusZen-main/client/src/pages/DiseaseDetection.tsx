import { useState, useRef } from "react";
import { Link } from "wouter";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface DiseaseResult {
  name: string;
  confidence: number;
  description: string;
  treatment: string[];
  preventiveMeasures: string[];
  organicRemedies: string[];
  isSevere: boolean;
}

const DiseaseDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<DiseaseResult | null>(null);
  const [activeTab, setActiveTab] = useState<'treatment' | 'prevention'>('treatment');

  const scanMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const res = await apiRequest('POST', '/api/disease-detection', { image: imageData });
      return res.json();
    },
    onSuccess: (data) => {
      setScanResult(data);
      setIsScanning(false);
      toast({
        title: data.name ? "Disease Detected" : "No Disease Detected",
        description: data.name ? `Identified: ${data.name}` : "Your crop appears healthy!",
      });
    },
    onError: () => {
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
      // In a real app, we'd handle the error properly
      // For demo, we'll show mock data
      setScanResult({
        name: "Bacterial Leaf Blight",
        confidence: 89,
        description: "A bacterial disease causing yellow to white lesions along the leaf veins.",
        treatment: [
          "Drain the field and allow to dry when possible",
          "Apply copper-based bactericides as per recommended dose",
          "Remove and destroy infected plant debris"
        ],
        preventiveMeasures: [
          "Use disease-free seeds and seedlings",
          "Maintain proper spacing between plants for better air circulation",
          "Avoid excessive nitrogen fertilization"
        ],
        organicRemedies: [
          "Spray neem oil solution (5ml/liter of water) at weekly intervals",
          "Apply compost tea as a natural fungicide",
          "Introduce beneficial microorganisms to soil"
        ],
        isSevere: false
      });
    }
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const takePicture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the image data as base64
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Submit the image for scanning
      scanMutation.mutate(imageData);
    }
  };

  // Start camera on component mount
  useState(() => {
    startCamera();
    
    // Cleanup on unmount
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  });

  return (
    <div className="py-4">
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <h2 className="text-xl font-quicksand font-medium text-secondary-dark mb-4 flex items-center gap-2">
          <i className="ri-bug-line"></i> Disease Detection
        </h2>
        <p className="text-sm text-secondary-dark mb-6">
          Scan your crops to identify diseases, pests, and deficiencies with AI-powered analysis
        </p>
        
        <div className="relative rounded-xl overflow-hidden bg-black mb-4">
          <video
            ref={videoRef}
            className="w-full h-64 object-cover"
            autoPlay
            playsInline
          />
          
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={takePicture}
            disabled={isScanning}
            className="flex items-center gap-2 px-6 py-3 bg-primary rounded-full text-white text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            <i className="ri-camera-line"></i> Scan For Disease
          </button>
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all">
              <i className="ri-arrow-left-line"></i> Back
            </button>
          </Link>
        </div>
      </div>
      
      {scanResult && (
        <div className="glass rounded-2xl p-5 shadow-glass">
          <div className={`rounded-xl p-4 mb-4 ${scanResult.name ? (scanResult.isSevere ? 'bg-red-100' : 'bg-yellow-50') : 'bg-green-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                scanResult.name 
                  ? (scanResult.isSevere ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-700')
                  : 'bg-green-200 text-green-700'
              }`}>
                <i className={scanResult.name ? "ri-bug-line" : "ri-heart-pulse-line"}></i>
              </div>
              <div>
                <h3 className="font-medium text-secondary-dark">
                  {scanResult.name || "No Disease Detected"}
                </h3>
                <p className="text-xs text-secondary-dark opacity-75">
                  {scanResult.name 
                    ? `Confidence: ${scanResult.confidence}% - ${scanResult.isSevere ? 'Severe Case' : 'Mild Case'}`
                    : "Your crop appears healthy!"
                  }
                </p>
              </div>
            </div>
            
            {scanResult.name && (
              <p className="text-sm text-secondary-dark mb-3">
                {scanResult.description}
              </p>
            )}
          </div>
          
          {scanResult.name && (
            <>
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 py-2 text-sm font-medium ${activeTab === 'treatment' ? 'text-primary-dark border-b-2 border-primary' : 'text-secondary-dark'}`}
                  onClick={() => setActiveTab('treatment')}
                >
                  Treatment
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${activeTab === 'prevention' ? 'text-primary-dark border-b-2 border-primary' : 'text-secondary-dark'}`}
                  onClick={() => setActiveTab('prevention')}
                >
                  Prevention
                </button>
              </div>
              
              {activeTab === 'treatment' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center gap-1">
                      <i className="ri-leaf-line"></i> Organic Remedies (Recommended)
                    </h4>
                    <ul className="text-sm text-secondary-dark list-disc list-inside pl-2">
                      {scanResult.organicRemedies.map((remedy, index) => (
                        <li key={index}>{remedy}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-secondary-dark mb-2">Standard Treatment</h4>
                    <ul className="text-sm text-secondary-dark list-disc list-inside pl-2">
                      {scanResult.treatment.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'prevention' && (
                <div>
                  <h4 className="text-sm font-medium text-secondary-dark mb-2">Preventive Measures</h4>
                  <ul className="text-sm text-secondary-dark list-disc list-inside pl-2">
                    {scanResult.preventiveMeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-5 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/80 rounded-xl text-primary-dark border border-primary/30 text-sm font-medium">
                  <i className="ri-store-2-line"></i> Nearby Suppliers
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary rounded-xl text-white text-sm font-medium">
                  <i className="ri-download-2-line"></i> Download Report
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
