import { useState } from "react"; // Import useState from React
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState(null); // useState for error handling
  const [isLoading, setIsLoading] = useState(false); // useState for loading state
  const { dispatch } = useAuthContext(); // Assuming you're using a context for authentication

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
      return false; // Return false if login fails
    }

    if (res.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return true; // Return true if login succeeds
    }
  };

  return { login, isLoading, error }; // Return the necessary values
};
