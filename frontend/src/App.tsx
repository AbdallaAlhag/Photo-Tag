import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        setMessage(response.data.message);
        console.log("Message from backend:", response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{message}</h1>
    </div>
  );
}

export default App;