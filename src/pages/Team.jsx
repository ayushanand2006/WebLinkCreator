import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Instagram, Dribbble } from 'lucide-react';
import { websiteData } from '../../mainServer.js';

const Team = () => {
  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    instagram: Instagram,
    dribbble: Dribbble
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              The creative minds behind our success. Our diverse team of experts brings together 
              years of experience and passion for digital excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {websiteData.team.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-200 text-sm sm:text-base">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-xs sm:text-sm font-medium text-blue-600">
                        {member.experience} years exp.
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon || !url) return null;
                      
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team Culture
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              What makes us different
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                title: 'Collaborative Spirit',
                description: 'We believe in the power of teamwork and open communication to achieve exceptional results.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Continuous Learning',
                description: 'We stay ahead of industry trends and continuously upgrade our skills to deliver cutting-edge solutions.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Client-Centric Approach',
                description: 'Every decision we make is guided by our commitment to delivering value and exceeding client expectations.',
                color: 'from-green-500 to-teal-500'
              }
            ].map((culture, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${culture.color} rounded-full mx-auto mb-4 sm:mb-6`}></div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{culture.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{culture.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Team;