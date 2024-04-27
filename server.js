const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const comps = require("./companymodel");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require("cors");
const users = require("./usermodel");
const Roommate = require("./roommatemodel");
const Textbook = require("./textbookmodel");
const Event = require("./eventmodel");
const appliedcomps = require("./appliedcomps");
const Poll = require("./pollmodel");
const passwordResetRoutes = require("./forgotpassword");
const expressJwt = require('express-jwt');
const nodemailer = require('nodemailer');

// const { default: Login } = require('./client/src/Login');

const app = express();
mongoose
  .connect("mongodb+srv://Joseph:Nicky123@cluster11266.s4ee0za.mongodb.net/")
  .then(() => console.log("MongoDB Connected"));

app.use(express.json());
app.use(cors({ origin: "*" }));
const JWT_SECRET = process.env.JWT_SECRET || 'yf93a3b5113a9869cb864a8d07bb6b981a75ce1a0cae62ce793edd41c1d6f8e9a';

// User Registration
app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      email,
      department,
      phoneNumber,
      loginName,
      password,
      confirmPassword,
    } = req.body;

    const existEmail = await users.findOne({ email });
    if (existEmail) {
      return res.status(200).send("This email has already been registered");
    }

    const existLoginName = await users.findOne({ loginName });
    if (existLoginName) {
      return res.status(200).send("This username has been taken.");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const newUser = new users({
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      email,
      department,
      phoneNumber,
      loginName,
      password,
      confirmPassword,
    });

    await newUser.save();
    return res.status(200).send("Registration successful");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await users.findOne({ email });
    if (!exist) {
      return res.status(200).send("User does not exist please register");
    }
    if (exist.password !== password) {
      return res.status(200).send("Invalid Password");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log("err");
    return res.status(500).send("Login Server Error");
  }
});

