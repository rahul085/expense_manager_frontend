import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const userNameRef = useRef(null);

  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5002/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: username,
            password: password,
            email: email,
            roles: ["ROLE_USER"],
          }),
        },
      );
      if (!response.ok) {
        throw new Error(
          "Registration failed. Username or email might already exist",
        );
      }

      const data = await response.json();

      setSuccess(`Welcome ${data.userName}! Your account has been created`);
      setTimeout(()=>   navigate('/login'),2000);
    
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      
    }
  };


  return (
    
    <div className="h-full flex items-center justify-center p-4  overflow-hidden">
      


     
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8  ">
        
        <div className="text-center mb-8 ">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="text-gray-500 mt-2">
            Start managing your expenses today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status messages*/}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm text-center border border-green-100">
              {success}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm ">
              Username
            </label>
            <input
              type="text"
              value={username}
              ref={userNameRef}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="johndoe123"
              // 4. Softened Input Fields
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium cursor-pointer transition-all shadow-md
              ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"}`}
              
          >
            
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;