import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import toast, {Toaster} from "react-hot-toast";

const App = () => {

  

  return <div className="h-screen" data-theme="night">
    <button onClick={()=> toast.success("Hello World!")}>Create a toast</button>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/notification" element={<NotificationsPage/>}/>  
        <Route path="/call" element={<CallPage/>}/>  
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/onboarding" element={<OnboardingPage/>}/>
      </Routes>

      <Toaster/>
   
    </div>
};

export default App;
