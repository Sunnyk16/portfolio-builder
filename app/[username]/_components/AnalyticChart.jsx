// // import React from "react";
// // import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// // function AnalyticChart({ data = [] }) {
// //   if (!data.length) {
// //     return <p className="text-gray-500 text-center">No data available</p>;
// //   }

// //   return (
// //     <ResponsiveContainer width={"100%"} height={150}>
// //       <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
// //         <defs>
// //           <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
// //             <stop offset="5%" stopColor="#B39DDB" stopOpacity={0.8} /> {/* Light Purple */}
// //             <stop offset="95%" stopColor="#B39DDB" stopOpacity={0} />
// //           </linearGradient>
// //         </defs>
// //         <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} />
// //         <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} />
// //         <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "5px", border: "none" }} />
// //         <Area
// //           type="monotone"
// //           dataKey="totalClicks"
// //           stroke="#B39DDB" // Subtle purple line
// //           strokeWidth={1.5} // Soft stroke
// //           fill="url(#colorPurple)"
// //           fillOpacity={1}
// //         />
// //       </AreaChart>
// //     </ResponsiveContainer>
// //   );
// // }

// // export default AnalyticChart;
// import React from "react";
// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// function AnalyticChart({ data = [] }) {
//   if (!data.length) {
//     return <p className="text-gray-500 text-center">No data available</p>;
//   }

//   return (
//     <ResponsiveContainer width={"100%"} height={100}>
//       <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//         <defs>
//           <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//             <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//           </linearGradient>
//           <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//             <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//           </linearGradient>
//         </defs>
//         <XAxis 
//           dataKey="month" 
//           tick={{ fontSize: 12, fill: "#333" }} 
//           tickFormatter={(month) => month.charAt(0).toUpperCase() + month.slice(1)} // Capitalize month names
//         />
//         <YAxis tick={{ fontSize: 12, fill: "#333" }} />
//         <CartesianGrid strokeDasharray="3 3" />
//         <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none", borderRadius: "5px" }} />
//         <Area type="monotone" dataKey="totalClicks" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// }

// export default AnalyticChart;
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function AnalyticChart({ data = [] }) {
  if (!data.length) {
    return <p className="text-gray-500 text-center">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6A5ACD" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6A5ACD" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* X-Axis (Month) */}
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12, fill: "#555" }} 
          axisLine={false} 
          tickFormatter={(month) => month.charAt(0).toUpperCase() + month.slice(1)} 
        />

        {/* Y-Axis (Clicks) */}
        <YAxis 
          tick={{ fontSize: 12, fill: "#555" }} 
          axisLine={false} 
          tickCount={5} 
          allowDecimals={false} 
        />

        {/* Grid lines for better readability */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />

        {/* Tooltip */}
        <Tooltip 
          contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: "5px", padding: "5px", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)" }}
          cursor={{ stroke: "#6A5ACD", strokeWidth: 1, strokeDasharray: "3 3" }} 
        />

        {/* Area Chart */}
        <Area 
          type="monotone" 
          dataKey="totalClicks" 
          stroke="#6A5ACD" 
          strokeWidth={2} 
          fill="url(#colorClicks)" 
          fillOpacity={1} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AnalyticChart;
