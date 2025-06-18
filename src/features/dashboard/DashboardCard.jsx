import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const DashboardCard = ({ title, value, icon, description }) => {
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="p-2 bg-gray-100 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <button className="text-sm text-[#55A99C] hover:underline">查看详情</button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
