const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log(`Server Running! on PORT: ${PORT}`));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "saxenasaksham46@gmail.com",
    pass: "xffuskcubnqofcmg",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstname + req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "saxenasaksham46@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `
        <p>name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
