import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const API_BASE_URL = "http://localhost:5000/api/journals";

export default function Metrics() {
  const { id } = useParams();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}/metrics`);
        if (!response.ok) {
          throw new Error("Failed to fetch metrics.");
        }
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMetrics();
  }, [id]);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: "Views", value: metrics.views },
    { name: "Downloads", value: metrics.downloads },
    { name: "Citations", value: metrics.citations },
  ];

  return (
    <div className="metrics-container">
      <h2>Article Metrics</h2>
      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}