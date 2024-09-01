import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Ensure this file has the required styles

function App() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (email.trim() === "") {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8100/api/files/email/${email}`
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError("No data found for the provided email.");
        setData([]);
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClearClick = () => {
    setEmail("");
    setData([]);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Skill Checker
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and click "Fetch Skills" to see your skills.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="w-full sm:w-80">
            
            
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 w-full shadow-sm"
            />
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              onClick={fetchData}
            >
              Fetch Skills
            </button>
            <button
              className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105"
              onClick={handleClearClick}
            >
              Clear
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Please be patient as the fetching may take a while.
        </p>

        {loading && (
          <div className="flex justify-center items-center h-32 mt-6">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-4 mb-6 text-lg">
            {error}
          </div>
        )}
        <ul className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <p className="text-center text-xl font-semibold text-gray-700 mb-6">
            Your Skills:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {data.length > 0 ? (
              data.map((item, index) => (
                <li
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                  key={index}
                >
                  {item}
                </li>
              ))
            ) : (
              !loading && !error && (
                <p className="text-center text-gray-500">No skills found.</p>
              )
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
