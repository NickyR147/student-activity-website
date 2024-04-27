//forgotpassword.js

const router = require("express").Router();
const { User } = require("./usermodel");
const Token = require("./token");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");

// send password link
router.post("/", async (req, res) => {
	try {
		if (!req.body.email)
			return res.status(400).send({ message: "Email is required" });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {
		if (!req.body.password)
			return res.status(400).send({ message: "Password is required" });

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		user.password = req.body.password; // Not hashed, not secure for production!

		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
