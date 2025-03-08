import { Box } from "lucide-react";

const Header = () => {
return (
       <div className="flex items-center">
        <Box className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">ERP</span>
      </div>      
    );
};

export default Header;

