import mjml2html from 'mjml';
import nodemailer from 'nodemailer';
import { verificationEmailTemplate } from './mjmlTemplate.js';

export async function sendVerificationEmail(email, token) {
    console.log("Préparation de l'envoi de l'e-mail de vérification à:", email);
    const verificationUrl = `http://localhost:5173/verify?token=${token}`;

    // Utiliser le template depuis emailTemplates.js
    const mjmlTemplate = verificationEmailTemplate(verificationUrl);

    const { html } = mjml2html(mjmlTemplate);

    // Configurer le transporteur d'e-mail
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'cd4007196da7aa',
            pass: '28febd276d0953',
        },
    });

    // Envoyer l'e-mail
    try {
        await transporter.sendMail({
            from: 'no-reply@mailtrap.io',
            to: email,
            subject: 'Vérification de votre compte',
            html: html,
        });
        console.log("E-mail de vérification envoyé à:", email);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
    }
}
