import WelcomeSection from "@/components/WelcomeSection";
import ActionCards from "@/components/ActionCards";
import FieldOverview from "@/components/FieldOverview";
import MarketAndYieldSection from "@/components/MarketAndYieldSection";
import AIAssistant from "@/components/AIAssistant";

const Home = () => {
  return (
    <>
      <WelcomeSection />
      <ActionCards />
      <FieldOverview />
      <MarketAndYieldSection />
      <AIAssistant />
    </>
  );
};

export default Home;
