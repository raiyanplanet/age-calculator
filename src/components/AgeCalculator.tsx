import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const AgeCalculator: React.FC = () => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);
  const [dayError, setDayError] = useState<string | null>(null);
  const [monthError, setMonthError] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);

  const validateInput = () => {
    let isValid = true;

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Reset errors
    setDayError(null);
    setMonthError(null);
    setYearError(null);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      setDayError("Please enter a valid day.");
      isValid = false;
    }

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      setMonthError("Please enter a valid month.");
      isValid = false;
    }

    if (
      isNaN(yearNum) ||
      yearNum < 1900 ||
      yearNum > new Date().getFullYear()
    ) {
      setYearError("Please enter a valid year.");
      isValid = false;
    }

    return isValid;
  };

  const calculateAge = () => {
    if (!validateInput()) {
      setAge(null);
      return;
    }

    const today = new Date();
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    if (birthDate > today) {
      setYearError("Birthdate cannot be in the future.");
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FFECB7] to-[#FFDDB5] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-brown">
          Age Calculator
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-brown font-semibold mb-1">Day</label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`w-full bg-[#FFF7EB] focus:bg-white border border-brown rounded-lg px-4 py-3 text-lg text-brown focus:outline-none focus:ring-2 focus:ring-brown shadow-sm transition-all ${
                dayError ? "border-red-500" : ""
              }`}
              placeholder="Enter day"
            />
            {dayError && (
              <p className="text-red-500 text-sm mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                {dayError}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-brown font-semibold mb-1">Month</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`w-full bg-[#FFF7EB] focus:bg-white border border-brown rounded-lg px-4 py-3 text-lg text-brown focus:outline-none focus:ring-2 focus:ring-brown shadow-sm transition-all ${
                monthError ? "border-red-500" : ""
              }`}
              placeholder="Enter month"
            />
            {monthError && (
              <p className="text-red-500 text-sm mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                {monthError}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-brown font-semibold mb-1">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`w-full bg-[#FFF7EB] focus:bg-white border border-brown rounded-lg px-4 py-3 text-lg text-brown focus:outline-none focus:ring-2 focus:ring-brown shadow-sm transition-all ${
                yearError ? "border-red-500" : ""
              }`}
              placeholder="Enter year"
            />
            {yearError && (
              <p className="text-red-500 text-sm mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                {yearError}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={calculateAge}
          className="w-full bg-gradient-to-r from-[#6C4E31] to-[#603F26] text-white py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105 mt-6"
        >
          Calculate Age
        </button>
        {age && (
          <div className="mt-8 text-center">
            <p className="text-2xl text-brown">
              You are{" "}
              <span className="font-bold text-[#603F26]">
                {age.years} years, {age.months} months, and {age.days} days
              </span>{" "}
              old.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
