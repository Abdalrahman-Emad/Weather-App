// import React, { useState } from 'react';
// import { signIn } from '../../utils/authFunctions';
// import sunnyBg from '../../assets/sunny-bg.jpg'; 


// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signIn(email, password);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen bg-cover bg-center flex items-center justify-center" 
//       style={{ backgroundImage: `url(${sunnyBg})` }}
//     >
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Sign In</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
//           >
//             Sign In
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">Don't have an account?</p>
//           <a href="/signUp" className="text-blue-600 hover:underline">Sign Up</a>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SignIn;




import React, { useState } from 'react';
import { signIn, signInWithGoogle } from '../../utils/authFunctions';
import sunnyBg from '../../assets/sunny-bg.jpg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${sunnyBg})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors font-bold mb-4"
          >
            Sign In with Google
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <a href="/signUp" className="text-blue-600 hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
