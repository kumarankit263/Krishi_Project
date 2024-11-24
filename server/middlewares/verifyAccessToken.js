// const jwt = require("jsonwebtoken");

// const verifyAccessToken = async (req, res, next) => {
//   let access_token = req.headers.authorization;

//   if (!access_token) {
//     return res.status(401).send({ message: "Access token is required" });
//   }

//   access_token = access_token.split(" ")[1];

//   try {
//     const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

//     // This id can be seller or user id depending on the token
//     if (decoded.user) {
//       req.userId = decoded.user;
//     } else if (decoded.seller) {
//       req.sellerId = decoded.seller;
//     } else {
//       return res
//         .status(403)
//         .send({ message: "Invalid token, please login again" });
//     }

//     next();
//   } catch (error) {
//     // console.log(error);

//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(403)
//         .send({ message: "Token expired, please login again" });
//     }

//     return res.status(403).send({ message: "Invalid token, please login again" });
//   }
// };

// module.exports = verifyAccessToken;






const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Assign userId or sellerId to the request object based on the token payload
    if (decoded.user) {
      req.userId = decoded.user;
    } else if (decoded.seller) {
      req.sellerId = decoded.seller;
    } else {
      return res.status(403).json({ message: "Invalid token, please login again" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please login again" });
    }
    return res.status(403).json({ message: "Invalid token, please login again" });
  }
};

module.exports = verifyAccessToken;
