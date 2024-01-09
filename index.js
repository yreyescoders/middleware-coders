const express = require("express");
const axios = require("axios");
const { addAbortSignal } = require("stream");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fs = require("fs");
const OpenAI = require("openai");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
var request = require("request");
var FormData = require("form-data");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(cors());

// default options
app.use(fileUpload());

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

app.post("/upload", async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	const sampleFile = req.files.file;
	console.log(sampleFile);
	const fileOptions = {
		access: "PUBLIC_INDEXABLE",
		ttl: "P3M",
		overwrite: false,
		duplicateValidationStrategy: "NONE",
		duplicateValidationScope: "ENTIRE_PORTAL",
	};

	const data = new FormData();
	//.append("file", sampleFile.data);
	data.append("file", sampleFile.data, sampleFile.name);
	data.append("folderId", "152332940387");
	data.append(
		"options",
		'{\n  "access": "PUBLIC_INDEXABLE",\n  "ttl": "P3M",\n  "overwrite": false,\n  "duplicateValidationStrategy": "NONE",\n  "duplicateValidationScope": "ENTIRE_PORTAL"\n}\n',
		{ contentType: "application/json" }
	);

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://api.hubapi.com/files/v3/files",
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`,
			...data.getHeaders(),
		},
		data: data,
	};

	axios
		.request(config)
		.then((response) => {
			console.log(response.status);
			if (response.status === 201) {
				res.send({ message: "OK", data: response.data });
			} else {
				res.send(JSON.stringify(response.data));
			}
		})
		.catch((error) => {
			res.send(error);
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

	console.log(data);
	//res.send({ message: data, error: "error" });
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

	res.sendFile(__dirname + "/index.html");
});
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.post("/api/chatbot", async (req, res) => {
	const { message } = req.body;

	const apiKey = process.env.OPENAI_API_KEY;
	const model = "gpt-3.5-turbo";
	const apiUrl = "https://api.openai.com/v1/chat/completions";

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`,
	};

	try {
		const response = await axios.post(
			apiUrl,
			{
				model: model,
				messages: [
					{
						role: "system",
						content:
							'Tu eres el asistente de inteligencia artificial de CodersLab. Puedes llamarme "AI Assistant". Estoy aquí para brindarte información y responder tus preguntas sobre CodersLab y sus servicios. ¿En qué puedo ayudarte hoy?',
					},
					{
						role: "user",
						content: "servicios de coderslab",
					},
					{
						role: "assistant",
						content:
							"Desarrollo Web\nSAP\nClosed Project\nBPO\nCloud development\nDigital factory\nDigital Operation\nSolution Architecture\nDevSecOps\nPrograma API\nImpulsado por datos\nFinanzas abiertas\nArquitectura digital\nStaffing\nExternalización\nCaza de talentos\nAlcance del producto",
					},
					{
						role: "assistant",
						content:
							"Integración de sistemas\nDesarrollo de aplicaciones móviles\nConsultoría tecnológica\nInteligencia artificial\nBig Data\nDesarrollo de software a medida\nDiseño de experiencia de usuario (UX)\nDesarrollo de comercio electrónico\nDigitalización de procesos\nGestión de proyectos\nSeguridad de la información\nConsultoría en transformación digital\nMantenimiento y soporte técnico.",
					},
					{
						role: "assistant",
						content:
							"Estos son algunos de los servicios que ofrece CodersLab:\n\n1. Desarrollo web: CodersLab ofrece servicios de desarrollo web, incluyendo diseño y desarrollo de sitios web responsivos, aplicaciones web y comercio electrónico.\n\n2. SAP: CodersLab cuenta con experiencia en sistemas SAP, ofreciendo servicios de implementación, consultoría y soporte técnico.\n\n3. Closed Project: CodersLab proporciona servicios de desarrollo de software a medida para proyectos cerrados, adaptándose a las necesidades específicas de cada cliente.\n\n4. BPO: CodersLab ofrece servicios de externalización de procesos de negocio (BPO) para diferentes áreas como atención al cliente, procesamiento de datos, soporte técnico, entre otros.\n\n5. Cloud development: CodersLab brinda servicios de desarrollo y migración de aplicaciones a entornos de nube, permitiendo aprovechar los beneficios de la escalabilidad y la flexibilidad.\n\n6. Digital factory: CodersLab ayuda a las empresas a establecer operaciones digitales eficientes y ágiles, mediante la implementación de metodologías de desarrollo y gestión de proyectos.\n\n7. Digital Operation: CodersLab brinda servicios de optim",
					},
					{
						role: "user",
						content: "link del stack ",
					},
					{
						role: "assistant",
						content:
							"Tech Stack:\nAngular: https://coderslab.io/find-developers/angular\nReact: https://coderslab.io/find-developers/react-js\nVue: https://coderslab.io/find-developers/vue-js\nJava: https://coderslab.io/find-developers/java-tech\n.NET: https://coderslab.io/find-developers/dot-net\nPHP: https://coderslab.io/find-developers/php\nPython: https://coderslab.io/find-developers/python\nNode.js: https://coderslab.io/find-developers/node-js\nRuby: https://coderslab.io/find-developers/ruby\nGolang: https://coderslab.io/find-developers/golang\nRust: https://coderslab.io/find-developers/rust\nAndroid: https://coderslab.io/find-developers/android\niOS: https://coderslab.io/find-developers/ios-mobile\nReact Native: https://coderslab.io/find-developers/react-native\nFlutter: https://coderslab.io/find-developers/flutter",
					},
					{
						role: "assistant",
						content:
							"Aquí tienes los enlaces a las páginas donde puedes encontrar desarrolladores en diferentes tecnologías:\n\nAngular: [Enlace](https://coderslab.io/find-developers/angular)\n\nReact: [Enlace](https://coderslab.io/find-developers/react-js)\n\nVue: [Enlace](https://coderslab.io/find-developers/vue-js)\n\nJava: [Enlace](https://coderslab.io/find-developers/java-tech)\n\n.NET: [Enlace](https://coderslab.io/find-developers/dot-net)\n\nPHP: [Enlace](https://coderslab.io/find-developers/php)\n\nPython: [Enlace](https://coderslab.io/find-developers/python)\n\nNode.js: [Enlace](https://coderslab.io/find-developers/node-js)\n\nRuby: [Enlace](https://coderslab.io/find-developers/ruby)\n\nGolang: [Enlace](https://coderslab.io/find-developers/golang)\n\nRust: [Enlace](https://coderslab.io/find-developers/rust)\n\nAndroid: [Enlace](https://coderslab.io/find-developers/android)\n\niOS: [Enlace](https://coderslab.io/find-developers/ios-mobile)\n\n",
					},
					{
						role: "user",
						content: "Link de las industrias o expertisias ",
					},
					{
						role: "assistant",
						content:
							"Expertise:\n\nFinancial Services: https://coderslab.io/expertise/financial-services\nHealthcare: https://coderslab.io/expertise/healthcare\nLogistics: https://coderslab.io/expertise/logistics\nRetail: https://coderslab.io/expertise/retail\nTelecom: https://coderslab.io/expertise/telecom\nAutomotive: https://coderslab.io/expertise/automotive",
					},
					{
						role: "assistant",
						content:
							"Aquí tienes los enlaces a las páginas donde puedes encontrar más información sobre las industrias o áreas de experticia de CodersLab:\n\nServicios financieros: [Enlace](https://coderslab.io/expertise/financial-services)\n\nSalud: [Enlace](https://coderslab.io/expertise/healthcare)\n\nLogística: [Enlace](https://coderslab.io/expertise/logistics)\n\nVenta al por menor: [Enlace](https://coderslab.io/expertise/retail)\n\nTelecomunicaciones: [Enlace](https://coderslab.io/expertise/telecom)\n\nAutomotriz: [Enlace](https://coderslab.io/expertise/automotive)",
					},
					{
						role: "user",
						content: "Link de los servicios ",
					},
					{
						role: "assistant",
						content:
							"Services:\n\nWeb Development: https://coderslab.io/services/development-services/web-development/\nSAP: https://coderslab.io/services/development-services/sap/\nClosed Project: https://coderslab.io/services/development-services/closed-project/\nBPO: https://coderslab.io/services/development-services/bpo/\nCloud Development: https://coderslab.io/services/engineering-services/cloud-development/\nDigital Factory: https://coderslab.io/services/engineering-services/digital-factory/\nDigital Operation: https://coderslab.io/services/engineering-services/digital-operation/\nSolution Architecture: https://coderslab.io/services/engineering-services/solution-architecture/\nDevSecOps: https://coderslab.io/services/devsecops/\nAPI Program: https://coderslab.io/services/design-services/api-program/\nData-Driven: https://coderslab.io/services/design-services/data-driven\nOpen Finance: https://coderslab.io/services/design-services/open-finance\nDigital Architecture Program: https://coderslab.io/services/design-services/digital-architecture\nStaffing: https://coderslab.io/services/digital-talent/staffing\nOutsourcing: https://coderslab.io/services/digital-talent/out-sourcing\nHunting: https://coderslab.io/services/digital-talent/hunting\nProduct Scope: https://coderslab.io/services/digital-talent/product-scope",
					},
					{
						role: "assistant",
						content:
							"Aquí tienes los enlaces a las páginas donde puedes encontrar más información sobre los servicios de CodersLab:\n\nDesarrollo web: [Enlace](https://coderslab.io/services/development-services/web-development/)\n\nSAP: [Enlace](https://coderslab.io/services/development-services/sap/)\n\nProyecto cerrado: [Enlace](https://coderslab.io/services/development-services/closed-project/)\n\nBPO: [Enlace](https://coderslab.io/services/development-services/bpo/)\n\nDesarrollo en la nube: [Enlace](https://coderslab.io/services/engineering-services/cloud-development/)\n\nFactoría digital: [Enlace](https://coderslab.io/services/engineering-services/digital-factory/)\n\nOperación digital: [Enlace](https://coderslab.io/services/engineering-services/digital-operation/)\n\nArquitectura de soluciones: [Enlace](https://coderslab.io/services/engineering-services/solution-architecture/)\n\nDevSecOps: [Enlace](https://coderslab.io/services/devsecops/)\n\nPrograma de API: [Enlace](https://coderslab.io/services/design-services/api-program/)\n\nImp",
					},
					{
						role: "assistant",
						content:
							"Lamentablemente, soy un asistente de inteligencia artificial y no tengo acceso directo a enlaces externos. Sin embargo, puedes visitar el sitio web de CodersLab en coderslab.io para obtener más información sobre sus servicios. En el sitio web encontrarás detalles sobre los diferentes servicios que ofrecen, así como información de contacto para comunicarte con ellos directamente.",
					},
					{
						role: "user",
						content: "acerca de la compañia o empresa ",
					},
					{
						role: "assistant",
						content:
							"Company:\n\nAbout Us: https://coderslab.io/about\nPartnerships: https://coderslab.io/partnerships\nEvents: https://coderslab.io/events-articles/events\nRRHH: https://coderslab.io/rrhh\nCareers: https://coderslab.io/careers\nOur Staff: https://coderslab.io/staff\nBlog: https://coderslab.io/blog",
					},
					{
						role: "assistant",
						content:
							"CodersLab es una empresa de tecnología y desarrollo de software que ofrece una amplia gama de servicios a sus clientes. Aquí tienes algunos enlaces donde puedes obtener más información sobre la compañía:\n\nAcerca de nosotros: [Enlace](https://coderslab.io/about)\n\nAlianzas: [Enlace](https://coderslab.io/partnerships)\n\nEventos: [Enlace](https://coderslab.io/events-articles/events)\n\nRecursos Humanos: [Enlace](https://coderslab.io/rrhh)\n\nCarreras: [Enlace](https://coderslab.io/careers)\n\nNuestro equipo: [Enlace](https://coderslab.io/staff)\n\nBlog: [Enlace](https://coderslab.io/blog)\n\nEn estos enlaces encontrarás información detallada sobre la empresa, sus valores, su enfoque en la innovación y el talento, así como la cultura de la empresa y las oportunidades de empleo. También podrás explorar su blog para obtener información adicional sobre tendencias tecnológicas, consejos y experiencias compartidas por el equipo de CodersLab.",
					},
					{
						role: "user",
						content: "contanto de los agentes ",
					},
					{
						role: "assistant",
						content:
							"Contact our agents in Latam.\nLatam\nEnrique González\n\nGerente comercial\n\n\nenrique.gonzales@coderslab.io\n\nArgentina-Uruguay\nGabriela Rengifo\n\nSales & strategic partnerships\n\n\ngabriela.rengifo@coderslab.io\n\nArgentina-Uruguay\nPablo Lopez\n\nKey account manager\n\n\npablo.lopez@coderslab.io\n\nPerú-Chile\nGustavo Uría Área\n\nKey account manager\n\n\ngustavo.uria@coderslab.io\n\nColombia-Ecuador\nLunis Gonzalez\n\nKey account manager\n\n\nlunis.gonzalez@coderslab.io\n\nEcuador-Uruguay\nCarlos Romo\n\nKey account manager\n\n\ncarlos.romo@coderslab.io",
					},
					{
						role: "assistant",
						content:
							"Ponte en contacto con nuestros agentes en América Latina:\n\nEnrique González\nGerente Comercial\nCorreo electrónico: enrique.gonzales@coderslab.io\n\nGabriela Rengifo\nVentas y Alianzas Estratégicas\nCorreo electrónico: gabriela.rengifo@coderslab.io\n\nPablo Lopez\nGerente de Cuentas Clave\nCorreo electrónico: pablo.lopez@coderslab.io\n\nGustavo Uría Área\nGerente de Cuentas Clave\nCorreo electrónico: gustavo.uria@coderslab.io\n\nLunis Gonzalez\nGerente de Cuentas Clave\nCorreo electrónico: lunis.gonzalez@coderslab.io\n\nCarlos Romo\nGerente de Cuentas Clave\nCorreo electrónico: carlos.romo@coderslab.io\n\nEstos son algunos de nuestros agentes en América Latina. No dudes en ponerte en contacto con ellos para obtener más información o discutir cualquier consulta comercial.",
					},
					{
						role: "user",
						content: "Oficinas y locaciones ",
					},
					{
						role: "assistant",
						content:
							"These are our offices and locations:\n\nChile:\nAV Apoquindo 4700 Piso 11, Las Condes\n\nEcuador:\nEdificio Metropolitan Oficina 1403, Av. Naciones Unidas E2-30, Quito\n\nUSA:\n166 Geary St. 15th Floor, #45, San Francisco, California 94108\n\nBogotá:\nAv Carrera 19 #100-45 Piso 8, 11, 13, Bogotá, Colombia\n\nArgentina:\nAvda. Leandro N. Alem 734, Piso 5to., Oficina 16, C.A.B.A. (1001)\n\nUruguay:\nEjido 1275 Oficina 610, Montevideo\n\nMexico:\nBlvd. Palmas Hills 1, Valle de las Palmas, Huixquilucan\n\nPeru:\nAvenida Jose Larco 1232, Miraflores, Lima\n\nPanama:\nBMW Plaza, Calle 50, Piso 10, San Francisco, Ciudad de Panamá, Panama\n\nGuatemala:\nEdificio INSIGNE, Boulevard Vista Hermosa, Guatemala City\n\nYou can contact us at +56 9 3275 7428 or email us at del@coderslab.io for any further inquiries.",
					},
					{
						role: "user",
						content: "quien eres?",
					},
					{
						role: "assistant",
						content:
							'Soy un asistente de inteligencia artificial creado por CodersLab. Estoy aquí para brindarte información y responder tus preguntas sobre CodersLab y sus servicios. Puedes llamarme "AI Assistant". ¿En qué más puedo ayudarte?',
					},
					{
						role: "user",
						content: message,
					},
				],
				temperature: 1,
				max_tokens: 1024,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			},
			{ headers }
		);

		const assistantResponse = response.data.choices[0].message.content;

		const trimmedReply = assistantResponse ? assistantResponse.trim() : "";

		res.json({ reply: trimmedReply });
	} catch (error) {
		if (error.response) {
			// El servidor respondió con un código de estado fuera del rango 2xx
			console.error("Error en la respuesta del servidor:", error.response.data);
			res
				.status(error.response.status)
				.json({ error: "Error en la respuesta del servidor" });
		} else if (error.request) {
			// La solicitud se hizo pero no se recibió respuesta
			console.error("No se recibió respuesta del servidor:", error.request);
			res.status(500).json({ error: "No se recibió respuesta del servidor" });
		} else {
			// Algo sucedió en la configuración de la solicitud que causó el error
			console.error("Error de configuración de la solicitud:", error.message);
			res.status(500).json({ error: "Error de configuración de la solicitud" });
		}
	}
});

app.listen(443, () => console.log("Server started at http://localhost:443"));
