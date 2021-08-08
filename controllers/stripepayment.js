const stripe = require("stripe")(
	"sk_test_51J0l2NSEF0BipjQaF9H5Gg8FVc3k1ryBLWhzLpAaSkwdyc3gOsOhTUmOnoVg2Xp3Oc0PrAxxMmAeNrMhmy4GJR0U00k6rsu6KD"
);
const { v4: uuidv4 } = require("uuid");

exports.makepayment = (req, res) => {
	const { price, token } = req.body;

	const idempotencyKey = uuidv4();
	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: price * 100,
					currency: "INR",

					customer: customer.id,
					receipt_email: token.email,
				},
				{ idempotencyKey }
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
};
