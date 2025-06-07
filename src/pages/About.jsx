import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Heart, Zap, Star } from 'lucide-react';
import { websiteData } from '../../mainServer.js';

const About = () => {
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

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started our journey with a vision to transform digital experiences'
    },
    {
      year: '2021',
      title: 'First 50 Projects',
      description: 'Completed our first 50 successful projects across various industries'
    },
    {
      year: '2022',
      title: 'Team Expansion',
      description: 'Grew our team to include specialized experts in different domains'
    },
    {
      year: '2023',
      title: '100+ Happy Clients',
      description: 'Reached a milestone of serving over 100 satisfied clients'
    },
    {
      year: '2024',
      title: 'Innovation Focus',
      description: 'Embracing cutting-edge technologies and innovative solutions'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {websiteData.company.name}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate digital craftsmen dedicated to creating exceptional web experiences 
              that drive business growth and user engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Years of Excellence', value: '5+', icon: Award, color: 'from-blue-500 to-cyan-500' },
              { label: 'Projects Delivered', value: websiteData.company.projects, icon: Zap, color: 'from-purple-500 to-pink-500' },
              { label: 'Happy Clients', value: websiteData.company.clients, icon: Users, color: 'from-green-500 to-teal-500' },
              { label: 'Client Satisfaction', value: websiteData.company.satisfaction, icon: Star, color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower businesses with cutting-edge digital solutions that not only meet their 
                current needs but also prepare them for future growth. We believe in creating 
                digital experiences that are both beautiful and functional, driving real business results.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the leading digital partner for businesses worldwide, known for our 
                innovation, quality, and client-centric approach. We envision a future where 
                every business can leverage the full potential of digital technology to achieve their goals.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Milestones that shaped our path to excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <motion.div variants={containerVariants} className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  } text-center md:text-left mb-4 md:mb-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-full md:w-5/12"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-blue-100">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Excellence',
                description: 'We strive for perfection in every project, delivering solutions that exceed expectations.',
                icon: Award
              },
              {
                title: 'Innovation',
                description: 'We embrace new technologies and creative approaches to solve complex challenges.',
                icon: Zap
              },
              {
                title: 'Integrity',
                description: 'We build trust through honest communication, transparency, and ethical practices.',
                icon: Heart
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;