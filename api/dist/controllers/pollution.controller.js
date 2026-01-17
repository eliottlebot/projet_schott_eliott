import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { prisma } from "../lib/prisma.js";
// CREATE - Créer une nouvelle pollution
export const createPollution = asyncHandler(async (req, res) => {
    const { titre, lieu, dateObservation, typePollution, description, latitude, longitude, photoUrl, createdBy, } = req.body;
    if (!titre) {
        throw new ApiError(400, "Le titre est requis");
    }
    const pollution = await prisma.pollution.create({
        data: {
            titre,
            lieu,
            dateObservation: dateObservation ? new Date(dateObservation) : null,
            typePollution,
            description,
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
            photoUrl,
            createdBy,
        },
    });
    res.status(201).json({
        success: true,
        pollution,
    });
});
// READ - Récupérer toutes les pollutions
export const getAllPollutions = asyncHandler(async (req, res) => {
    const pollutions = await prisma.pollution.findMany({
        include: {
            user: {
                select: { nom: true, prenom: true },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(pollutions);
});
// READ - Récupérer une pollution par ID
export const getPollutionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pollution = await prisma.pollution.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!pollution) {
        throw new ApiError(404, "Pollution non trouvée");
    }
    res.status(200).json(pollution);
});
// UPDATE - Mettre à jour une pollution
export const updatePollution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titre, lieu, dateObservation, typePollution, description, latitude, longitude, photoUrl, } = req.body;
    const existingPollution = await prisma.pollution.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!existingPollution) {
        throw new ApiError(404, "Pollution non trouvée");
    }
    const pollution = await prisma.pollution.update({
        where: {
            id: parseInt(id),
        },
        data: {
            titre,
            lieu,
            dateObservation: dateObservation
                ? new Date(dateObservation)
                : undefined,
            typePollution,
            description,
            latitude: latitude ? parseFloat(latitude) : undefined,
            longitude: longitude ? parseFloat(longitude) : undefined,
            photoUrl,
        },
    });
    res.status(200).json({
        success: true,
        data: pollution,
    });
});
// DELETE - Supprimer une pollution
export const deletePollution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existingPollution = await prisma.pollution.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!existingPollution) {
        throw new ApiError(404, "Pollution non trouvée");
    }
    await prisma.pollution.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(200).json({
        success: true,
        message: "Pollution supprimée avec succès",
    });
});
