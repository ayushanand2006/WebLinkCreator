import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Users, 
  Plus, 
  X, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Dribbble
} from 'lucide-react';
import { 
  websiteData, 
  addTeamMember, 
  updateOrderStatus, 
  deleteOrder, 
  deleteTeamMember 
} from '../../mainServer.js';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(websiteData.orders);
  const [team, setTeam] = useState(websiteData.team);
  
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    experience: '',
    bio: '',
    image: null,
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: '',
      dribbble: ''
    }
  });

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

  const handleMemberInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setMemberForm(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialKey]: value
        }
      }));
    } else {
      setMemberForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberForm.name && memberForm.role && memberForm.experience) {
      const newMember = addTeamMember({
        ...memberForm,
        experience: parseInt(memberForm.experience)
      });
      
      setTeam([...websiteData.team]);
      setMemberForm({
        name: '',
        role: '',
        experience: '',
        bio: '',
        image: null,
        social: {
          linkedin: '',
          github: '',
          twitter: '',
          instagram: '',
          dribbble: ''
        }
      });
      setShowAddMemberModal(false);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders([...websiteData.orders]);
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setOrders([...websiteData.orders]);
  };

  const handleDeleteMember = (memberId) => {
    deleteTeamMember(memberId);
    setTeam([...websiteData.team]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-16 min-h-screen bg-gray-50"
    >
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Admin Panel
            </h1>
            <p className="text-xl text-blue-100">
              Manage orders and team members
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('orders')}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Orders ({orders.length})</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('team')}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'team'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Team ({team.length})</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                  <div className="text-sm text-gray-600">
                    Total Orders: {orders.length}
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500">Orders will appear here when customers place them.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {orders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <motion.div
                          key={order.id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.01 }}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                                  <h3 className="text-xl font-semibold text-gray-900">
                                    {order.planName} Plan
                                  </h3>
                                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    <StatusIcon className="w-4 h-4 mr-1" />
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                    {new Date(order.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                    ${order.planPrice}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Mail className="w-4 h-4 mr-2 text-purple-500" />
                                    {order.customerInfo.email}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Building className="w-4 h-4 mr-2 text-orange-500" />
                                    {order.customerInfo.company || 'Individual'}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setShowOrderModal(true);
                                  }}
                                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>View</span>
                                </motion.button>
                                
                                {order.status === 'pending' && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Complete</span>
                                  </motion.button>
                                )}
                                
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete</span>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddMemberModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Team Member</span>
                  </motion.button>
                </div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {team.map((member) => (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute top-4 right-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-purple-600 font-semibold mb-3">{member.role}</p>
                        <p className="text-gray-600 mb-4">{member.bio}</p>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-sm text-gray-500">Experience:</span>
                          <span className="text-sm font-semibold text-gray-700">{member.experience} years</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          {Object.entries(member.social).map(([platform, url]) => {
                            if (!url) return null;
                            const Icon = socialIcons[platform];
                            return (
                              <motion.a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-gray-600" />
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Add Team Member Modal */}
      <AnimatePresence>
        {showAddMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
                      {memberForm.image ? (
                        <img
                          src={URL.createObjectURL(memberForm.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMemberForm({ ...memberForm, image: e.target.files[0] })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-sm text-gray-500">Click to upload member's photo</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        value={memberForm.role}
                        onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                      <input
                        type="number"
                        value={memberForm.experience}
                        onChange={(e) => setMemberForm({ ...memberForm, experience: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={memberForm.bio}
                      onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(memberForm.social).map((platform) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {platform}
                          </label>
                          <input
                            type="url"
                            value={memberForm.social[platform]}
                            onChange={(e) =>
                              setMemberForm({
                                ...memberForm,
                                social: { ...memberForm.social, [platform]: e.target.value }
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder={`https://${platform}.com/username`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddMemberModal(false)}
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
                    Add Member
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {showOrderModal && selectedOrder && (
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
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Plan Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Plan:</span>
                      <p className="font-medium">{selectedOrder.planName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <p className="font-medium">${selectedOrder.planPrice}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className={`font-medium ${selectedOrder.status === 'completed' ? 'text-green-600' : selectedOrder.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{selectedOrder.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{selectedOrder.customerInfo.email}</span>
                    </div>
                    {selectedOrder.customerInfo.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        <span>{selectedOrder.customerInfo.phone}</span>
                      </div>
                    )}
                    {selectedOrder.customerInfo.company && (
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-orange-500" />
                        <span>{selectedOrder.customerInfo.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedOrder.customerInfo.message && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Project Details
                    </h3>
                    <p className="text-gray-700 text-sm">{selectedOrder.customerInfo.message}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                  {selectedOrder.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleUpdateOrderStatus(selectedOrder.id, 'completed');
                        setShowOrderModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark as Completed
                    </motion.button>
                  )}
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminPanel;