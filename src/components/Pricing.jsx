import { Button } from "@/components/ui/button";
import { texts } from "@/config/texts";
import { Camera, Palette } from "lucide-react";
import { useScrollTo } from "@/hooks/useScrollTo";

const Pricing = () => {
  const scrollToContact = useScrollTo('contact');

  return (
    <section className="py-20 px-4 bg-[#F8F4EF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-6 text-[#4C4C4C]">
          {texts.pricing.title}
        </h2>
        
        <p className="text-xl text-center mb-12 italic text-[#4C4C4C]">
          {texts.pricing.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 老照片修复卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="bg-[#F8F4EF] p-4 rounded-full">
                <Camera className="w-16 h-16 text-[#55A99C]" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-[#55A99C]">{texts.pricing.repair.title}</h3>
            <p className="text-lg text-center mb-6 font-extralight">{texts.pricing.repair.subtitle}</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {texts.pricing.repair.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-extralight">{item.name}</span>
                  <span className="font-semibold text-[#55A99C]">{item.price}</span>
                </div>
              ))}
            </div>
            
            <Button 
              className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-4 rounded-full text-lg mt-auto"
              onClick={scrollToContact}
            >
              {texts.pricing.repair.button}
            </Button>
          </div>
          
          {/* 手抄报设计卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="bg-[#F8F4EF] p-4 rounded-full">
                <Palette className="w-16 h-16 text-[#F57373]" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-[#F57373]">{texts.pricing.poster.title}</h3>
            <p className="text-lg text-center mb-6 font-extralight">{texts.pricing.poster.subtitle}</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {texts.pricing.poster.items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="font-extralight">{item.name}</span>
                  <span className="font-semibold text-[#F57373]">{item.price}</span>
                </div>
              ))}
            </div>
            
            <Button 
              className="bg-[#F57373] hover:bg-[#e06262] text-white py-4 rounded-full text-lg mt-auto"
              onClick={scrollToContact}
            >
              {texts.pricing.poster.button}
            </Button>
          </div>
        </div>
        
        <p className="text-xl text-center mt-12 italic text-[#4C4C4C]">
          {texts.pricing.footer}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