// Search users
app.get("/search", async (req, res) => {
  try {
    const searchCriteria = req.query; // Get the search criteria from query parameters
    const foundUsers = await users.searchUsers(searchCriteria); // Call the searchUsers method from the user model
    return res.status(200).json(foundUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Edit User Profile
app.post("/editprofile", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      loginName,
      password,
      confirmPassword,
      department,
      phoneNumber,
    } = req.body;

    // Find the user by loginName
    let student = await users.findOne({ loginName });

    if (!student) {
      return res.status(404).send("User not found");
    }

    // Update user's details
    student.firstName = firstName;
    student.lastName = lastName;
    student.address = address;
    student.city = city;
    student.state = state;
    student.zipCode = zipCode;
    student.password = password;
    student.confirmPassword = confirmPassword;
    student.department = department;
    student.phoneNumber = phoneNumber;

    await student.save(); // Save the updated user

    return res.status(200).send("Data has been updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Route to post roommate ad
app.post("/roommates", async (req, res) => {
  try {
    const newRoommate = new Roommate(req.body);
    await newRoommate.save();
    res.status(201).json(newRoommate);
  } catch (err) {
    console.error("Error posting roommate ad:", err);
    res.status(500).send("Server Error");
  }
});

// Route to search roommates
app.get("/getrooms", async (req, res) => {
    try {
      return res.json(await Roommate.find());
    } catch (err) {
      console.log(err);
      return res.send("Roommate finding server error");
    }
});

// Add route for making a payment
app.post('/pay', async (req, res) => {
  try {
      const { amount, currency, source, description } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          source,
          description
      });
      res.json(paymentIntent);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing payment' });
  }
});

// Define vote schema
const voteSchema = new mongoose.Schema({
  candidate: String,
});

const Vote = mongoose.model('Vote', voteSchema);

// Route for voting
app.post('/vote', async (req, res) => {
  try {
    const { candidate } = req.body;
    const newVote = new Vote({ candidate });
    await newVote.save();
    res.status(201).json({ message: 'Vote recorded successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/sendLoginCredentials', async (req, res) => {
  try {
    const { email } = req.body;
    const exist = await users.findOne({ email });
    if (!exist) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send email with login credentials
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'maramreddynikhil14@gmail.com', // Enter your Gmail address
        pass: 'rxyzotbzdbpynjdh' // Enter your Gmail password
      }
    });

    let info = await transporter.sendMail({
      from: 'your@gmail.com', // Enter your Gmail address
      to: email,
      subject: 'Your Login Credentials',
      text: `Your login name: ${exist.loginName}\nYour password: ${exist.password}, we recommend you to change your password at edit profile.`,
    });

    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Login credentials sent to your email' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/results', async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: '$candidate', count: { $sum: 1 } } },
    ]);
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post("/compregister", async (req, res) => {
  try {
    const { compname, email, description, lastdate, rounds, compPic } =
      req.body;
    console.log(compname, email, description, lastdate, rounds, compPic);
    const exist = await comps.findOne({ email });
    if (exist) {
      return res.status(200).send("Event has already been registered");
    }
    const existId = await comps.findOne({ compname });
    if (existId) {
      return res
        .status(200)
        .send("This Hall Ticket has already been registered");
    }

    let newUser = new comps({
      compname,
      email,
      description,
      lastdate,
      rounds,
      compPic,
    });
    newUser.save();
    return res.status(200).send("Event Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("eventregister Server Error");
  }
});

// app.get("/getpresentuser", middleware, async (req, res) => {
//   try {
//     const userid = req.loginName;
//     const exist = await users.findById(loginName);
//     return res.status(200).json(exist);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("getpresentuser Server Error");
//   }
// });

app.get("/getcomp", async (req, res) => {
  try {
    return res.json(await comps.find());
  } catch (err) {
    console.log(err);
    return res.send("getcomp server error");
  }
});

app.get("/getbooks", async (req, res) => {
    try {
      return res.json(await Textbook.find());
    } catch (err) {
      console.log(err);
      return res.send("Textbook finding server error");
    }
});
  
// Purchase textbooks
app.post('/purchase', async (req, res) => {
    const { title, author, isbn, amount } = req.body;
    try {
      const textbook = await Textbook.findOne({ isbn: isbn });
      if (textbook && textbook.available) {
        res.json({ message: 'Textbook is available in the library', location: textbook.location });
      } else {
        res.json({ message: 'Textbook is not available in the library', bookstore: textbook.bookstore });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.post("/registercomp", async (req, res) => {
  try {
    const { compname, compId, clgId, salary, studentId, studentname, compPic } =
      req.body;
    const newRegisteration = new appliedcomps({
      compname: compname,
      compId: compId,
      studentname: studentname,
      studentId: studentId,
      clgId: clgId,
      salary: salary,
      compPic: compPic,
    });
    await newRegisteration.save();
    return res.status(200).send("Event Registration Successful");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Login Server Error");
  }
});

app.get("/getpresentuser", middleware, async (req, res) => {
  try {
    const email = req.user.id;
    const exist = await users.findById(email);
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("getpresentuser Server Error");
  }
});

app.get("/indcompprofile/:id", async (req, res) => {
  try {
    const exist = await comps.findById(req.params.id);
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.get("/indregcompprofile/:id", async (req, res) => {
  try {
    const exist = await appliedcomps.findById(req.params.id);
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.get("/getregisteredcompanies", middleware, async (req, res) => {
  try {
    const userid = req.user.id;
    const exist = await appliedcomps.find();
    const filtered = exist.filter((profile) => profile.studentId === userid);
    return res.status(200).json(filtered);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.put("/updatewrittentest/:id", async (req, res) => {
  try {
    const updated = await appliedcomps.findByIdAndUpdate(req.params.id, {
      writtentest: "1",
    });
    return res.status(200).json("Successfully Updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.put("/updatetechnicalround/:id", async (req, res) => {
  try {
    const updated = await appliedcomps.findByIdAndUpdate(req.params.id, {
      technicalround: "1",
    });
    return res.status(200).json("Successfully Updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.put("/updatehrround/:id", async (req, res) => {
  try {
    const updated = await appliedcomps.findByIdAndUpdate(req.params.id, {
      hrround: "1",
    });
    return res.status(200).json("Successfully Updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind comp Server Error");
  }
});

app.get("/indregcompprofilestudent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await appliedcomps.find();
    const filtered = exist.filter((profile) => profile.compId === id);
    return res.status(200).json(filtered);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ind event Server Error");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
