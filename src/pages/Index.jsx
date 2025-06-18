import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBanner from "@/components/HeaderBanner";
import CaseShowcase from "@/components/CaseShowcase";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  
  // 处理跳转到修复案例页面
  const handleRepairClick = () => {
    navigate('/#case-showcase?tab=repair');
  };
  
  // 处理跳转到手抄报案例页面
  const handlePosterClick = () => {
    navigate('/#case-showcase?tab=poster');
  };
  
  // 处理滚动到案例展示区域
  const scrollToCases = () => {
    const element = document.getElementById('case-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-700">
      <HeaderBanner 
        onRepairClick={handleRepairClick}
        onPosterClick={handlePosterClick}
        onArrowClick={scrollToCases}
      />
      
      <CaseShowcase />
      <Testimonials />
      <Pricing />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
