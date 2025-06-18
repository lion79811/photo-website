import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import { texts } from "@/config/texts";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";
import { useScrollTo } from "@/hooks/useScrollTo";

const ServiceShowcase = () => {
  const scrollToCases = useScrollTo('case-showcase');

  return (
    <section 
      id="service-showcase" 
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-16 text-[#4C4C4C]">
          {texts.services.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-[#F8F4EF]">
            <div className="flex justify-center mb-6">
              <ImageAnnotation label="服务图标">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=old%20photo%20restoration&width=100&height=100" 
                  alt="老照片修复" 
                  className="w-24 h-24 object-contain"
                />
              </ImageAnnotation>
            </div>
            <h3 className="text-2xl text-center mb-4 text-[#4C4C4C] font-bold">{texts.services.repair.title}</h3>
            <p className="text-lg text-center mb-6 font-extralight">{texts.services.repair.description}</p>
            <div className="flex justify-center">
              <Button 
                className="bg-[#55A99C] hover:bg-[#4a8c80] text-white"
                onClick={() => scrollToCases('repair')}
              >
                {texts.services.repair.detailBtn}
              </Button>
            </div>
          </div>
          
          <div className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-[#F8F4EF]">
            <div className="flex justify-center mb-6">
              <ImageAnnotation label="服务图标">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=handmade%20poster%20design&width=100&height=100" 
                  alt="手抄报设计" 
                  className="w-24 h-24 object-contain"
                />
              </ImageAnnotation>
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-[#4C4C4C]">{texts.services.poster.title}</h3>
            <p className="text-lg text-center mb-6 font-extralight">{texts.services.poster.description}</p>
            <div className="flex justify-center">
              <Button 
                className="bg-[#F57373] hover:bg-[#e06262] text-white"
                onClick={() => scrollToCases('poster')}
              >
                {texts.services.poster.detailBtn}
              </Button>
            </div>
          </div>
        </div>
        
        {/* 新增服务过程展示区域 */}
        <div className="mt-20">
          <h3 className="text-2xl text-center mb-10 text-[#4C4C4C] font-extralight">我们的服务过程</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ImageAnnotation label="咨询沟通">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=consultation,communication&width=300&height=200" 
                  alt="咨询沟通" 
                  className="mx-auto object-cover rounded-lg shadow-lg w-full h-48"
                />
              </ImageAnnotation>
              <h4 className="text-xl mt-4 mb-2">1. 咨询沟通</h4>
              <p className="text-gray-600">了解您的需求与期望</p>
            </div>
            
            <div className="text-center">
              <ImageAnnotation label="方案设计">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=design,sketch&width=300&height=200" 
                  alt="方案设计" 
                  className="mx-auto object-cover rounded-lg shadow-lg w-full h-48"
                />
              </ImageAnnotation>
              <h4 className="text-xl mt-4 mb-2">2. 方案设计</h4>
              <p className="text-gray-600">专业设计师精心创作</p>
            </div>
            
            <div className="text-center">
              <ImageAnnotation label="成品交付">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=delivery,smile&width=300&height=200" 
                  alt="成品交付" 
                  className="mx-auto object-cover rounded-lg shadow-lg w-full h-48"
                />
              </ImageAnnotation>
              <h4 className="text-xl mt-4 mb-2">3. 成品交付</h4>
              <p className="text-gray-600">满意后交付最终作品</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
