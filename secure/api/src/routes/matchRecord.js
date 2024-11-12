// routes/matchRecord.js
import { updateMatchRecord, getMatches, getMatchRecord } from "../controllers/matchRecord.js";

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


    // Récupération de la liste des matches
	app.get("/matches", async (request, reply) => {
		try {
			const matches = await getMatches();
			reply.send(matches);
		} catch (error) {
			reply.status(500).send({ error: "Failed to retrieve matches" });
		}
	});

    // Récuperation des scores d'un match
    app.get("/match/record", { preHandler: [app.authenticate] }, async (request, reply) => {
        const player1Id = request.query.player1Id ;
        const player2Id = request.query.player2Id ;
        const matchRecord = await getMatchRecord(player1Id, player2Id);
        reply.send(matchRecord);
    });
}
