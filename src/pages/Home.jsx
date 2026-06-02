import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddExpenseModal from "../component/AddExpenseModal";

// dynamically mapping the icons style based on the categories
const categoryIconMap = {
  FOOD_AND_DINING: "restaurant",
  TRAVEL: "flight",
  BILLS: "receipt_long",
  ENTERTAINMENT: "movie",
  SHOPPING: "shopping_bag",
  MEDICAL: "medical_services",
  PERSONAL_CARE: "bathtub",
  EDUCATION: "book",
  INVESTMENT: "show_chart",
  RENT: "bungalow",
  TAXES: "currency_rupee",
  INSURANCE: "personal_injury",
  GIFTS_AND_DONATION: "card_giftcard",
  OTHERS: "category",
};

// helper funtion to format the date.
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Home = () => {
  const navigate = useNavigate();
  // Grab the user and token from the usecontext.
  const { user, token } = useAuth();

  // local state for dashboard.
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit,setExpenseToEdit]=useState(null);
  const [error, setError] = useState("");


   const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/expenses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();
        // Sorting the data by date (Newest data first)
        const sortedData=data.sort((a,b)=>{
            return new Date(b.transactionDate)-new Date(a.transactionDate);
        });

        setExpenses(sortedData);
        console.log(data);
        console.log(`expenses: ${expenses}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

  // The fetch effect
  useEffect(() => {
    if (user) fetchExpenses();
  }, [user, token]);



  const handleDeleteExpense=async (id)=>{
    // ask the user if they are sure to delete the expense.
    const isConfirmed=window.confirm("Are you sure you want to delete this expense?");
    if(!isConfirmed) return;
    try{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/api/v1/expenses/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            }
        });

        if(!response.ok) throw new Error("Failed to delete expense");

        setExpenses((prevExpenses)=> prevExpenses.filter((expense)=>expense.expenseId!=id));
    } catch(err){
        console.error(err.message);
    }

  };



  const handleGetStarted = () => {
    navigate("/login");
  };
  const totalSpent = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  if (user) {
    return (
      <div className="h-full p-8 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white  text-gray-900 mb-4">YOUR EXPENSES</h2>
        <div className="flex justify-between items-center ">
             <button
          className="bg-indigo-600 rounded-lg text-white px-4 py-2 font-medium hover:bg-indigo-700 transition-colors
        shadow-sm cursor-pointer"
          onClick={() => {
            setExpenseToEdit(null);
            setIsModalOpen(true);
          }}
        >
          + Add Expense
        </button>

        <p className="text-2xl font-medium dark:text-white">Total: ₹{totalSpent}/-</p>

        </div>
       
        {isLoading && <p> Loading your Expenses...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-white rounded-xl shadow-md p-6 border mt-2 border-gray-100">
          {expenses.length === 0 && !isLoading ? (
            <p>No expenses found. Time to add one!</p>
          ) : (
            <ul className="space-y-4">
              {expenses.map((expense) => (
                <li
                  key={expense.expenseId}
                  className="flex justify-between items-center p-3 border border-gray-100 rounded-lg 
                            hover:shadow-md cursor-pointer transition-shadow bg-gray-50"
                >
                  <div className="flex items-baseline  flex-col gap-2 ">
                    <p className="font-semibold text-gray-800 ">
                      <span className="material-icons-outlined m-2  rounded-full p-2 border text-pink-400 border-gray-300 ">
                        {categoryIconMap[expense.category?.toUpperCase()] ||"receipt_long"}
                      </span>
                      {expense.category}
                    </p>
                    <p className="text-sm font-medium px-5">{expense.description}</p>
                    <p className="text-sm text-gray-500 px-5">
                      {formatDate(expense.transactionDate)}
                    </p>
                    
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="font-bold text-slate-700 mr-4">
                    ₹{expense.amount}/-
                  </div>
                  <button
                  onClick={()=>{
                    setExpenseToEdit(expense)
                    setIsModalOpen(true)
                  }} className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer p-2 rounded-full hover:bg-blue-50"
                  title="Edit Expense">
                    <span className="material-icons-outlined text-xl">edit</span>
                  </button>
                  
                  <button
                  onClick={()=>handleDeleteExpense(expense.expenseId)}
                  className="text-red-400 hover:text-red-600 transition-colors cursor-pointer p-2 rounded-full hover:bg-red-50
                  "
                  title="Delete Expense">
                    <span className="material-icons-outlined text-xl">delete</span>
                  </button>
                  </div>
                 
                </li>
              ))}
            </ul>
          )}
        </div>
        {isModalOpen && (
          <AddExpenseModal
          onClose={()=>setIsModalOpen(false)}
          onExpenseAdded={fetchExpenses}
          expensesToEdit={expenseToEdit}
          />

          
        )}
      </div>
    );
  }

  return (
    <>
      <main className="h-full flex flex-col  ">
        <div className="flex justify-center items-center   w-full h-[50%]">
          <div className=" w-[40%] h-full flex-col  items-center  mt-24">
            <h2 className="font-bold text-5xl px-3 py-2 dark:text-white  ">
              Take control of your every expense.{" "}
            </h2>
            <p className="dark:text-white  px-3 py-2 ">
              Your one-stop finance empower platform. Manage all you expenses
              with our superfast app.
            </p>
            <div className="flex items-center mt-3 ">
              <button
                className="bg-indigo-600 px-10 py-3 cursor-pointer rounded-full text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;
