const multer = require("multer");
const router = require("express").Router();
const nodemailer = require("nodemailer");
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const myStorage = multer({ storage: storage });

router.post("/uploadfile", myStorage.single("myfile"), (req, res) => {
  res.status(200).json({ status: "success" });
});

// Mailer configuration
const mailConfig = {
  service : 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  }
};
const transporter = nodemailer.createTransport(mailConfig);

// In-memory storage for OTPs (server restart hone par clear ho jaayega)
const otpStorage = {};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

router.post('/sendotp', (req, res) => {
  const otp = generateOTP();
  otpStorage[req.body.email] = otp;
  console.log(`OTP for ${req.body.email}: ${otp}`);

  transporter.sendMail({
      from : process.env.EMAIL_USER,
      to : req.body.email,
      subject : 'Your OTP for Password Reset',
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</p>`
  })
  .then((info) => {
      console.log('Mail sent:', info.messageId);
      return res.status(201).json({ msg: "OTP Sent" });
  }).catch((err) => {
      console.error('Error sending mail:', err);
      return res.status(500).json({ msg: "Failed to send OTP" });
  });
});

router.get('/verifyotp/:email/:otp', (req, res) => {
  const storedOTP = otpStorage[req.params.email];
  if (storedOTP && storedOTP === req.params.otp) {
      // OTP verify hone ke baad use delete kar dein
      delete otpStorage[req.params.email];
      return res.status(200).json({ msg : 'OTP Verified' });
  } else {
      return res.status(401).json({ msg : 'Invalid OTP' });
  }
});

module.exports = router;