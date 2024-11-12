export const verificationEmailTemplate = (verificationUrl) => `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="Arial, sans-serif" color="#555" font-size="16px" />
      <mj-button background-color="#007BFF" color="white" font-size="16px" padding="15px" border-radius="5px" />
    </mj-attributes>
    <mj-style>
      @media only screen and (max-width: 600px) {
        .body-section {
          padding: 10px !important;
        }
      }
    </mj-style>
  </mj-head>

  <mj-body background-color="#f4f4f4">
    <!-- Section avec logo -->
    <mj-section padding="20px" background-color="#ffffff">
      <mj-column width="100%">
        <mj-image src="https://cdn.pixabay.com/photo/2024/04/29/10/26/gaming-8727562_1280.jpg" alt="Logo" width="150px" />
      </mj-column>
    </mj-section>

    <!-- Corps principal -->
    <mj-section padding="20px" background-color="#ffffff" css-class="body-section">
      <mj-column>
        <mj-text align="center" font-size="20px" font-weight="bold">
          Bienvenue à Game Vite !
        </mj-text>
        <mj-text align="center" padding="10px 25px">
          Merci de vous être inscrit à notre Game Vite. Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail et compléter votre inscription.
        </mj-text>
        <mj-button href="${verificationUrl}" align="center" padding="20px 0">
          Vérifier mon compte
        </mj-button>
        <mj-text align="center" font-size="12px" color="#999" padding="10px 25px">
          Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail en toute sécurité.
        </mj-text>
      </mj-column>
    </mj-section>

    <!-- Section de pied de page -->
    <mj-section padding="20px" background-color="#ffffff">
      <mj-column width="100%">
        <mj-text align="center" font-size="12px" color="#999">
          © 2024 ELHADIDI Omar. Tous droits réservés.<br />
          <a href="https://example.com" style="color: #007BFF; text-decoration: none;">Politique de confidentialité</a> | <a href="https://example.com" style="color: #007BFF; text-decoration: none;">Conditions d'utilisation</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
