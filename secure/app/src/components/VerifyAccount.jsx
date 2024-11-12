import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = new URLSearchParams(location.search).get('token'); // Récupère le token depuis l'URL
      try {
        const response = await axios.get(`http://localhost:3000/verify?token=${token}`);
        if (response.data.success) {
            navigate('/signin', { state: { message: 'Votre compte a été vérifié avec succès!' } });
        }
      } catch (error) {
        toast.error('Échec de la vérification.');
      }
    };

    verifyToken();
  }, [location, navigate]);

  return (
    <div>Vérification en cours...</div>
  );
};

export default VerifyAccount;
