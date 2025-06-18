import { texts } from "@/config/texts";

const Footer = () => {
  return (
    <footer 
      className="w-full bg-[#F8F4EF] py-5 text-center"
      style={{
        fontFamily: "'Source Han Sans', 'Noto Sans SC', sans-serif",
        fontWeight: 200
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p 
          className="text-[#888888] text-xs leading-[1.6]"
        >
          {texts.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
