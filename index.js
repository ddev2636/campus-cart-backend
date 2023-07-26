import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

//importing middlewares
import notFoundMiddlware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//routes
import authRouter from "./Routes/authRoutes.js";
import thingRouter from "./Routes/itemRoutes.js";
import stripeRouter from "./Routes/stripeRoutes.js";

//inbuile middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());

// Set EJS as templating engine
// app.set("view engine", "ejs");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

// app.post("/", upload.single("image"), (req, res, next) => {
//   var obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgModel.create(obj, (err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // item.save();
//       res.redirect("/");
//     }
//   });
// });

//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/item", thingRouter);
app.use("/api/v1/stripe", stripeRouter);

// app.use(notFoundMiddlware);
//app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
