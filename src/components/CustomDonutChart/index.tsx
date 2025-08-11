import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Màu sắc cho từng phần
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#2ef135ff"];
interface CustomDonutChartProps {
  data: { name: string; value: number }[];
  centerText?: string; 
  centerValue?: string;
}
const CustomDonutChart: React.FC<CustomDonutChartProps> = ({ data, centerText, centerValue }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        {/* Label ở giữa */}
        <text
          x="50%"
          y="35%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "14px", fontWeight: "bold", fill: "#666" }}
        >
          {centerText}
        </text>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {centerValue}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomDonutChart;
