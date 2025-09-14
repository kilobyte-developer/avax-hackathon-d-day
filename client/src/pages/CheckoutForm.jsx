import React, { useState } from "react";
import axios from "axios";
import { Shield, ArrowRight } from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    flightNumber: "",
    bookingDate: "",
    returnDate: "",
    ticketFile: null, // ✅ store actual file, not Cloudinary URL
  });

  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("store");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTheme") || "dark";
    }
    return "dark";
  });

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("dashboardTheme", newTheme);
  };

  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ just store file locally, don’t upload directly to Cloudinary
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, ticketFile: file });
  };

  // ✅ submit form data + file to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("flightNumber", formData.flightNumber);
      payload.append("bookingDate", formData.bookingDate);
      payload.append("returnDate", formData.returnDate);
      payload.append(
        "selectedPackage",
        localStorage.getItem("selectedPackage") || ""
      );

      if (formData.ticketFile) {
        payload.append("file", formData.ticketFile);
      }

      await axios.post("http://localhost:5000/api/checkout", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Checkout successful!");
      navigate("/dashboard/store");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-br from-[#F3F6F9] via-[#e8eef3] to-[#F3F6F9] text-[#38537a]"
          : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white"
      }`}
    >
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Checkout Form */}
      <div className="flex-1 py-8 px-6 lg:ml-0 flex items-center justify-center">
        <div
          className={`relative w-full max-w-lg rounded-2xl border backdrop-blur-sm p-6 shadow-xl ${
            theme === "light"
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
              : "bg-slate-800 border border-slate-700"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-6 ${
              theme === "light" ? LIGHT_HEADER_TEXT : "text-white"
            }`}
          >
            Flight Checkout
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ hidden input for selected package */}
            <input
              type="hidden"
              name="selectedPackage"
              value={localStorage.getItem("selectedPackage") || ""}
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />
            <input
              type="text"
              name="flightNumber"
              placeholder="Flight Number"
              value={formData.flightNumber}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />

            <label
              className={`block ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Date of Booking
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />

            <label
              className={`block ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Date of Return
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${
                theme === "light"
                  ? "border-[#E2E8F0]"
                  : "border-slate-700 bg-slate-900 text-white"
              }`}
              required
            />

            <label
              className={`block ${
                theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"
              }`}
            >
              Upload Ticket (Photo or PDF)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="w-full"
              required
            />

            {uploading && <p className="text-blue-600">Uploading...</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center space-x-2"
              disabled={uploading}
            >
              <Shield className="w-5 h-5" />
              <span>Complete Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
