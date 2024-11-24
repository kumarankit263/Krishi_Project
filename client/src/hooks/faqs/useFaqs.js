import React from "react";
import useHttpClient from "../api/useHttpClient";
import {
  ADD_PRODUCT_FAQ,
  ANSWER_FAQ,
  GET_PRODUCT_FAQS,
  GET_SELLER_FAQS,
} from "../../constants/apiEndpoints";
import { notify } from "../../utils/helper/notification";

const useFaqs = () => {
  const { sendRequest, sendAuthorizedRequest, isLoading } = useHttpClient();

  const getFaqs = async (productId, page, faq_per_page = 6) => {
    try {
      const faqs = await sendRequest(
        GET_PRODUCT_FAQS(productId, page, faq_per_page)
      );
      return faqs.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addFaq = async (productId, faqData) => {
    try {
      await sendAuthorizedRequest(
        "user",
        ADD_PRODUCT_FAQ(productId),
        "POST",
        faqData
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getSellerFAQs = async (isAnswered) => {
    try {
      const faqs = await sendAuthorizedRequest(
        "seller",
        GET_SELLER_FAQS(isAnswered),
        "GET"
      );
      return faqs.data;
    } catch (error) {
      console.log(error);
    }
  };


  const ansFAQ = async (faqId, answer) => {
    try {
      if (answer === "") {
        notify("Please answer something", "warn");
        return;
      }

      await sendAuthorizedRequest("seller", ANSWER_FAQ(faqId), "PATCH", { answer });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  return { getFaqs, addFaq, getSellerFAQs, ansFAQ, isLoading };
};

export default useFaqs;


// import React from "react";
// import useHttpClient from "../api/useHttpClient";
// import {
//   ADD_PRODUCT_FAQ,
//   ANSWER_FAQ,
//   GET_PRODUCT_FAQS,
//   GET_SELLER_FAQS,
// } from "../../constants/apiEndpoints";
// import { notify } from "../../utils/helper/notification";

// const useFaqs = () => {
//   const { sendRequest, sendAuthorizedRequest, isLoading } = useHttpClient();

//   // Fetch product FAQs
//   const getFaqs = async (productId, page, faq_per_page = 6) => {
//     try {
//       const faqs = await sendRequest(GET_PRODUCT_FAQS(productId, page, faq_per_page));
//       return faqs?.data || []; // Ensure you return a fallback empty array
//     } catch (error) {
//       console.error("Error fetching FAQs:", error);
//       throw new Error("Failed to fetch FAQs");
//     }
//   };

//   // Add a new FAQ
//   const addFaq = async (productId, faqData) => {
//     try {
//       await sendAuthorizedRequest(
//         "user", 
//         ADD_PRODUCT_FAQ(productId), 
//         "POST", 
//         faqData
//       );
//       return true;
//     } catch (error) {
//       console.error("Error adding FAQ:", error);
//       return false;
//     }
//   };

//   // Get FAQs for the seller (answered or unanswered)
//   const getSellerFAQs = async (isAnswered) => {
//     try {
//       const faqs = await sendAuthorizedRequest(
//         "seller", 
//         GET_SELLER_FAQS(isAnswered), 
//         "GET"
//       );
//       return faqs?.data || []; // Ensure you return a fallback empty array
//     } catch (error) {
//       console.error("Error fetching seller FAQs:", error);
//       throw new Error("Failed to fetch seller FAQs");
//     }
//   };

//   // Answer a specific FAQ
//   const ansFAQ = async (faqId, answer) => {
//     try {
//       if (!answer) {
//         notify("Please answer something", "warn");
//         return false;
//       }

//       await sendAuthorizedRequest(
//         "seller", 
//         ANSWER_FAQ(faqId), 
//         "PATCH", 
//         { answer }
//       );
//       return true;
//     } catch (error) {
//       console.error("Error answering FAQ:", error);
//       return false;
//     }
//   };

//   return { getFaqs, addFaq, getSellerFAQs, ansFAQ, isLoading };
// };

// export default useFaqs;
