const express = require("express");
const router = express.Router();
const Lawyer = require("../models/LawyerProfile");
const Client = require("../models/Client");
const authMiddleware = require("../middleware/authMiddleware");

const { transporter, mailOptions } = require("./mailConnect");

router.get("/all-lawyers", async (req, res) => {
  try {
    const lawyers = await Lawyer.find(); 

    const modifiedLawyers = lawyers.map((lawyer) => ({
      id: lawyer._id,
      fullName: lawyer.name,
      emailAddress: lawyer.email,
      image: lawyer.profileImage,
      fees: lawyer.fee,
      winningCases: lawyer.numberOfCasesWon,
      lostCases: lawyer.numberOfCasesLost,
      totalCases: lawyer.numberOfCasesDealtWith,
      bio: lawyer.shortDescription,
      qualification: lawyer.specialization,
    }));

    res.status(200).json(modifiedLawyers); 
  } catch (err) {
    console.error("Error fetching lawyers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/lawyer/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    const data={
      id: lawyer._id,
      fullName: lawyer.name,
      emailAddress: lawyer.email,
      image: lawyer.profileImage?.toString("base64"),
      fees: lawyer.fee,
      winningCases: lawyer.numberOfCasesWon,
      lostCases: lawyer.numberOfCasesLost,
      totalCases: lawyer.numberOfCasesDealtWith,
      bio: lawyer.shortDescription,
      qualification: lawyer.specialization,
    };

    res.json(data);

  } catch (err) {
    console.error("Error fetching lawyer:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/lawyer/connect/:lawyerId",authMiddleware, async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      shortDescription,
      caseDescription,
    } = req.body;

    const lawyer = await Lawyer.findById(lawyerId);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    const fullName = `${firstName} ${lastName}`;

    const client = new Client({
      fullName,
      email,
      phone,
      gender,
      issue: shortDescription,
      description: caseDescription,
      lawyer: lawyer.userId,
      user:req.user.id,
    });

   await client.save();
   const lawyerMailOptions = mailOptions(client, lawyer);
   transporter.sendMail(lawyerMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to lawyer:", error);
    } else {
      console.log("Email sent to lawyer:", info.response);
    }
  });
    res.status(201).json({ message: "Client connected successfully", client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});



router.get("/getCases", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const pendingClients = await Client.find({
      user: userId,
    })
      .sort({ createdAt: -1 });

    const formattedClients = pendingClients.map((client) => ({
      fullName: client.fullName,
      email: client.email,
      issue: client.issue,
      phone: client.phone,
      gender: client.gender,
      description: client.description,
      status: client.status,
      createdAt: client.createdAt,
    }));

    res.status(200).json(formattedClients);
  } catch (error) {
    console.error("Error fetching pending clients:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
