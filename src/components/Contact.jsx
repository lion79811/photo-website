import { texts } from "@/config/texts";
import { images } from "@/config/images";
import { getImageUrl } from "@/lib/imageUtils";
import ImageAnnotation from "@/components/ImageAnnotation";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 text-white bg-[#55a99c]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-16">
          {texts.contact.title}
        </h2>
        
        <div className="flex flex-col items-center justify-center">
          <div className="text-center w-full max-w-md">
            <ImageAnnotation label="微信二维码">
              <img 
                src={getImageUrl(images.contact.wechat)} 
                alt="微信二维码" 
                className="mx-auto object-cover w-48 h-48 mb-4"
              />
            </ImageAnnotation>
            <p className="font-extralight">{texts.contact.instruction}</p>
          </div>
        </div>
        
        <div className="mt-16 text-center text-xl italic">
          <p className="font-bold">{texts.contact.message}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
