import React from "react";
import { useQuery, createClient, QueryClientProvider } from "tanstack-query";
import axios from "axios";

const queryClient = createClient();

function fetchDetails() {
  return axios.get("http://localhost:8000").then((res) => res.data);
}

function DataComponent() {
  const { data, error, status } = useQuery("details", fetchDetails);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Data Generated From Django</h1>
      <hr />
      <table
        style={{
          margin: "0 auto",
          textAlign: "left",
          borderCollapse: "collapse",
          width: "80%",
          border: "1px solid #000",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #000" }}>Employee</th>
            <th style={{ border: "1px solid #000" }}>Department</th>
          </tr>
        </thead>
        <tbody>
          {data.map((output, id) => (
            <tr key={id}>
              <td style={{ border: "1px solid #000" }}>{output.employee}</td>
              <td style={{ border: "1px solid #000" }}>{output.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataComponent />
    </QueryClientProvider>
  );
}

export default App;
