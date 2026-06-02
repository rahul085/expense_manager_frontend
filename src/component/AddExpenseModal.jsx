import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AddExpenseModal = ({onClose,onExpenseAdded,expensesToEdit}) => {
    const {token}=useAuth();
    const [error,setError]=useState("");

    const [formData,setFormData]=useState({
        amount:"",
        category:"FOOD_AND_DINING",
        transactionDate:"",
        description:"",
    });

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

        useEffect(()=>{
        // If the parent handed us an expense to edit, fill the clipboard!
        if(expensesToEdit){
            setFormData({
                amount:expensesToEdit.amount,
                category:expensesToEdit.category,
                transactionDate:expensesToEdit.transactionDate,
                description:expensesToEdit.description
            });
        }
    },[expensesToEdit]) // this runs everytime expense to edit changes.

    const handleAddExpense= async(e)=>{
        e.preventDefault();
        //Assume we are creating a new expense
        let url='http://localhost:5002/api/v1/expenses';
        let httpMethod='POST';

        // if we are editing change the url and http method
        if(expensesToEdit){
            const id=expensesToEdit.expenseId || expensesToEdit.id;
            url=`http://localhost:5002/api/v1/expenses/${id}`;
            httpMethod="PUT";
        }

        try{
            const response =await fetch(url,{
                method:httpMethod,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if(!response.ok){
                throw new Error(expensesToEdit? "Failed to update expense": "Failed to add expense");
            }

            onExpenseAdded();
            onClose();
        } catch(err){
            setError(err.message);
        }
        
    };

    // Check if we are in "Edit Mode" so we can change the UI text!    
    const isEditMode=Boolean(expensesToEdit);


  return (
    <div className="fixed inset-0 z-60 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
            {/** The white modal card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
              {/** Modal header */}
              <div className="flex justify-between items-center p-6 border border-gray-100">
                {/** Dynamic title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditMode?"Edit Expense":"Add New Expense"}
                </h3>
                {/** Close button */}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer "
                >
                  &times;
                </button>
              </div>

              {/** Modal form */}
              <form onSubmit={handleAddExpense} className="space-y-4 p-6">
                {/** Amount input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name='amount'
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0.00"
                  />
                </div>

                {/** Category drop down */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    name='category'
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="FOOD_AND_DINING">Food & Dining</option>
                    <option value="TRAVEL">Travel</option>
                    <option value="BILLS">Bills</option>
                    <option value="ENTERTAINMENT">Entertainment</option>
                    <option value="SHOPPING">Shopping</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="PERSONAL_CARE">Personal care</option>
                    <option value="EDUCATION">Education</option>
                    <option value="INVESTMENT">Investment</option>
                    <option value="RENT">Rent</option>
                    <option value="TAXES">Taxes</option>
                    <option value="INSURANCE">Insurance</option>
                    <option value="GIFTS_AND_DONATION">Gifts & Donation</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>

                {/** Date input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name='transactionDate'
                    value={formData.transactionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <input type="text" value={formData.description}
                    name='description'
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none " />
                </div>

                {/** submit button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
                >
                  {isEditMode?"Update Expense":"Save Expense"}
                </button>
              </form>
            </div>
          </div>
  )
}

export default AddExpenseModal