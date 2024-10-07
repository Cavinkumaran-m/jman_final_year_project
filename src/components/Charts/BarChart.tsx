import { title } from "process";
import Chart from "react-apexcharts";
import { colors } from "./ChartFunctions";

export default function BarChart({
  data,
  title,
}: {
  data: { labels: string[]; seriesData: number[] };
  title: string;
}) {
  const options = {
    title: {
      text: title,
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    colors: [colors[Math.floor(colors.length * Math.random())]],
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: data.labels.map((label) =>
        label.length > 10 ? label.slice(0, 10) + "..." : label
      ), // Shorten long labels
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data: data.seriesData,
    },
  ];

  return (
    <div className="col-12 col-lg-6 col-xl-4 p-2">
      <Chart
        options={options}
        series={series}
        type="bar"
        className={"border rounded"}
        style={{ height: "100%" }}
      />
    </div>
  );
}
