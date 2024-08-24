import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const AgeCalculator: React.FC = () => {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = () => {
    if (!birthdate) {
      setError("Please select a birthdate.");
      setAge(null);
      return;
    }

    const today = new Date();
    const birthDate = new Date(birthdate);

    if (birthDate > today) {
      setError("Birthdate cannot be in the future.");
      setAge(null);
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setError(null);
    setAge(age);
  };

  useEffect(() => {
    calculateAge();
  }, [birthdate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FFECB7] to-[#FFDDB5] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-brown">
          Age Calculator
        </h1>
        <div className="flex items-center border-b border-brown py-2 mb-4">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-dark-brown mr-3 h-6 w-6"
          />
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-brown text-lg text-brown"
            placeholder="Select your birthdate"
          />
        </div>
        {error && (
          <div className="flex items-center text-[#6C4E31] mb-4">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="mr-2 h-5 w-5"
            />
            <p>{error}</p>
          </div>
        )}
        <button
          onClick={calculateAge}
          className="w-full bg-gradient-to-r from-[#6C4E31]
           to-[#603F26] text-white py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
        >
          Calculate Age
        </button>
        {age !== null && !error && (
          <div className="mt-8 text-center">
            <p className="text-2xl text-brown">
              You are <span className="font-bold text-[#603F26]">{age}</span>{" "}
              years old.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
