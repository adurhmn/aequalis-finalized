//Third Party Imports
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

//Local Imports
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import store from "./store/store";
import NetworksPage from "./pages/NetworksPage";
import UserPage from "./pages/UserPage";
import theme from "./ui/theme";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home/users" element={<UsersPage />} />
            <Route path="/home/networks" element={<NetworksPage />} />
            <Route path="/home/user/:id" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
