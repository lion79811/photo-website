import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import { texts } from "@/config/texts";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";
import { useImageError } from "@/hooks/useImageError";

const HeaderBanner = ({ onRepairClick, onPosterClick, onArrowClick }) => {
  const logoUrl = getImageUrl(images.header.logo);
  const handleImageError = useImageError();

  return (
    <section 
      id="header" 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-[#F8F4EF]"
    >
      <div className="max-w-4xl mx-auto bg-[#F8F4EF]">
        <div className="flex justify-center mb-8 my-[0px] mx-[0px]">
          <ImageAnnotation label="Logo">
            <img 
              src={logoUrl} 
              alt="TimeTots Logo"
              className="mx-auto w-64 h-64 object-contain"
              onError={(e) => handleImageError(e, 'logo', 256, 256)}
            />
          </ImageAnnotation>
        </div>
        <h1 className="text-4xl md:text-5xl font-extralight mb-6 text-[#4C4C4C]">
          {texts.header.title}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Button 
            className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-6 px-8 rounded-full text-lg"
            onClick={onRepairClick}
          >
            {texts.header.repairBtn}
          </Button>
          <Button 
            className="bg-[#F57373] hover:bg-[#e06262] text-white py-6 px-8 rounded-full text-lg"
            onClick={onPosterClick}
          >
            {texts.header.posterBtn}
          </Button>
        </div>
        <div className="mt-16 animate-bounce">
          <ArrowDown 
            className="mx-auto text-[#55A99C] h-10 w-10 cursor-pointer" 
            onClick={onArrowClick}
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderBanner;
