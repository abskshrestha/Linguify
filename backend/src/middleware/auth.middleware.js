import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try{
    const token = req.cookies.jwt;

    if (!token){
      return res.send(401).json({message:"Unauthorije - No token Provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.send(401).json({message: "Unauthorijed - Invalid token"});
    }

    const user = await User.findById(decoded.userId).select("-password");    

    req.user = user;

    next();

  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.send(500).json({message:"Internal Server Error"});


  }
}

export default protectRoute;
