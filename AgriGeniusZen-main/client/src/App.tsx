import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ScanCrops from "@/pages/ScanCrops";
import CropSuitability from "@/pages/CropSuitability";
import DiseaseDetection from "@/pages/DiseaseDetection";
import WeatherInsights from "@/pages/WeatherInsights";
import GovernmentSchemes from "@/pages/GovernmentSchemes";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scan" component={ScanCrops} />
      <Route path="/crop-suitability" component={CropSuitability} />
      <Route path="/disease-detection" component={DiseaseDetection} />
      <Route path="/weather" component={WeatherInsights} />
      <Route path="/government-schemes" component={GovernmentSchemes} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
