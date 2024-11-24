// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import Heading from "../../components/heading/Heading";
// import AreaGraph from "../../components/graphs/AreaGraph";
// import BarGraph from "../../components/graphs/BarGraph";
// import GraphSkeleton from "../../components/skeleton/GraphSkeleton";
// import useGraph from "../../hooks/graph/useGraph";
// import EmptyStateText from "../../components/empty_state/EmptyStateText";

// function SellerOverview() {
//   const { visualizeSalesData, isLoading } = useGraph();

//   const [dateVsSales, setDateVsSales] = useState([]);
//   const [categoryVsSales, setCategoryVsSales] = useState([]);

//   const visualizeData = async () => {
//     let graphData = await visualizeSalesData();
//     setDateVsSales(graphData.dateVsSales);
//     setCategoryVsSales(graphData.categoryVsSales);
//   };

//   useEffect(() => {
//     visualizeData();
//   }, []);

//   return (
//     <>
//       {/* Table Header */}
//       <Heading text={"Visualize Your Sales"} textAlign="text-left" />
//       {isLoading ? (
//         <GraphSkeleton noOfBoxes={2} />
//       ) : dateVsSales.length === 0 ? (
//         <EmptyStateText text="No orders have been placed. Check back soon!" />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4 px-4">
//           <AreaGraph
//             title="Date v/s Sales"
//             lineData={dateVsSales}
//             color={"#be123c"}
//             xKey={"date"}
//             yKey={"totalSales"}
//           />
//           <BarGraph
//             title="Category v/s Sales"
//             data={categoryVsSales}
//             color={"#be123c"}
//             xKey={"category"}
//             yKey={"totalSales"}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default SellerOverview;



import React, { useState, useEffect } from "react";
import Heading from "../../components/heading/Heading";
import AreaGraph from "../../components/graphs/AreaGraph";
import BarGraph from "../../components/graphs/BarGraph";
import GraphSkeleton from "../../components/skeleton/GraphSkeleton";
import useGraph from "../../hooks/graph/useGraph";
import EmptyStateText from "../../components/empty_state/EmptyStateText";

function SellerOverview() {
  const { visualizeSalesData, isLoading } = useGraph();

  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);
  const [error, setError] = useState(null);

  // Fetch graph data from the API
  const visualizeData = async () => {
    try {
      const graphData = await visualizeSalesData();

      // Safeguard against unexpected data structures
      if (graphData && graphData.dateVsSales && graphData.categoryVsSales) {
        setDateVsSales(graphData.dateVsSales);
        setCategoryVsSales(graphData.categoryVsSales);
      } else {
        setError("Unexpected response structure from the API.");
      }
    } catch (err) {
      setError("Failed to fetch graph data. Please try again later.");
    }
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Page Heading */}
      <Heading text={"Visualize Your Sales"} textAlign="text-left" />

      {isLoading ? (
        <GraphSkeleton noOfBoxes={2} />
      ) : error ? (
        <EmptyStateText text={error} />
      ) : dateVsSales.length === 0 && categoryVsSales.length === 0 ? (
        <EmptyStateText text="No orders have been placed. Check back soon!" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4 px-4">
          <AreaGraph
            title="Date v/s Sales"
            lineData={dateVsSales}
            color={"#be123c"}
            xKey={"date"}
            yKey={"totalSales"}
          />
          <BarGraph
            title="Category v/s Sales"
            data={categoryVsSales}
            color={"#be123c"}
            xKey={"category"}
            yKey={"totalSales"}
          />
        </div>
      )}
    </>
  );
}

export default SellerOverview;

