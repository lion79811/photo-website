import { texts } from "@/config/texts";
import { images } from "@/config/images";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";

const AboutUs = () => {
  return (
    <section className="py-20 px-4 bg-[#f8f4ef]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-16 text-[#4C4C4C]">
          {texts.about.title}
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <ImageAnnotation label="团队合照">
              <img 
                src={getImageUrl(images.about.team)} 
                alt="团队合照" 
                className="mx-auto object-cover rounded-2xl shadow-lg w-full"
              />
            </ImageAnnotation>
          </div>
          
          <div className="md:w-1/2">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-[#60B7A5]">{texts.about.team.title}</h3>
              <p className="mb-2">{texts.about.team.founder}</p>
              <p>{texts.about.team.designers}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#60B7A5]">{texts.about.concept.title}</h3>
              <p className="mb-4 italic">
                {texts.about.concept.quote1}
              </p>
              <p className="italic">
                {texts.about.concept.quote2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
