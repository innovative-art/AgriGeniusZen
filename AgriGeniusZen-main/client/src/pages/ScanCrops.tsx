import { useState, useRef } from "react";
import { Link } from "wouter";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const ScanCrops = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    crop: string;
    health: string;
    issues: string[];
    recommendations: string[];
  }>(null);

  const scanMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const res = await apiRequest('POST', '/api/scan', { image: imageData });
      return res.json();
    },
    onSuccess: (data) => {
      setScanResult(data);
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: "Your crop has been analyzed successfully",
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
        crop: "Rice",
        health: "Healthy",
        issues: [],
        recommendations: ["Continue current irrigation schedule", "Apply nitrogen in 5 days"]
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
          <i className="ri-scan-2-line"></i> Crop Scanner
        </h2>
        <p className="text-sm text-secondary-dark mb-6">
          Position your camera over crops to scan and analyze their health status, identify diseases, and get recommendations.
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
            <i className="ri-camera-line"></i> Capture & Analyze
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
              <i className="ri-leaf-line text-white"></i>
            </div>
            <div>
              <h3 className="font-quicksand font-medium text-secondary-dark">Scan Results</h3>
              <p className="text-xs text-secondary-dark opacity-75">Analysis complete</p>
            </div>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-secondary-dark">Identified Crop</p>
              <p className="text-sm font-medium text-primary-dark">{scanResult.crop} 🌾</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-secondary-dark">Health Status</p>
              <p className={`text-sm font-medium ${scanResult.health === 'Healthy' ? 'text-[#66BB6A]' : 'text-[#EF5350]'}`}>
                {scanResult.health}
              </p>
            </div>
            
            {scanResult.issues.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-secondary-dark mb-2">Detected Issues</p>
                <ul className="text-sm text-secondary-dark list-disc list-inside pl-2">
                  {scanResult.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium text-secondary-dark mb-2">Recommendations</p>
              <ul className="text-sm text-secondary-dark list-disc list-inside pl-2">
                {scanResult.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary rounded-full text-white text-sm font-medium shadow-sm hover:shadow-md transition-all">
              <i className="ri-file-list-3-line"></i> Detailed Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all">
              <i className="ri-history-line"></i> Scan History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanCrops;
