// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";


// const AreaGraph = ({ lineData, color, xKey, yKey, title = "Graph Title" }) => {
//   const gradientId = `gradient-1`;

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <h2 className={`text-center font-semibold mb-4`}>{title}</h2>
//       <AreaChart data={lineData}>
//         <defs>
//           <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor={color} stopOpacity={0.8} />
//             <stop offset="100%" stopColor={color} stopOpacity={0.1} />
//           </linearGradient>
//         </defs>
//         <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
//         <XAxis
//           dataKey={xKey}
//           axisLine={{ stroke: color, strokeWidth: 2 }}
//           tick={{ fill: color, fontSize: "12px" }}
//         />
//         <YAxis
//           axisLine={{ stroke: color, strokeWidth: 2 }}
//           tick={{ fill: color, fontSize: "12px" }}
//           tickFormatter={(tick) => `Rs.${tick}`}
//         />
//         <Area
//           type="monotone"
//           dataKey={yKey}
//           stroke={color}
//           strokeWidth={2}
//           fill={`url(#${gradientId})`}
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export default AreaGraph;





import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaGraph = ({
  lineData = [], // Default to an empty array to handle undefined
  color = "#8884d8", // Default color
  xKey,
  yKey,
  title = "Graph Title",
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substring(2, 15)}`; // Unique gradient ID

  // Render a message if no data is provided
  if (!lineData || lineData.length === 0) {
    return (
      <div className="text-center text-gray-500 font-semibold py-4">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-center font-semibold mb-4">{title}</h2>

      {/* Area Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={lineData}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid and Axes */}
          <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
          <XAxis
            dataKey={xKey}
            axisLine={{ stroke: color, strokeWidth: 2 }}
            tick={{ fill: color, fontSize: "12px" }}
          />
          <YAxis
            axisLine={{ stroke: color, strokeWidth: 2 }}
            tick={{ fill: color, fontSize: "12px" }}
            tickFormatter={(tick) => `Rs. ${tick}`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: "#f4f4f4", borderColor: color }}
            formatter={(value) => [`Rs. ${value}`, "Sales"]}
          />

          {/* Area */}
          <Area
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
