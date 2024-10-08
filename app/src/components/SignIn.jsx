import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate(); // Permet la redirection après connexion

  return (
    <div className="flex items-center justify-center h-auto mt-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await axios.post('http://localhost:3000/login', {
                email: values.email,
                password: values.password
              });
              
              console.log('Sign In Successful:', response.data);
              // Tu peux stocker le token si nécessaire, par exemple dans localStorage :
              // localStorage.setItem('token', response.data.token);

              setSubmitting(false);
              navigate('/dashboard'); // Rediriger vers le tableau de bord ou une autre page
            } catch (error) {
              console.error('Sign In Error:', error.response.data);
              setErrors({ email: 'Invalid email or password' });
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <Field 
                  name="email" 
                  type="email" 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" 
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field 
                  name="password" 
                  type="password" 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" 
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-500 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Not a member? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
