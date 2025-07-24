require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Lawyer = require("../models/LawyerProfile");
const Client = require("../models/Client");
const authMiddleware = require("../middleware/authMiddleware");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer Transporter Error:", error);
  } else {
    console.log("Nodemailer is ready to send emails ✔");
  }
});

// Email formatting function
const mailOptions = (client, lawyer) => ({
  from: process.env.EMAIL,
  to: lawyer.email,
  subject: `New Client Consultation Request: ${client.fullName}`,
  html: `
    <p>Dear ${lawyer.name},</p>

    <p>You have received a new consultation request from a client. Details below:</p>

    <h3>Client Information</h3>
    <ul>
      <li><strong>Full Name:</strong> ${client.fullName}</li>
      <li><strong>Email:</strong> ${client.email}</li>
      <li><strong>Phone:</strong> ${client.phone}</li>
      <li><strong>Gender:</strong> ${client.gender}</li>
    </ul>

    <h3>Case Details</h3>
    <ul>
      <li><strong>Issue:</strong> ${client.issue}</li>
      <li><strong>Description:</strong> ${client.description}</li>
    </ul>

    <p>This request was submitted for your profile (Lawyer ID: <strong>${lawyer._id}</strong>).</p>

    <p>Best regards,<br/>
    LegalConnect Team</p>
  `,
});

// Route to connect user to lawyer and send email
router.post("/lawyer/connect/:lawyerId", authMiddleware, async (req, res) => {
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
    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    const fullName = `${firstName} ${lastName}`;
    const client = new Client({
      fullName,
      email,
      phone,
      gender,
      issue: shortDescription,
      description: caseDescription,
      lawyer: lawyer.userId,
      user: req.user.id,
    });

    await client.save();

    const emailContent = mailOptions(client, lawyer);
    transporter.sendMail(emailContent, (err, info) => {
      if (err) {
        console.error("Mail error:", err);
        return res.status(500).json({
          message: "Client saved, but email failed to send",
          error: err.message,
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(201).json({
          message: "Client connected and email sent successfully",
          client,
        });
      }
    });
  } catch (error) {
    console.error("Connection error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/clients/pending", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const pendingClients = await Client.find({
      lawyer: userId,
      status: "Pending",
    })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    const formattedClients = pendingClients.map((client) => ({
      id:client.id,
      fullName: client.fullName,
      email: client.email,
      issue: client.issue,
      phone: client.phone,
      gender: client.gender,
      description: client.description,
      status: client.status,
      createdAt: client.createdAt,
      clientUser: {
        fullName: client.user?.fullName,
        email: client.user?.email,
      },
    }));

    res.status(200).json(formattedClients);
  } catch (error) {
    console.error("Error fetching pending clients:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/v1/clients", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const pendingClients = await Client.find({
      lawyer: userId,
      status: { $ne: "Pending" },
    })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    const formattedClients = pendingClients.map((client) => ({
      id:client.id,
      fullName: client.fullName,
      email: client.email,
      issue: client.issue,
      phone: client.phone,
      gender: client.gender,
      description: client.description,
      status: client.status,
      createdAt: client.createdAt,
      clientUser: {
        fullName: client.user?.fullName,
        email: client.user?.email,
      },
    }));

    res.status(200).json(formattedClients);
  } catch (error) {
    console.error("Error fetching pending clients:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.put('/clients/:id/status', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.status = status;
    await client.save();

    res.status(200).json({ message: `Client status updated to ${status}` });
  } catch (error) {
    console.error('Error updating client status:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});


module.exports = router;

