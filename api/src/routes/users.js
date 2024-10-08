import {
	getUserById,
	getUsers,
	loginUser,
	registerUser,
} from "../controllers/users.js";
import { generateToken, verifyToken } from "../utils/auth.js";

export function usersRoutes(app) {
	app.post("/login", async (request, reply) => {
		try {
			const user = await loginUser(request.body, app);
			if (!user) {
				return reply.status(401).send({ error: "Invalid email or password" });
			}
			// Génération du token JWT
			const token = generateToken(user);
			reply.send({ token, user });
		} catch (error) {
			reply.status(500).send({ error: "An error occurred during login" });
		}
	});
	app.post("/logout", { preHandler: [app.authenticate] }, async (request, reply) => {
		try {
			const token = request.headers["authorization"].split(" ")[1]; // Récupérer le token depuis l'en-tête Authorization
			blacklistedTokens.push(token); // Ajouter le token à la liste noire
			reply.send({ logout: true });
		} catch (error) {
			reply.status(500).send({ error: "Logout failed" });
		}
	});

	// Inscription
	app.post("/register", async (request, reply) => {
		try {
			const result = await registerUser(request.body, app.bcrypt);
			reply.send(result);
		} catch (error) {
			reply.status(500).send({ error: "An error occurred during registration" });
		}
	});

	// Récupération de la liste des utilisateurs
	app.get("/users", async (request, reply) => {
		try {
			const users = await getUsers();
			reply.send(users);
		} catch (error) {
			reply.status(500).send({ error: "Failed to retrieve users" });
		}
	});

	// Récupération d'un utilisateur par son ID
	app.get("/users/:id", async (request, reply) => {
		try {
			const user = await getUserById(request.params.id);
			if (!user) {
				return reply.status(404).send({ error: "User not found" });
			}
			reply.send(user);
		} catch (error) {
			reply.status(500).send({ error: "An error occurred" });
		}
	});
}
