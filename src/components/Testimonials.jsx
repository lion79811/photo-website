import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import { texts } from "@/config/texts";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useImageError } from "@/hooks/useImageError";
import { sanitize } from "@/lib/sanitize"; // 导入消毒函数

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollToContact = useScrollTo('contact');
  const handleImageError = useImageError();

  // 安全渲染HTML内容
  const renderComment = (html) => {
    return { __html: sanitize(html) };
  };

  return (
    <section className="py-20 px-4 bg-[#F8F4EF]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-16 text-[#4C4C4C]">
          {texts.testimonials.title}
        </h2>
        
        {/* 桌面端双列布局 */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          {texts.testimonials.testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full"
            >
              <div className="flex items-start mb-4">
                <ImageAnnotation label="用户头像">
                  <img 
                    src={getImageUrl(images.testimonials.avatars[index])} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => handleImageError(e, 'avatar', 100, 100)}
                  />
                </ImageAnnotation>
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.city}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#F57373] text-[#F57373]" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-grow mb-4">
                <p 
                  className="text-lg italic" 
                  dangerouslySetInnerHTML={renderComment(testimonial.comment)}
                />
              </div>
              
              {images.testimonials.images[index] && (
                <div className="mt-auto flex justify-center">
                  <ImageAnnotation label="评价配图">
                    <img 
                      src={getImageUrl(images.testimonials.images[index])} 
                      alt="评价配图" 
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      onError={(e) => handleImageError(e, 'testimonial', 100, 100)}
                    />
                  </ImageAnnotation>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* 移动端轮播布局 */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {texts.testimonials.testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex flex-col items-center mb-4">
                    <ImageAnnotation label="用户头像">
                      <div className="bg-[#55A99C] rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-2">
                        {testimonial.name.charAt(0)}
                      </div>
                    </ImageAnnotation>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-500">{testimonial.city}</p>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-[#F57373] text-[#F57373]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p 
                      className="text-lg italic text-center" 
                      dangerouslySetInnerHTML={renderComment(testimonial.comment)}
                    />
                  </div>
                  
                  {images.testimonials.images[index] && (
                    <div className="flex justify-center">
                      <ImageAnnotation label="评价配图">
                        <img 
                          src={getImageUrl(images.testimonials.images[index])} 
                          alt="评价配图" 
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          onError={(e) => handleImageError(e, 'testimonial', 100, 100)}
                        />
                      </ImageAnnotation>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {texts.testimonials.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? 'bg-[#55A99C]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => setCurrentIndex((prev) => prev === 0 ? texts.testimonials.testimonials.length - 1 : prev - 1)}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6 text-[#55A99C]" />
            </button>
            <button 
              onClick={() => setCurrentIndex((prev) => prev === texts.testimonials.testimonials.length - 1 ? 0 : prev + 1)}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6 text-[#55A99C]" />
            </button>
          </div>
        </div>
        
        {/* 底部行动号召 */}
        <div className="mt-16 text-center">
          <p className="text-xl mb-8 italic text-[#4C4C4C]">
            {texts.testimonials.cta}
          </p>
          <div className="flex justify-center">
            <Button 
              className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-4 px-8 rounded-full text-lg"
              onClick={scrollToContact}
            >
              {texts.testimonials.contactBtn}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
