import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Fix: should be false initially
  const { dispatch } = useAuthContext();

  const signup = async (firstname, lastname, username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://journal-hub-server.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(json.error);
        return false; // Return false on failure
      }

      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return true; // Return true on success
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
      return false;
    }
  };

  return { signup, isLoading, error };
};
