import { Button } from "@/components/ui/button";

const AuthButton = ({ children, onClick }) => {
  return (
    <Button 
      className="bg-[#55A99C] hover:bg-[#4a8c80] text-white py-3 px-6 rounded-full"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
