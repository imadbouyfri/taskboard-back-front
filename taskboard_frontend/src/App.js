import { Outlet, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'typeface-poppins';
import axios from "axios";

const styles = {
  sideBarOn: {
    marginTop: 55,
    marginLeft: 250,
    transition: '200ms',
  },
  sideBarOff: {
    marginTop: 55,
    marginLeft: 20,
    transition: '400ms',
  },
}

function App() {
  const [showSidebar, setShowSideBar] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const getListBoards = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get("http://127.0.0.1:3001/board/", config);
      const { status, message, data } = response;
      if (status !== 200) {
        alert(message, status);
      } else {
        console.log('setBoards(data);')
        return data
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <>
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        {user ? (
          <>
            <Header/>
            {user.role.toLowerCase() !== 'admin' ?
              <Sidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar} refreshBoards={getListBoards}/> :
              <AdminSidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar}/>}
            <div style={showSidebar ? styles.sideBarOn : styles.sideBarOff}>
              <Outlet/>
            </div>
          </>
        ) : (
          <Navigate to='login' replace/>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
