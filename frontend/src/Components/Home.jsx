// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Navigation */}
//       <nav className="flex justify-between items-center p-6">
//         <div className="text-2xl font-bold text-indigo-600">Logo</div>
//         <div className="space-x-4">
//           <button 
//             onClick={() => navigate('/login')}
//             className="px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-all"
//           >
//             Sign In
//           </button>
//           <button 
//             onClick={() => navigate('/register')}
//             className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="flex-grow container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
//         <div className="md:w-1/2 mb-12 md:mb-0">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
//             Build amazing things <span className="text-indigo-600">faster</span>
//           </h1>
//           <p className="text-lg text-gray-600 mb-8">
//             Our platform helps you achieve your goals with powerful tools and an intuitive interface.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={() => navigate('/register')}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
//             >
//               Start Free Trial
//             </button>
//             <button
//               onClick={() => navigate('/login')}
//               className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
//             >
//               Existing User? Sign In
//             </button>
//           </div>
//         </div>
//         <div className="md:w-1/2 flex justify-center">
//           <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
//             {/* Placeholder for hero image/illustration */}
//             <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
//               <span className="text-white text-xl">App Preview</span>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { icon: "⚡", title: "Lightning Fast", desc: "Optimized for speed and performance" },
//               { icon: "🔒", title: "Secure", desc: "Enterprise-grade security" },
//               { icon: "🔄", title: "Easy Integration", desc: "Works with your existing tools" }
//             ].map((feature, index) => (
//               <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all">
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 bg-gray-800 text-white">
//         <div className="container mx-auto px-6 text-center">
//           <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;    


import React from "react";
import { Link } from "react-router-dom";
import Cookie from 'js-cookie'


const Home=()=>{
    const accesstoken=Cookie.get('accesstoken')


    return (
        <div className="flex  min-h-screen  flex-col">
            <nav className="bg-gray-300 flex justify-between items-center px-5 py-9 ">
                <img className="w-40" src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222.png"/>
                {accesstoken && (
                    <div className="grid grid-cols-2 gap-5 text-center">
                        <Link className="bg-gray-500 hover:bg-gray-400 text-white font-bold px-3 py-2 " to={'/'}>Home</Link>
                        <Link className="bg-gray-500 hover:bg-gray-400 text-white font-bold px-3 py-2 "  to={'/dashboard'}>Dashboard</Link>
                        
                    </div>
                )}
            </nav>


            <div className="  mx-auto flex items-center min-h-screen ">
                <div className="bg-gray-200 p-5 rounded-md ">
                    <h1 className="text-5xl mb-10 font-bold text-gray-600">Welcome To Tailwebs</h1>
                    {!accesstoken && (
                        <div className="flex justify-evenly">
                        <Link to={'/register'} className="bg-green-500 px-4 py-3 text-white font-medium rounded ">Register</Link>
                <Link className="bg-red-500 px-4 py-3 text-white font-medium rounded" to={'/login'}>Login</Link>

                    </div>

                    )}
                    
                
            </div>

            </div>
            

        </div>
    )
}

export default Home;