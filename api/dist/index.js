import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
// Charger les variables d'environnement
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = [
    "http://localhost:4200",
    "https://projet-schott-eliott.onrender.com",
];
app.use(express.json({ limit: "10mb" })); // Pour JSON
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Pour form data
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Route de bienvenue
app.get("/", (req, res) => {
    res.json({
        message: "Bienvenue sur l'API V2 avec TypeScript, Express et Prisma",
        version: "2.0.0",
        endpoints: {
            pollutions: "/pollutions",
            users: "/users",
        },
    });
});
// Routes de l'API
app.use("/", routes);
// Middleware de gestion des erreurs (doit être en dernier)
app.use(errorHandler);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
});
export default app;
