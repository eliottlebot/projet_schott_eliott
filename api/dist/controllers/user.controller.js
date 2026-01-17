import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { generateJwt, normalizeToken, verifyJwt } from "../utils/jwt-utils.js";
export const getMe = asyncHandler(async (req, res) => {
    const token = normalizeToken(req.cookies.ai_user);
    if (!token)
        throw new ApiError(401, "Non authentifié");
    try {
        const payload = verifyJwt(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, nom: true, prenom: true, login: true },
        });
        if (!user)
            throw new ApiError(404, "Utilisateur introuvable");
        res.status(200).json({ success: true, data: { user } });
    }
    catch {
        throw new ApiError(401, "Token invalide ou expiré");
    }
});
export const createUser = asyncHandler(async (req, res) => {
    const { nom, prenom, login, pass } = req.body;
    if (!nom || !login || !pass) {
        throw new ApiError(400, "Le nom, login et mot de passe sont requis");
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            login,
        },
    });
    if (existingUser) {
        throw new ApiError(400, "Ce login existe déjà");
    }
    const user = await prisma.user.create({
        data: {
            nom,
            prenom,
            login,
            pass,
        },
    });
    const { pass: _, ...userWithoutPassword } = user;
    const token = generateJwt(user.id);
    // Ajouter le nouveau cookie avec le payload correct
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // 1 jour
    });
    res.status(201).json({
        success: true,
        data: {
            user: userWithoutPassword,
            token,
        },
    });
});
export const getUser = asyncHandler(async (req, res) => {
    const { login, pass } = req.body;
    if (!login || !pass) {
        throw new ApiError(400, "Le login et le mot de passe sont requis");
    }
    const user = await prisma.user.findUnique({
        where: { login },
    });
    if (!user) {
        throw new ApiError(401, "Identifiants invalides");
    }
    // ⚠️ Idéal : hasher les mots de passe avec bcrypt
    if (user.pass !== pass) {
        throw new ApiError(401, "Mauvais mot de passe");
    }
    const { pass: _, ...userWithoutPassword } = user;
    const token = generateJwt(user.id);
    // Ajouter le nouveau cookie avec le payload correct
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // 1 jour
    });
    res.status(200).json({
        success: true,
        data: {
            user: userWithoutPassword,
            token,
        },
    });
});
// READ - Récupérer tous les utilisateurs
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    // Retirer les mots de passe
    const usersWithoutPasswords = users.map(({ pass, ...user }) => user);
    res.status(200).json(usersWithoutPasswords);
});
// READ - Récupérer un utilisateur par ID
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("ID utilisateur demandé :", id);
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        throw new ApiError(404, "Utilisateur non trouvé dans getUserById");
    }
    // Ne pas retourner le mot de passe
    const { pass: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
});
// UPDATE - Mettre à jour un utilisateur
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nom, prenom, login, pass } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!existingUser) {
        throw new ApiError(404, "Utilisateur non trouvé");
    }
    // Si le login change, vérifier qu'il n'existe pas déjà
    if (login && login !== existingUser.login) {
        const userWithSameLogin = await prisma.user.findUnique({
            where: {
                login,
            },
        });
        if (userWithSameLogin) {
            throw new ApiError(400, "Ce login existe déjà");
        }
    }
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            nom,
            prenom,
            login,
            pass, // Note: En production, il faudrait hasher le mot de passe
        },
    });
    // Ne pas retourner le mot de passe
    const { pass: _, ...userWithoutPassword } = user;
    res.status(200).json({
        success: true,
        data: userWithoutPassword,
    });
});
// DELETE - Supprimer un utilisateur
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existingUser = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!existingUser) {
        throw new ApiError(404, "Utilisateur non trouvé");
    }
    await prisma.user.delete({
        where: {
            id,
        },
    });
    res.status(200).json({
        success: true,
        message: "Utilisateur supprimé avec succès",
    });
});
