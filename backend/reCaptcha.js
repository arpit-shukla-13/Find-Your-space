// const express = require('express');
// const fetch = require('node-fetch');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());

// const users = [
//   { name: 'admin', password: 'admin123', role: 'admin' },
//   { name: 'user', password: 'user123', role: 'user' }
// ];

// app.post('/user/authenticate', async (req, res) => {
//   const { name, password, recaptchaToken } = req.body;

  

//   if (!recaptchaToken) {
//     return res.status(400).json({ message: 'reCAPTCHA token is missing' });
//   }

//   const secretKey = process.env.RECAPTCHA_SECRET_KEY;
//   const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

//   const response = await fetch(verificationUrl, { method: 'POST' });
//   const verificationResult = await response.json();

//   if (!verificationResult.success) {
//     return res.status(400).json({ message: 'reCAPTCHA verification failed' });
//   }

//   // Handle authentication logic here
//   // For example, check the user's credentials in the database
//   // If successful:
//   // res.status(200).json({ role: 'admin', ...otherUserData });
//   // else:
//   // res.status(401).json({ message: 'Invalid Credentials' });

//   const user = users.find(u => u.name === name && u.password === password);
//   if (user) {
//     return res.status(200).json({ role: user.role, name: user.name });
//   } else {
//     return res.status(401).json({ message: 'Invalid Credentials' });
//   }
// });



// app.listen(5500, () => {
//   console.log('Server is running on port 5500');
// });
