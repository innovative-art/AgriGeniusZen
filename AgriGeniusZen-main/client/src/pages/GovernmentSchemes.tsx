import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Scheme {
  id: string;
  title: string;
  organization: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  deadline: string;
  applicationUrl: string;
  category: string;
  isNew: boolean;
  matchScore: number;
}

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { data: schemes, isLoading } = useQuery({
    queryKey: ['/api/government-schemes'],
    enabled: true,
  });
  
  // Mock schemes data
  const mockSchemes: Scheme[] = [
    {
      id: "1",
      title: "PM-KISAN",
      organization: "Ministry of Agriculture",
      description: "Financial assistance to small and marginal farmers through direct benefit transfer.",
      eligibility: ["Small and marginal farmers with up to 2 hectares", "Valid land records", "Bank account linked to Aadhaar"],
      benefits: ["₹6,000 per year in three equal installments", "Direct bank transfer", "No middlemen"],
      deadline: "30 Sep 2023",
      applicationUrl: "https://pmkisan.gov.in",
      category: "Financial Assistance",
      isNew: true,
      matchScore: 95
    },
    {
      id: "2",
      title: "Soil Health Card Scheme",
      organization: "Department of Agriculture",
      description: "Free soil testing and recommendations for appropriate nutrients to improve soil health and fertility.",
      eligibility: ["All farmers", "Valid ID proof", "Land ownership documents"],
      benefits: ["Free soil testing", "Customized fertilizer recommendations", "Increased crop yield"],
      deadline: "Ongoing",
      applicationUrl: "https://soilhealth.gov.in",
      category: "Technical Assistance",
      isNew: false,
      matchScore: 90
    },
    {
      id: "3",
      title: "Solar Pump Subsidy",
      organization: "Ministry of New and Renewable Energy",
      description: "Subsidy for installing solar-powered irrigation pumps to reduce dependency on diesel and electricity.",
      eligibility: ["Small and marginal farmers", "No existing solar pump", "Valid bank account"],
      benefits: ["Up to 90% subsidy on solar pump installation", "Reduced electricity costs", "Environment-friendly irrigation"],
      deadline: "15 Oct 2023",
      applicationUrl: "https://mnre.gov.in/solar-pump",
      category: "Irrigation",
      isNew: true,
      matchScore: 82
    },
    {
      id: "4",
      title: "Pradhan Mantri Fasal Bima Yojana",
      organization: "Ministry of Agriculture",
      description: "Crop insurance scheme to protect farmers from financial losses due to crop failure from natural calamities.",
      eligibility: ["All farmers growing notified crops", "Both loanee and non-loanee farmers", "Valid land records"],
      benefits: ["Insurance coverage for crop losses", "Low premium rates", "Quick claim settlements"],
      deadline: "Varies by crop season",
      applicationUrl: "https://pmfby.gov.in",
      category: "Insurance",
      isNew: false,
      matchScore: 88
    },
    {
      id: "5",
      title: "Organic Farming Certification Subsidy",
      organization: "APEDA",
      description: "Financial support for organic certification to promote organic farming practices.",
      eligibility: ["Farmers practicing organic farming", "Minimum 1 hectare land", "No use of chemical inputs for 3 years"],
      benefits: ["75% subsidy on certification cost", "Marketing support", "Training on organic practices"],
      deadline: "31 Dec 2023",
      applicationUrl: "https://apeda.gov.in/organic",
      category: "Organic Farming",
      isNew: false,
      matchScore: 75
    }
  ];
  
  const categories = ['All', 'Financial Assistance', 'Technical Assistance', 'Irrigation', 'Insurance', 'Organic Farming'];
  
  // Filter schemes based on search query and category
  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-4">
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <h2 className="text-xl font-quicksand font-medium text-secondary-dark mb-1 flex items-center gap-2">
          <i className="ri-government-line"></i> Government Schemes
        </h2>
        <p className="text-sm text-secondary-dark mb-5">
          Discover and apply for agricultural subsidies, grants and financial assistance
        </p>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search schemes by keyword..." 
            className="w-full rounded-xl py-3 px-5 pr-10 border-none ring-1 ring-gray-200 focus:ring-primary focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="ri-search-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-secondary-dark hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="glass rounded-xl p-4 border border-accent-light/30 mb-2">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-chat-voice-line text-accent-dark"></i>
            <p className="text-sm font-medium text-accent-dark">Ask verbally instead</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent/10 rounded-lg text-accent-dark text-sm font-medium hover:bg-accent/20 transition-all">
            <i className="ri-mic-line"></i> "What subsidies can I get for organic farming?"
          </button>
        </div>
      </div>
      
      <h3 className="font-quicksand font-medium text-secondary-dark mb-3 flex items-center gap-2">
        <i className="ri-award-line"></i> Recommended for Your Farm
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Finding relevant schemes...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="glass rounded-xl p-4 shadow-soft relative">
                {scheme.isNew && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                    New
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                    scheme.matchScore >= 90 ? 'bg-green-100 text-green-600' :
                    scheme.matchScore >= 80 ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <i className="ri-government-line"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-dark">{scheme.title}</h4>
                    <p className="text-xs text-secondary-dark opacity-75">{scheme.organization}</p>
                  </div>
                </div>
                
                <p className="text-sm text-secondary-dark mb-3">{scheme.description}</p>
                
                <div className="mb-3">
                  <p className="text-xs font-medium text-secondary-dark mb-1">Key Benefits:</p>
                  <ul className="text-xs text-secondary-dark list-disc list-inside">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-secondary-dark opacity-75">Application Deadline</p>
                    <p className="text-sm font-medium text-secondary-dark">{scheme.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary-dark opacity-75">Match Score</p>
                    <p className={`text-sm font-medium ${
                      scheme.matchScore >= 90 ? 'text-green-600' :
                      scheme.matchScore >= 80 ? 'text-blue-600' :
                      'text-gray-600'
                    }`}>{scheme.matchScore}%</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 text-center px-3 py-2 bg-white/80 rounded-lg text-secondary-dark text-xs font-medium border border-gray-200">
                    How to Apply
                  </button>
                  <a 
                    href={scheme.applicationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-primary rounded-lg text-white text-xs font-medium"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="glass rounded-xl p-6 text-center shadow-soft">
              <i className="ri-search-line text-3xl text-gray-400 mb-2"></i>
              <h4 className="font-medium text-secondary-dark mb-1">No Matching Schemes</h4>
              <p className="text-sm text-secondary-dark opacity-75">
                Try adjusting your search or explore different categories.
              </p>
            </div>
          )}
        </div>
      )}
      
      <Link href="/">
        <div className="mt-6 text-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all mx-auto">
            <i className="ri-arrow-left-line"></i> Back to Home
          </button>
        </div>
      </Link>
    </div>
  );
};

export default GovernmentSchemes;
