const express = require("express");
const axios = require("axios");
const { addAbortSignal } = require("stream");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv").config();
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
			Authorization: `Bearer ${process.env.TOKEN}`,
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
			res.send({ message: "KO", error: error });
			res.status(400);
		});
});
app.post("/services", (req, res) => {
	const data = req.body;
	const axios = require("axios");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://api.hsforms.com/submissions/v3/integration/secure/submit/39551391/1f2bf0c8-f44f-4480-bc28-85f75ba2d142",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.TOKEN}`,
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
			res.send({ message: "KO", error: error });
			res.status(400);
		});
});
app.post("/careers", (req, res) => {
	const data = req.body;
	const axios = require("axios");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://api.hsforms.com/submissions/v3/integration/secure/submit/39551391/b7e817f7-c366-41ea-8da5-401b854d878d",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.TOKEN}`,
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
			res.send({ message: "KO", error: error });
			res.status(400);
		});
});
app.post("/expertise", (req, res) => {
	const data = req.body;
	const axios = require("axios");

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://api.hsforms.com/submissions/v3/integration/secure/submit/39551391/29e1f1c9-57fc-4694-89db-61d9f4bf0ef8",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.TOKEN}`,
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
			res.send({ message: "KO", error: error });
			res.status(400);
		});
});

app.get("/", (req, res) => {
	// We will be coding here

	const datosForm = req.body;

	console.log(req.body);

	res.sendFile(__dirname + "/index.html");
});

app.listen(5000, () => console.log("Server started at http://localhost:5000"));
