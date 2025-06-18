import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/config/images";
import { texts } from "@/config/texts";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";
import { useImageError } from "@/hooks/useImageError";

const RepairCase = ({ currentIndex, setCurrentIndex }) => {
  const handleImageError = useImageError();
  
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center">
          <h3 className="text-xl mb-4 text-[#4C4C4C] font-extralight">{texts.cases.repairBefore}</h3>
          <ImageAnnotation label="修复前案例">
            <img 
              src={getImageUrl(images.cases.repairBefore[currentIndex])} 
              alt="修复前照片" 
              className="mx-auto object-cover rounded-lg shadow-lg w-full max-w-md"
              onError={(e) => handleImageError(e, 'repair,before', 400, 400)}
            />
          </ImageAnnotation>
        </div>
        <div className="text-center">
          <h3 className="text-xl mb-4 text-[#4C4C4C] font-extralight">{texts.cases.repairAfter}</h3>
          <ImageAnnotation label="修复后案例">
            <img 
              src={getImageUrl(images.cases.repairAfter[currentIndex])} 
              alt="修复后照片" 
              className="mx-auto object-cover rounded-lg shadow-lg w-full max-w-md"
              onError={(e) => handleImageError(e, 'repair,after', 400, 400)}
            />
          </ImageAnnotation>
        </div>
      </div>
      <div className="text-center mt-6 text-xl font-light">
        {texts.cases.repairTitles[currentIndex]}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => setCurrentIndex((prev) => prev === 0 ? images.cases.repairBefore.length - 1 : prev - 1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6 text-[#55A99C]" />
        </button>
        <button 
          onClick={() => setCurrentIndex((prev) => prev === images.cases.repairBefore.length - 1 ? 0 : prev + 1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 text-[#55A99C]" />
        </button>
      </div>
      
      {/* 新增更多修复案例图片展示 */}
      <div className="mt-16">
        <h3 className="text-xl text-center mb-6 text-[#4C4C4C] font-extralight">更多修复案例</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.cases.repairAfter.slice(0, 6).map((img, index) => (
            <div key={index} className="text-center">
              <ImageAnnotation label={`修复案例 ${index + 1}`}>
                <img 
                  src={getImageUrl(img)} 
                  alt={`修复案例 ${index + 1}`} 
                  className="mx-auto object-cover rounded-lg shadow-lg w-full h-48"
                  onError={(e) => handleImageError(e, 'photo,restoration', 300, 200)}
                />
              </ImageAnnotation>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PosterCase = ({ currentIndex, setCurrentIndex }) => {
  const handleImageError = useImageError();
  
  return (
    <div className="relative">
      <div className="text-center">
        <ImageAnnotation label="手抄报案例">
          <img 
            src={getImageUrl(images.cases.poster[currentIndex])} 
            alt={texts.cases.posterTitles[currentIndex]} 
            className="mx-auto object-cover rounded-lg shadow-lg w-full max-w-md"
            onError={(e) => handleImageError(e, 'poster,design', 400, 400)}
          />
        </ImageAnnotation>
      </div>
      <div className="text-center mt-6 text-xl font-light">
        {texts.cases.posterTitles[currentIndex]}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => setCurrentIndex((prev) => prev === 0 ? images.cases.poster.length - 1 : prev - 1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6 text-[#F57373]" />
        </button>
        <button 
          onClick={() => setCurrentIndex((prev) => prev === images.cases.poster.length - 1 ? 0 : prev + 1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 text-[#F57373]" />
        </button>
      </div>
      
      {/* 新增更多手抄报案例图片展示 */}
      <div className="mt-16">
        <h3 className="text-xl text-center mb-6 text-[#4C4C4C] font-extralight">更多手抄报设计</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.cases.poster.slice(0, 6).map((img, index) => (
            <div key={index} className="text-center">
              <ImageAnnotation label={`手抄报设计 ${index + 1}`}>
                <img 
                  src={getImageUrl(img)} 
                  alt={`手抄报设计 ${index + 1}`} 
                  className="mx-auto object-cover rounded-lg shadow-lg w-full h-48"
                  onError={(e) => handleImageError(e, 'handmade,poster', 300, 200)}
                />
              </ImageAnnotation>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CaseShowcase = () => {
  const [activeTab, setActiveTab] = useState('repair');
  const [currentRepairIndex, setCurrentRepairIndex] = useState(0);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const location = useLocation();

  // 根据URL参数设置活动标签页
  useEffect(() => {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const tab = params.get('tab');
    if (tab === 'repair' || tab === 'poster') {
      setActiveTab(tab);
      
      // 确保滚动到正确位置
      setTimeout(() => {
        const element = document.getElementById('case-showcase');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <section 
      id="case-showcase" 
      className="py-20 px-4 bg-[#F8F4EF]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-10">
          <div className="flex border border-[#55A99C] rounded-full overflow-hidden">
            <button 
              className={`px-6 py-3 text-lg ${activeTab === 'repair' ? 'bg-[#55A99C] text-white' : 'text-[#4C4C4C]'}`}
              onClick={() => setActiveTab('repair')}
            >
              {texts.cases.repairTab}
            </button>
            <button 
              className={`px-6 py-3 text-lg ${activeTab === 'poster' ? 'bg-[#F57373] text-white' : 'text-[#4C4C4C]'}`}
              onClick={() => setActiveTab('poster')}
            >
              {texts.cases.posterTab}
            </button>
          </div>
        </div>
        
        {activeTab === 'repair' && (
          <RepairCase 
            currentIndex={currentRepairIndex} 
            setCurrentIndex={setCurrentRepairIndex} 
          />
        )}
        
        {activeTab === 'poster' && (
          <PosterCase 
            currentIndex={currentPosterIndex} 
            setCurrentIndex={setCurrentPosterIndex} 
          />
        )}
      </div>
    </section>
  );
};

export default CaseShowcase;
