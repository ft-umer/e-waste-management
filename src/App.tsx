import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import LocationsPage from "./pages/LocationsPage";
import EducationPage from "./pages/EducationPage";
import PickupRequestPage from "./pages/PickupRequestPage";
import SignInPage from "./pages/SignInPage";
import ListWastePage from "./pages/waste/ListWastePage";
import RecycleFormPage from "./pages/waste/RecycleFromPage";
import BuyFormPage from "./pages/waste/BuyFormPage";
import SeminarsPage from "./pages/seminar/SeminarsPage";
import CreateSeminarPage from "./pages/seminar/CreateSeminarPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import DashboardPage from "./pages/DashBoardPage";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/services/pickup"
              element={
                <PrivateRoute>
                  <PickupRequestPage />
                </PrivateRoute>
              }
            />
            <Route path="/locations" element={<LocationsPage />} />
            <Route
              path="/waste"
              element={
                <PrivateRoute>
                  <ListWastePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seminars"
              element={
                <PrivateRoute>
                  <SeminarsPage />
                </PrivateRoute>
              }
            />
            <Route path="/education" element={<EducationPage />} />
            <Route
              path="/waste/recycle/:id"
              element={
                <PrivateRoute>
                  <RecycleFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/waste/buy/:id"
              element={
                <PrivateRoute>
                  <BuyFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seminars/new"
              element={
                <PrivateRoute>
                  <CreateSeminarPage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
