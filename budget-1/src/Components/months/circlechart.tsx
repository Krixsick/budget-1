import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
interface CircleChartProps {
  chartId?: string;
  month?: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);
export function CircleChart({
  chartId = "doughnut-chart",
  month,
}: CircleChartProps) {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut id={chartId} data={data}></Doughnut>;
}
