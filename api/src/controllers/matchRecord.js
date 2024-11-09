import MatchRecord from "../models/matchRecord.js";
import { Op } from "sequelize";

export async function updateMatchRecord(winnerId, loserId) {
    // Rechercher une ligne de match où les deux joueurs ont déjà joué l'un contre l'autre, peu importe l'ordre
    let match = await MatchRecord.findOne({
        where: {
            [Op.or]: [
                { player1Id: winnerId, player2Id: loserId },
                { player1Id: loserId, player2Id: winnerId }
            ]
        },
    });

    if (!match) {
        // Si aucune ligne n'existe pour ces deux joueurs, créer une nouvelle entrée
        match = await MatchRecord.create({
            player1Id: winnerId,
            player2Id: loserId,
            player1Wins: 1,
            player2Wins: 0,
        });
    } else {
        // Incrémenter les victoires pour le gagnant
        if (match.player1Id === winnerId) {
            match.player1Wins += 1;
        } else {
            match.player2Wins += 1;
        }
        await match.save();
    }
}

export async function getMatches() {
    return await MatchRecord.findAll();
}
