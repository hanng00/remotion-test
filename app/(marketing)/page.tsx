import Heading from "./components/heading";
import Footer from "./components/footer";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center flex-1 px-6">
        <Heading />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
