import { useState,react } from "react";
import '../Design/dashboardpopup.css'



const DashboardPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="parent">
        <p>this is popup</p>
       
        
          
           
          
    
      </div>
    );
  };
  
  export default DashboardPopup;