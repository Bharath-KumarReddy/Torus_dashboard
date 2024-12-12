
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import LoginPage from "./components/Loginpage";
import LandingPages from "./components/Dashboards/LandingPages";
import UserManagement from "./components/Dashboards/UserManagement/usermanagement";
import AnalyticsData from "./components/Dashboards/Analytics/AnalyticsData";
import ChartSection from "./components/Dashboards/Analytics/ChartSection";



const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<LandingPages />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/analytics-dashboard" element= {<AnalyticsData />} />
        <Route path="/chart-section" element={<ChartSection />} />
      </Routes>
    </Router>
    
  );
};

export default App;
