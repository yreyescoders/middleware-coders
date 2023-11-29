const express = require("express");
const axios = require("axios");
const { addAbortSignal } = require("stream");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/subscription", (req, res) => {
	const data = req.body;
	const axios = require("axios");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://api.hsforms.com/submissions/v3/integration/secure/submit/39551391/a3a2dc8e-37b3-46ca-9cc1-295d181cad87",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer pat-na1-233392eb-0d28-4028-8ccd-d577ece3f431",
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			//res.send({ message: "OK" });
			//res.status(200);
			res.send(JSON.stringify(response.data));
		})
		.catch((error) => {
			res.send({ message: "KO" });
			res.status(400);
			console.log(error);
		});
});

app.listen(5000, () => console.log("Server started at http://localhost:5000"));
