import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [message, setMessage] = useState("");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setMessage(response.data.message);
        console.log("Message from backend:", response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [baseURL]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{message}</h1>
    </div>
  );
}

export default App;
