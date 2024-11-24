// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { GoDotFill } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
// import TableSkeleton from "../../components/skeleton/TableSkeleton";
// import EmptyStateText from "../../components/empty_state/EmptyStateText";
// import Heading from "../../components/heading/Heading";
// import useOrder from "../../hooks/orders/useOrder";

// function SellerOrderRequests() {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const { getSellerOrders, isLoading } = useOrder();

//   // API to GET Data
//   const getOrders = async () => {
//     let orderedData = await getSellerOrders();
//     setData(orderedData);
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   return (
//     <>
//       {/* Table Header */}
//       <Heading text={"All Orders"} textAlign="text-left" />
//       <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
//         <div className="mt-1 relative w-full  md:w-96">
//           <input
//             type="text"
//             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//             placeholder="Search for products (Coming soon)"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex flex-col overflow-x-auto w-full">
//         <div className="min-w-full py-2">
//           {isLoading ? (
//             <TableSkeleton />
//           ) : data.length === 0 ? (
//             <EmptyStateText text="It seems like your order request queue is currently empty. No worries, though! Keep an eye out for incoming orders—they'll pop up right here in your dashboard." />
//           ) : (
//             <table className="text-center text-sm font-light w-full">
//               <thead className="border-b font-medium bg-gray-100">
//                 <tr>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     #
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Image
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Category
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Product Name
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Order Date
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Customer Name
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Customer PhoneNo
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap py-4">
//                     Customer Email
//                   </th>
//                   <th scope="col" className="px-6 whitespace-nowrap  py-4">
//                     Order Quantity
//                   </th>
//                   <th scope="col" className="px-6 py-4 whitespace-nowrap">
//                     Order Location
//                   </th>
//                   <th scope="col" className="px-6 py-4 whitespace-nowrap">
//                     Total Price
//                   </th>
//                   <th scope="col" className="px-6 py-4 whitespace-nowrap">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr
//                     className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
//                     key={index}
//                   >
//                     <td className="px-6 py-4 font-medium">{index + 1}</td>
//                     <td className="px-6 py-2">
//                       <img src={item.productId.image} alt="Image" loading="lazy"/>
//                     </td>
//                     <td className="px-6 py-4">{item.productId.category}</td>
//                     <td className="px-6 py-4">{item.productId.name}</td>
//                     <td className="px-6 py-4">{item.date}</td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
//                       {item.userId.name}
//                     </td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
//                       {item.userId.contact}
//                     </td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
//                       {item.userId.email}
//                     </td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
//                       {item.orderQty} {item.productId.measuringUnit}
//                     </td>
//                     <td
//                       className=" px-6 py-4 max-w-sm cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
//                       onClick={() => {
//                         navigate(
//                           `/map/${item.orderLocation.coordinates[1]}/${item.orderLocation.coordinates[0]}`
//                         );
//                       }}
//                     >
//                       {item.orderLocation.coordinates[1].toFixed(4)},{" "}
//                       {item.orderLocation.coordinates[0].toFixed(4)}
//                     </td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
//                       Rs.{item.totalAmount}
//                     </td>
//                     <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal text-yellow-500 font-medium">
//                       <span className="flex justify-center items-center">
//                         <GoDotFill className="mr-1" />
//                         Pending
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default SellerOrderRequests;





import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useOrder from "../../hooks/orders/useOrder";

function SellerOrderRequests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { getSellerOrders, isLoading } = useOrder();

  // API to GET Data
  const getOrders = async () => {
    try {
      let orderedData = await getSellerOrders();

      // Filter out invalid entries where productId is null
      const validData = orderedData.filter((item) => item.productId);
      setData(validData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {/* Table Header */}
      <Heading text={"All Orders"} textAlign="text-left" />
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="mt-1 relative w-full md:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products (Coming soon)"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isLoading ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="It seems like your order request queue is currently empty. No worries, though! Keep an eye out for incoming orders—they'll pop up right here in your dashboard." />
          ) : (
            <table className="text-center text-sm font-light w-full">
              <thead className="border-b font-medium bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Image
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Order Date
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Customer PhoneNo
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Customer Email
                  </th>
                  <th scope="col" className="px-6 whitespace-nowrap py-4">
                    Order Quantity
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Order Location
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-2">
                      {item.productId && item.productId.image ? (
                        <img
                          src={item.productId.image}
                          alt="Image"
                          loading="lazy"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{item.productId?.category || "N/A"}</td>
                    <td className="px-6 py-4">{item.productId?.name || "N/A"}</td>
                    <td className="px-6 py-4">{item.date || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.name || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.contact || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId?.email || "N/A"}</td>
                    <td className="px-6 py-4">
                      {item.orderQty || "N/A"} {item.productId?.measuringUnit || ""}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
                      onClick={() => {
                        if (item.orderLocation?.coordinates?.length === 2) {
                          navigate(
                            `/map/${item.orderLocation.coordinates[1]}/${item.orderLocation.coordinates[0]}`
                          );
                        }
                      }}
                    >
                      {item.orderLocation?.coordinates?.length === 2
                        ? `${item.orderLocation.coordinates[1].toFixed(4)}, ${item.orderLocation.coordinates[0].toFixed(4)}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">Rs.{item.totalAmount || "N/A"}</td>
                    <td className="px-6 py-4 text-yellow-500 font-medium">
                      <span className="flex justify-center items-center">
                        <GoDotFill className="mr-1" />
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default SellerOrderRequests;
