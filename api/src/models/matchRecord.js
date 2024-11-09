import { DataTypes } from "@sequelize/core";
import { sequelize } from "../bdd.js";
import User from "./users.js";

const MatchRecord = sequelize.define("matchRecord", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    player1Wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    player2Wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Définir les relations pour le joueur 1 et le joueur 2
MatchRecord.belongsTo(User, { foreignKey: "player1Id", as: "player1" });
MatchRecord.belongsTo(User, { foreignKey: "player2Id", as: "player2" });

export default MatchRecord;
