import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(""); // State to hold the email input

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email.trim() !== "") {
          // Ensure email is not empty
          const response = await axios.get(
            `https://certificatehub-ocr-backend.onrender.com/api/files/email/${email}`
          );
          console.log(response);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]); // Run effect whenever email changes

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state when input changes
  };

  return (
    <>
  <h1 className="text-center text-3xl bg-gray-400 p-10 text">Check Your Skills</h1>
<br /><br />
  <div className="container mx-auto mt-10 px-4">
    <div className="bg-gray-200 p-8 rounded-lg shadow-md">
      <p className="text-center text-red-500 mb-4">
        Wait for 60 seconds after writing/Updating your complete email
      </p>
      <div className="flex items-center justify-center space-x-4">
        <label htmlFor="emailInput">Enter Email:</label>
        <input
          id="emailInput"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-400 flex-1"
        />
        <button
          className="border-2 border-gray-300 px-4 py-2 rounded-xl bg-white hover:bg-gray-100"
          onClick={() => setEmail("")}
        >
          Clear
        </button>
      </div>
      <p className="text-center text-red-500 mb-4">
        Rendering May Take A long As its Backend Deployed On render
      </p>
    </div>

    <ul className="mt-8 bg-gray-100 p-4 rounded-lg">
      <p className="text-center mb-4">Your Skills Will Appear Here</p>
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <li
            className="bg-gray-300 px-3 py-1 rounded-md shadow-sm"
            key={index}
          >
            {item}
          </li>
        ))}
        {
  data.length === 0 ? <p>Loading.....</p> : null
}
      </div>
    </ul>
  </div>
</>

  );
}

export default App;
