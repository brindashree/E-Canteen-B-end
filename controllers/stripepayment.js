const stripe = require("stripe")(
	"sk_test_51J0l2NSEF0BipjQaPslPOxpSRBOXAycLbARnIs9dzVFUx31MgIvvkjLrbqaX8PdHxhBOHUhXlvqugMU0yp7e7sgl00LfLoFSpR"
);
const { v4: uuidv4 } = require("uuid");

exports.makepayment = (req, res) => {
	const { products, price, token } = req.body;

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
