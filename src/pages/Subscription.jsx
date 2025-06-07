import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { websiteData } from '../../mainServer.js';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('wordpress');

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

  const PricingTable = ({ plans, type }) => (
    <motion.div
      variants={itemVariants}
      className="w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {type === 'wordpress' ? 'WordPress Development' : 'Full Stack Development'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                Popular
              </div>
            )}
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={`/subscription/${plan.id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-purple-600 hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const ComparisonTable = () => {
    const wordpressFeatures = new Set(
      websiteData.subscriptions.wordpress.flatMap(plan => plan.featuresIncluded)
    );
    const fullstackFeatures = new Set(
      websiteData.subscriptions.fullstack.flatMap(plan => plan.featuresIncluded)
    );

    return (
      <motion.div
        variants={itemVariants}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Compare Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WordPress Comparison */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-600">
              <h3 className="text-xl font-bold text-white">WordPress Development</h3>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-sm font-semibold text-gray-900">Features</th>
                    {websiteData.subscriptions.wordpress.map(plan => (
                      <th key={plan.id} className="py-3 text-center text-sm font-semibold text-gray-900">
                        {plan.name.replace('WordPress ', '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(wordpressFeatures).map((feature) => (
                    <tr key={feature} className="border-b border-gray-200">
                      <td className="py-4 text-gray-600">{feature}</td>
                      {websiteData.subscriptions.wordpress.map(plan => (
                        <td key={plan.id} className="py-4 text-center">
                          {plan.featuresIncluded.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Full Stack Comparison */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-400 to-purple-600">
              <h3 className="text-xl font-bold text-white">Full Stack Development</h3>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-sm font-semibold text-gray-900">Features</th>
                    {websiteData.subscriptions.fullstack.map(plan => (
                      <th key={plan.id} className="py-3 text-center text-sm font-semibold text-gray-900">
                        {plan.name.replace('Full Stack ', '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(fullstackFeatures).map((feature) => (
                    <tr key={feature} className="border-b border-gray-200">
                      <td className="py-4 text-gray-600">{feature}</td>
                      {websiteData.subscriptions.fullstack.map(plan => (
                        <td key={plan.id} className="py-4 text-center">
                          {plan.featuresIncluded.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 pt-16"
    >
      {/* Hero Section - Replicated from Team page */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Development Plan</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Select the perfect plan for your business needs. Whether you need a WordPress site or a custom web application, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 mt-12">
          <PricingTable plans={websiteData.subscriptions.wordpress} type="wordpress" />
          <PricingTable plans={websiteData.subscriptions.fullstack} type="fullstack" />
          <ComparisonTable />
        </div>
      </div>
    </motion.div>
  );
};

export default Subscription;