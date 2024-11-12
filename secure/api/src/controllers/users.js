import User from "../models/users.js";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../utils/emailUtils.js";

async function generateID(id) {
	const { count } = await findAndCountAllUsersById(id);
	if (count > 0) {
		id = id.substring(0, 5);
		const { count } = await findAndCountAllUsersById(id);
		id = id + (count + 1);
	}
	return id;
}

export async function getUsers() {
	return await User.findAll();
}
export async function getUserById(id) {
	return await User.findByPk(id);
}
export async function findAndCountAllUsersById(id) {
	return await User.findAndCountAll({
		where: {
			id: {
				[Op.like]: `${id}%`,
			},
		},
	});
}
export async function findAndCountAllUsersByEmail(email) {
	return await User.findAndCountAll({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});
}
export async function findAndCountAllUsersByUsername(username) {
	return await User.findAndCountAll({
		where: {
			username: {
				[Op.eq]: username,
			},
		},
	});
}

// REGISTER ........................................................................
//..................................................................................
export async function registerUser(userDatas, bcrypt) {
	if (!userDatas) {
		return { error: "Aucune donnée à enregistrer" };
	}
	const { firstname, lastname, username, email, password } = userDatas;
	if (!firstname || !lastname || !username || !email || !password) {
		return { error: "Tous les champs sont obligatoires" };
	}
	// Vérification que l'email n'est pas déjà utilisé
	const { count: emailCount } = await findAndCountAllUsersByEmail(email);
	if (emailCount > 0) {
		return { error: "L'adresse email est déjà utilisée." };
	}

	// Vérification que le pseudo n'est pas déjà utilisé
	const { count: usernameCount } = await findAndCountAllUsersByUsername(username);
	if (usernameCount > 0) {
		return { error: "Le nom d'utilisateur est déjà utilisé." };
	}

	// Création de l'identifiant
	let id = await generateID(
		(lastname.substring(0, 3) + firstname.substring(0, 3)).toUpperCase()
	);
	// Hashage du mot de passe
	const hashedPassword = await bcrypt.hash(password);

	// Création de l'utilisateur dans la base de données
	const user = {
		id,
		firstname,
		lastname,
		username,
		email,
		password: hashedPassword,
		verified: false // Assurez-vous d'ajouter le champ vérifié ici
	};

	const createdUser = await User.create(user); // Sauvegarde l'utilisateur
	console.log("Utilisateur créé avec succès:", createdUser);

	// Générer un token de vérification
	console.log("Génération du token de vérification...");
	const token = jwt.sign({ email: createdUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
	console.log("Token genere:  ",token);
	// Envoyer l'e-mail de vérification
	await sendVerificationEmail(createdUser.email, token);
	return { success: true, message: "Utilisateur enregistré. Un e-mail de vérification a été envoyé." };
}

//Login ......................................................................................................
//............................................................................................................
export async function loginUser(userDatas, app) {
	if (!userDatas) {
		return { error: "Aucune donnée n'a été envoyée" };
	}
	const { email, password } = userDatas;
	if (!email || !password) {
		return { error: "Tous les champs sont obligatoires" };
	}
	//vérification que l'email est utilisé
	const { count, rows } = await findAndCountAllUsersByEmail(email);
	if (count === 0) {
		return {
			error: "Il n'y a pas d'utilisateur associé à cette adresse email.",
		};
	} else if (rows[0].verified === false) {
		return {
			error: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre boîte mail.",
		};
	}
	//récupération de l'utilisateur
	const user = await User.findOne({
		where: {
			email: {
				[Op.eq]: email,
			},
		},
	});
	//comparaison des mots de passe
	const match = await app.bcrypt.compare(password, user.password);
	if (!match) {
		return { error: "Mot de passe incorrect" };
	}
	// Générer le JWT après une authentification réussie
	const token = app.jwt.sign(
		{ id: user.id, username: user.username },
		{ expiresIn: "3h" }
	);
	return {
		token,
		user: {
			id: user.id,
			username: user.username
		},
	};
	
}

export async function updateUserVerification(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Utilisateur non trouvé.');
    }

    // Mark the user as verified
    user.verified = true;
    await user.save();
}

