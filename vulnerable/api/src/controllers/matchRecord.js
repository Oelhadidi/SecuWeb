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


export async function getMatchRecord(player1id, player2id) {
    // Vérification des paramètres
    if (!player1id || !player2id) {
        return ({ error: "Player IDs are required" });
    }

    const match = await MatchRecord.findOne({
        where: {
            [Op.or]: [
                { player1Id: player1id, player2Id: player2id },
                { player1Id: player2id, player2Id: player1id }
            ]
        }
    });
    return match;
}
