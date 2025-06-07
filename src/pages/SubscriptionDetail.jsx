import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Star, Calendar, DollarSign, Users, Award, X } from 'lucide-react';
import websiteData from '../../mainServer.json';
import { ArrowRight } from 'lucide-react';
import { addOrder } from '../api/dataManager';

const countryCodes = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+81', name: 'Japan' },
  { code: '+86', name: 'China' },
  { code: '+27', name: 'South Africa' },
  { code: '+55', name: 'Brazil' },
  { code: '+20', name: 'Egypt' },
  { code: '+971', name: 'United Arab Emirates' },
  { code: '+7', name: 'Russia' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+52', name: 'Mexico' },
  { code: '+63', name: 'Philippines' },
  { code: '+60', name: 'Malaysia' },
  { code: '+62', name: 'Indonesia' },
  { code: '+65', name: 'Singapore' },
  { code: '+90', name: 'Turkey' },
  { code: '+234', name: 'Nigeria' },
];

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '+1',
    message: ''
  });

  const plan = 
    websiteData.subscriptions.wordpress.find(sub => sub.id === parseInt(id)) ||
    websiteData.subscriptions.fullstack.find(sub => sub.id === parseInt(id));

  if (!plan) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan not found</h1>
          <Link to="/subscription" className="text-blue-600 hover:text-blue-800">
            Back to Subscription Plans
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (plan && orderForm.name && orderForm.email && orderForm.phone && orderForm.countryCode) {
      const newOrder = {
        planId: plan.id,
        planName: plan.name,
        planPrice: plan.price,
        customerInfo: {
          name: orderForm.name,
          email: orderForm.email,
          company: orderForm.company,
          phone: `${orderForm.countryCode}${orderForm.phone}`,
          message: orderForm.message
        }
      };
      addOrder(newOrder);
      alert('Order request submitted successfully!');
      setShowOrderModal(false);
      setOrderForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        countryCode: '+1',
        message: ''
      });
      navigate('/subscription');
    } else {
      alert('Please fill in all required fields (Name, Email, Phone).');
    }
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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <Link
              to="/subscription"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Plans
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  {plan.name} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Plan
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-xl text-gray-600 ml-2">/{plan.period}</span>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOrderModal(true)}
                    className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    Request for Order
                  </motion.button>
                  
                  <Link to="/subscription">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </Link>
                </div>
              </div>
              
              <motion.div
                variants={itemVariants}
                className={`bg-gradient-to-r ${plan.color} p-1 rounded-2xl`}
              >
                <div className="bg-white rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Highlights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Timeline</div>
                      <div className="text-sm text-gray-600">2-6 weeks</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Best Value</div>
                      <div className="text-sm text-gray-600">Great ROI</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Support</div>
                      <div className="text-sm text-gray-600">24/7 Help</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Quality</div>
                      <div className="text-sm text-gray-600">Premium</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600">
              Detailed features of the <span className="font-semibold text-purple-600">{plan.name}</span> plan:
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {plan.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Order Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request for {plan.name} Plan</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={orderForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={orderForm.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <div className="flex space-x-2">
                    <select
                      name="countryCode"
                      value={orderForm.countryCode}
                      onChange={handleInputChange}
                      className="flex-shrink-0 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {countryCodes.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.code} ({c.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={orderForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowOrderModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Submit Order Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SubscriptionDetail;