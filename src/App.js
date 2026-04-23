import React, { useEffect, useState } from "react";

const COLORS = {
  dev: "yellow",
  uat: "blue",
  prod: "green"
};

function App() {
  const [time, setTime] = useState("");
  const env = process.env.REACT_APP_ENV || "dev";

  useEffect(() => {
    fetch("/api/time")
      .then(res => res.json())
      .then(data => setTime(data.time));
  }, []);

  return (
    <div style={{
      backgroundColor: COLORS[env],
      height: "100vh",
      textAlign: "center"
    }}>
      <h1>Clock Application</h1>
      <h2>ENV: {env.toUpperCase()}</h2>
      <h3>{time}</h3>
    </div>
  );
}

export default App;