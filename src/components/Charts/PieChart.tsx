import { height } from "pdfkit/js/page";
import { title } from "process";
import Chart from "react-apexcharts";
import { colors } from "./ChartFunctions";

export default function PieChart({
  data,
  title,
}: {
  data: { labels: string[] | undefined; seriesData: number[] };
  title: string;
}) {
  const p = {
    colors: colors,
    labels: data.labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="col-12 col-lg-6 col-xl-4 p-2">
      <Chart
        options={p}
        series={data.seriesData}
        type="donut"
        className={"border rounded"}
        style={{ height: "100%" }}
      />
    </div>
  );
}
