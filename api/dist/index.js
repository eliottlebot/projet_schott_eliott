import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
// Charger les variables d'environnement
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Configuration CORS
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization",
    exposedHeaders: "Authorization",
};
app.use(cors(corsOptions));
// Middleware pour parser le JSON
app.use(express.json());
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
