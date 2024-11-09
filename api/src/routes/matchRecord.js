// routes/matchRecord.js
import { updateMatchRecord, getMatches } from "../controllers/matchRecord.js";

export function matchRecordRoutes(app) {
    // Route pour mettre à jour le score entre deux joueurs
    app.post(
        "/match/update",
        { preHandler: [app.authenticate] },
        async (request, reply) => {
            const { winnerId, loserId } = request.body;
            reply.send(await updateMatchRecord(winnerId, loserId));
        }
    );


    // Récupération de la liste des utilisateurs
	app.get("/matches", async (request, reply) => {
		try {
			const matches = await getMatches();
			reply.send(matches);
		} catch (error) {
			reply.status(500).send({ error: "Failed to retrieve matches" });
		}
	});
}
