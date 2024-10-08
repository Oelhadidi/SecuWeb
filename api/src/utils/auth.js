import jwt from 'jsonwebtoken';

// Fonction pour générer un token JWT
export function generateToken(user) {
	return jwt.sign(
		{ id: user.id, email: user.email }, // Payload
		process.env.JWT_SECRET,             
		{ expiresIn: '1h' }                 
	);
}

// Fonction pour vérifier un token JWT
export function verifyToken(token) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
	} catch (err) {
		throw new Error('Invalid or expired token');
	}
}

export async function authenticate(request, reply) {
	const authorizationHeader = request.headers.authorization;

	if (!authorizationHeader) {
		return reply.status(401).send({ error: 'No token provided' });
	}

	const token = authorizationHeader.split(' ')[1]; // Récupération du token

	try {
		const decoded = verifyToken(token); // Vérification du token
		request.user = decoded;             // Stocker l'utilisateur décodé dans la requête
	} catch (err) {
		reply.status(401).send({ error: 'Unauthorized' });
	}
}