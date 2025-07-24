const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const LawyerProfile = require("../models/LawyerProfile");
const User=require("../models/User");

const upload=require("./imgStore");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "user") {
      return res.json(req.user);
    }

    const user = await LawyerProfile.findOne({ userId: req.user.id }); // Fetch full user data

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // const profileImageBase64 = user.profileImage
    // ? `data:image/jpeg;base64,${user.profileImage.toString('base64')}` // Assuming it's a JPEG image
    // : null;

    res.json({
      profileId: user.id,
      name: user.name,
      email: user.email,
      specialization: user.specialization,
      casesDealtWith: user.numberOfCasesDealtWith,
      casesWon: user.numberOfCasesWon,
      casesLost: user.numberOfCasesLost,
      fee: user.fee,
      description: user.shortDescription,
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching profile" });
  }
});

router.put("/update-profile", authMiddleware,upload.single("profileImage"), async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  try {
    // Update common user fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let profileImage = null;


    if (req.file && req.file.buffer) {
      const image = req.file.buffer;
      profileImage = `data:image/jpeg;base64,${image.toString("base64")}`;
    }

    // If user is a lawyer, update LawyerProfile as well
    if (role === "lawyer") {

      const updateFields = {
        name: req.body.name,
        email: req.body.email,
        specialization: req.body.specialization,
        numberOfCasesDealtWith: req.body.numberOfCasesDealtWith,
        numberOfCasesWon: req.body.numberOfCasesWon,
        numberOfCasesLost: req.body.numberOfCasesLost,
        fee: req.body.fee,
        shortDescription: req.body.shortDescription,
      };
    
      // Only add profileImage if it's available
      if (profileImage) {
        updateFields.profileImage = profileImage;
      }
    
      const updatedLawyerProfile = await LawyerProfile.findOneAndUpdate(
        { userId },
        updateFields,
        { new: true }
      );

      if (!updatedLawyerProfile) {
        return res
          .status(404)
          .json({ success: false, message: "Lawyer profile not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Lawyer profile updated successfully",
        user: updatedUser,
        lawyerProfile: updatedLawyerProfile,
      });
    }

    // If just a regular user
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during profile update" });
  }
});

module.exports = router;
