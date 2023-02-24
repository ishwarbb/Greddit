import './App.css';
import LoginPage from './LoginPage';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import ProfilePage from './ProfilePage';
import LogOut from './LogOut';
import MySubGreddits from './MySubGreddits';
import SubGredditsPage from './SubGredditsPage';
import SavedPosts from './Saved';
import MSGInstanceBar from './MSGInstanceBar';
import MSGInstanceUsers from './MSGInstanceUsers';
import MSGInstanceJoinRequests from './JoinRequests';
import Stats from './Stats';
import Reported from './Reported';
import SG from './SG';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <div className="component">
          <Routes >
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/logout" element={<LogOut/>} />
            <Route path="/subgreddits/:id" element={<SG />} />
            <Route path="/subgreddits" element={<SubGredditsPage />} />
            <Route path="/mysubgreddits/:id/users" element={<MSGInstanceUsers />} />
            <Route path="/mysubgreddits/:id/joinrequests" element={<MSGInstanceJoinRequests />} />
            <Route path="/mysubgreddits/:id/stats" element={<Stats />} />
            <Route path="/mysubgreddits/:id/reported" element={<Reported />} />
            <Route path="/mysubgreddits/:id" element={<MSGInstanceBar />} />
            <Route path="/mysubgreddits" element={<MySubGreddits />} />
            <Route path="/saved" element={<SavedPosts />} />
            <Route path="/" element={<ProfilePage />} />
          </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
