import React from "react";
import { useQuery } from "react-query";

function App() {
  const { data, error, isLoading } = useQuery("data", fetchData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Data Generated From Django</h1>
      <hr />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {data.map((output, id) => (
            <tr key={id}>
              <td>{output.employee}</td>
              <td>{output.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Replace this function with your actual data-fetching logic
const fetchData = async () => {
  const response = await fetch("http://localhost:8000");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default App;
