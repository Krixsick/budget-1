import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
  chartId: string;
  month: string;
  expenseTotal: number;
  incomeTotal: number;
}

export function CircleChart({
  chartId,
  month,
  expenseTotal = 0,
  incomeTotal = 0,
}: CircleChartProps) {
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [incomeTotal, expenseTotal],
        backgroundColor: [
          "#10b981", // Green for income
          "#ef4444", // Red for expenses
        ],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "Inter, sans-serif",
            size: 14,
            weight: "600",
          },
          color: "#374151",
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label}: $${value.toLocaleString()}`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: {
          family: "Inter, sans-serif",
          size: 14,
          weight: "600",
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        padding: 14,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%", // Makes it a doughnut chart
  };

  // Calculate balance
  const balance = incomeTotal - expenseTotal;
  const balanceColor = balance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="w-full min-h-[350px] rounded-xl flex flex-col p-6 bg-[#F0F4F8]">
      {/* Header */}
      <div className="mb-4">
        <h2 className="inter-bold text-xl text-gray-800 capitalize">
          {month} Overview
        </h2>
        <p className="inter-light text-sm text-gray-600 mt-1">
          Income vs Expenses
        </p>
      </div>

      {/* Chart Container */}
      <div className="flex-1 bg-white rounded-lg p-6 flex flex-col items-center justify-center relative">
        {/* Center Text (inside doughnut) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="inter-light text-sm text-gray-600">Balance</p>
          <p className={`inter-bold text-3xl ${balanceColor}`}>
            {balance >= 0 ? "+$" : "-$"}
            {Math.abs(balance).toLocaleString()}
          </p>
          <p className="inter-light text-xs text-gray-500 mt-1">
            {balance >= 0 ? "Surplus" : "Deficit"}
          </p>
        </div>

        {/* Chart */}
        <div className="w-full h-[280px]">
          <Doughnut id={chartId} data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
