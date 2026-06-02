import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const {user, authDispatch}=useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const usernameInputRef = useRef(null);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials. Please try again");
      }
      const data = await response.json();
      setSuccess(`Welcome ${username}! `);
      setTimeout(()=> navigate("/"),2000);
      console.log("Success! Token:", data.activeToken);
      authDispatch({type:'LOGIN',payload:data.activeToken});
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
  
    <div className="h-full flex items-center justify-center p-4 overflow-hidden ">
      


      
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8  ">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-2">
            Please enter your details to log in
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          

          {/** Username input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              ref={usernameInputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              // 4. Softened Input Fields
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter your username"
            />
          </div>

          {/** Password input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // 4. Softened Input Fields
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter your Password"
            />
          </div>

          {/** Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg cursor-pointer text-white font-medium transition-all shadow-md
                ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleSignUp}
              className="font-semibold text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;