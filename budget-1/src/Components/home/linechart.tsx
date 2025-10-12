import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LineChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: [
          2400, 2900, 2200, 2500, 3200, 2800, 3100, 2900, 3400, 3000, 3300,
          3500,
        ],
        borderColor: "#10b981", // Green for income
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Expenses",
        data: [
          1200, 1900, 800, 1500, 2000, 1700, 1400, 1800, 1600, 1900, 2100, 1500,
        ],
        borderColor: "#ef4444", // Red for expenses
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "Inter, sans-serif",
            size: 13,
            weight: "500",
          },
          color: "#374151",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
          weight: "600",
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          color: "#6b7280",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          color: "#6b7280",
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="w-full p-6 bg-[#F0F4F8] rounded-xl mb-4">
      <div className="mb-4">
        <h2 className="inter-bold text-xl text-gray-800">Financial Overview</h2>
      </div>
      <div className="h-[300px] bg-white rounded-lg p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
