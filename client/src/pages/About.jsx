import React from 'react';
import { FiGithub, FiMapPin, FiMail, FiCode,FiPhone } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-1xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About The Developer</h1>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        {/* Developer Profile */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            {/* Profile Image */}
            <div className="md:w-1/3 bg-gray-100 flex justify-center p-8">
              <img 
                src="https://scontent.fbhr4-1.fna.fbcdn.net/v/t39.30808-1/518407831_1796907967878325_547114330131061050_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=1d2534&_nc_ohc=rI_k0f34eiIQ7kNvwE1zLE5&_nc_oc=AdlFYb8wcGmEaHCI6bGKz9k_9cHl8t38y6QTfr-aSSfLAiyBBIrffnvm0X1N04UwZgwyXbi4KV3_OV2uslrGqnw8&_nc_zt=24&_nc_ht=scontent.fbhr4-1.fna&_nc_gid=8MCXPV1El-bqcc72Q0liPw&oh=00_AfX5eL7NExz85mrD9XCQqvmQEfvm8eilywnGSG412T7UmQ&oe=68994BE3" 
                alt="Raj Shrestha - Full Stack Developer based in Chitwan, Nepal"
                className="h-64 w-64 object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>

            {/* Profile Info */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Raj Shrestha</h2>
              <p className="text-indigo-600 font-medium mb-4">Full Stack Developer</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiCode className="mr-1"/> React.js
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiCode className="mr-1"/> Node.js
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiCode className="mr-1"/> MongoDB
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiCode className="mr-1"/> Tailwind CSS
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                Hi, I'm Raj Shrestha, a passionate Full Stack Developer with building modern web applications. 
                I specialize in JavaScript technologies and have a strong focus on creating intuitive, 
                user-friendly interfaces with robust backend functionality.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://github.com/Razzstha" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800" target="_blank">
                  <FiGithub className="h-6 w-6 mr-2" /> Raj Shrestha
                </a>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiMail className="h-6 w-6 mr-2"/> razzstha92@gmail.com
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiPhone className="h-6 w-6 mr-2"/> 9825671930
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <FiMapPin className="h-6 w-6 mr-2"/> Bharatpur-1, Chitwan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Frontend', skills: 'HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS' },
              { name: 'Backend', skills: 'Node.js, Express.js' },
              { name: 'Databases', skills: 'MongoDB, MySQL' },
              { name: 'DevOps', skills: 'GitHub Actions,' },
              { name: 'Tools', skills: 'Git, VS Code, Figma' },
              { name: 'Other', skills: 'Python, C, Adobe Illustrator, Canva, Babel' }
            ].map((item, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-600">{item.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Project */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              This e-book website was built as a showcase of modern web development techniques. 
              It demonstrates clean React architecture, responsive design principles, and efficient state management.
            </p>
            <p>
              Key features include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Responsive design that works on all devices</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Read-on-the-go functionality with offline support</li>
              <li>Performance optimized for fast page loads</li>
            </ul>
            <p>
              The project utilizes modern libraries and frameworks to provide an exceptional user experience.
            </p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default About;
