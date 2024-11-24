// import useHttpClient from "../api/useHttpClient";

// // API endpoint for crop prediction
// export const CROP_PREDICTOR = (soil, altitude, temperature, humidity, rainfall) =>
//   `/ai/crops?soil=${soil}&altitude=${altitude}&temperature=${temperature}&humidity=${humidity}&rainfall=${rainfall}`;

// const useAI = () => {
//   const { sendRequest, isLoading } = useHttpClient();

//   const predictCrops = async (formData) => {
//     const resp = await sendRequest(
//       CROP_PREDICTOR(
//         formData.soil,
//         formData.altitude,
//         formData.temperature,
//         formData.humidity,
//         formData.rainfall
//       ),
//       "GET",
//       null,
//       null,
//       false
//     );
//     console.log(resp);
//     return resp?.data?.message || "No response received from the server.";
//   };

//   return { isLoading, predictCrops };
// };

// export default useAI;

import useHttpClient from "../api/useHttpClient";

// API endpoint for crop prediction
export const CROP_PREDICTOR = (soil, altitude, temperature, humidity, rainfall) =>
  `/ai/crops?soil=${soil}&altitude=${altitude}&temperature=${temperature}&humidity=${humidity}&rainfall=${rainfall}`;

const useAI = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const predictCrops = async (formData) => {
    try {
      const resp = await sendRequest(
        CROP_PREDICTOR(
          formData.soil,
          formData.altitude,
          formData.temperature,
          formData.humidity,
          formData.rainfall
        ),
        "GET"
      );
      console.log("API Response:", resp);

      if (resp && resp.data && resp.data.message) {
        return resp.data.message; // Return the prediction message
      }

      throw new Error("Invalid response from the server."); // If data is not in expected format
    } catch (error) {
      console.error("Error predicting crops:", error.message);
      return "Error: Unable to fetch prediction data. Please try again later.";
    }
  };

  return { isLoading, predictCrops };
};

export default useAI;
