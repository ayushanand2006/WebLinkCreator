import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Users as UsersIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  Trash2, 
  Plus, 
  UserPlus, 
  Briefcase, 
  Award, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  Facebook,
  Instagram,
  ArrowRight,
  Building,
  Check,
  BarChart2,
  Settings,
  Bell,
  Dribbble,
  FileText,
  Info,
  Pencil,
  X
} from 'lucide-react';
import { addOrder, deleteOrder, updateOrderStatus, addTeamMember, deleteTeamMember, updateTeamMember, fetchData } from '../api/dataManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [team, setTeam] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    experience: '',
    bio: '',
    image: null,
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
      facebook: '',
      instagram: '',
      dribbble: ''
    }
  });
  const [fileName, setFileName] = useState('');
  const MAX_IMAGE_SIZE_MB = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [websiteData, setWebsiteData] = useState(null);

  const loadData = async () => {
    try {
      const data = await fetchData();
      if (data) {
        // Sort orders by ID in descending order to show the newest at the top
        const sortedOrders = Array.isArray(data.orders) 
          ? [...data.orders].sort((a, b) => b.id.localeCompare(a.id)) 
          : [];
        setOrders(sortedOrders);
        setTeam(Array.isArray(data.team) ? data.team : []);
        setWebsiteData(data);
      } else {
        console.error('Failed to load data');
        setOrders([]);
        setTeam([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setOrders([]);
      setTeam([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTabChange = (tab) => {
    console.log(`AdminPanel: Changing tab to: ${tab}`);
    setActiveTab(tab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return Bell;
      case 'completed':
        return Check;
      case 'cancelled':
        return Settings; // Using Settings for cancelled as a placeholder
      default:
        return Settings;
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrders = await updateOrderStatus(orderId, newStatus);
      if (updatedOrders) {
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const updatedOrders = await deleteOrder(orderId);
      if (updatedOrders) {
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAddMemberChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        alert(`Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_MB}MB.`);
        setNewMember(prev => ({
          ...prev,
          image: null
        }));
        setFileName('');
        e.target.value = null;
        return;
      }
      setNewMember(prev => ({
        ...prev,
        image: file
      }));
      setFileName(file.name);
    } else if (name.startsWith('social.')) {
      const socialPlatform = name.split('.')[1];
      setNewMember(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialPlatform]: value
        }
      }));
    } else {
      setNewMember(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      experience: member.experience,
      bio: member.bio,
      image: null,
      social: member.social || {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        facebook: '',
        instagram: '',
        dribbble: ''
      }
    });
    setShowAddMemberModal(true);
  };

  const handleAddMemberSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newMember.name || !newMember.role || !newMember.experience || !newMember.bio || !newMember.image) {
      alert('Please fill in all required fields including the profile picture.');
      return;
    }

    try {
      if (editingMember) {
        const updatedMember = await updateTeamMember(editingMember.id, newMember);
        if (updatedMember) {
          const data = await fetchData();
          if (data) {
            setTeam(Array.isArray(data.team) ? data.team : []);
            setShowAddMemberModal(false);
            setEditingMember(null);
            setNewMember({
              name: '',
              role: '',
              experience: '',
              bio: '',
              image: null,
              social: {
                github: '',
                linkedin: '',
                twitter: '',
                website: '',
                facebook: '',
                instagram: '',
                dribbble: ''
              }
            });
          }
        }
      } else {
        const addedMember = await addTeamMember(newMember);
        if (addedMember) {
          const data = await fetchData();
          if (data) {
            setTeam(Array.isArray(data.team) ? data.team : []);
            setShowAddMemberModal(false);
            setEditingMember(null);
            setNewMember({
              name: '',
              role: '',
              experience: '',
              bio: '',
              image: null,
              social: {
                github: '',
                linkedin: '',
                twitter: '',
                website: '',
                facebook: '',
                instagram: '',
                dribbble: ''
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error submitting team member:', error);
      alert('Failed to save team member. Please try again.');
    }
  };

  const handleDeleteTeamMember = async (memberId) => {
    try {
      const deletedMemberResponse = await deleteTeamMember(memberId);
      if (deletedMemberResponse) {
        // The deleteTeamMember function already updates the in-memory data and saves it
        // We just need to refresh the local state from the server to get the latest
        const updatedData = await fetchData();
        if (updatedData) {
          setTeam(Array.isArray(updatedData.team) ? updatedData.team : []);
          return deletedMemberResponse;
        }
      }
      return null;
    } catch (error) {
      console.error('Error deleting team member:', error);
      return null;
    }
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
    facebook: Facebook,
    instagram: Instagram,
    dribbble: Dribbble
  };

  const filteredOrders = activeTab === 'orders'
    ? orders
    : activeTab === 'pending-orders'
      ? orders.filter(order => order.status === 'pending')
      : orders.filter(order => order.status === 'completed');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              </button>
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{Array.isArray(orders) ? orders.length : 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">{Array.isArray(team) ? team.length : 0}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(Array.isArray(orders) ? orders.filter(order => order.status === 'completed').length : 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabChange('orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'orders'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>All Orders</span>
            </button>
            <button
              onClick={() => handleTabChange('pending-orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'pending-orders'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Pending Orders</span>
            </button>
            <button
              onClick={() => handleTabChange('completed-orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'completed-orders'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Completed Orders</span>
            </button>
            <button
              onClick={() => handleTabChange('team')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'team'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              <span>Team</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <>
            {(activeTab === 'orders' || activeTab === 'pending-orders' || activeTab === 'completed-orders') && (
              <motion.div
                key="orders-management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Total Orders:</span> {Array.isArray(orders) ? orders.length : 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Pending:</span>{' '}
                      {(Array.isArray(orders) ? orders.filter(order => order.status === 'pending').length : 0)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(Array.isArray(filteredOrders) && filteredOrders.length > 0) ? (
                    filteredOrders.map(order => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {order.planName} Plan
                              </h3>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {React.createElement(getStatusIcon(order.status), { className: "w-4 h-4 mr-1" })}
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
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleStatusChange(order.id, 'completed')}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Complete</span>
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center col-span-full">No orders to display.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingMember(null);
                      setNewMember({
                        name: '',
                        role: '',
                        experience: '',
                        bio: '',
                        image: null,
                        social: {
                          github: '',
                          linkedin: '',
                          twitter: '',
                          website: '',
                          facebook: '',
                          instagram: '',
                          dribbble: ''
                        }
                      });
                      setShowAddMemberModal(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Add Team Member</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                    >
                      <div className="relative">
                        <img
                          src={member.image || 'https://via.placeholder.com/400x300'}
                          alt={member.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditMember(member)}
                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                          >
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-purple-600 font-medium">{member.role}</p>
                        <p className="text-sm text-gray-500 mt-1">{member.experience}</p>
                        <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                        <div className="flex space-x-3 mt-4">
                          {Object.entries(member.social || {}).map(([platform, url]) => {
                            if (url && socialIcons[platform]) {
                              const Icon = socialIcons[platform];
                              return (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                  <Icon className="w-5 h-5" />
                                </a>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        </AnimatePresence>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {showOrderModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: "0" }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h3>
              
              <div className="space-y-4 text-gray-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="flex items-center"><Info className="w-4 h-4 mr-2 text-blue-500" /> <strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p className="flex items-center"><FileText className="w-4 h-4 mr-2 text-purple-500" /> <strong>Plan:</strong> {selectedOrder.planName} (${selectedOrder.planPrice})</p>
                  <p className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> <strong>Status:</strong> <span className={`font-semibold ${getStatusColor(selectedOrder.status).includes('green') ? 'text-green-700' : 'text-yellow-700'}`}>{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span></p>
                  <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-orange-500" /> <strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()} at {new Date(selectedOrder.date).toLocaleTimeString()}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center"><UsersIcon className="w-4 h-4 mr-2 text-blue-500" /> <strong>Name:</strong> {selectedOrder.customerInfo.name}</p>
                    <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-purple-500" /> <strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                    {selectedOrder.customerInfo.phone && <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-green-500" /> <strong>Phone:</strong> {selectedOrder.customerInfo.phone}</p>}
                    {selectedOrder.customerInfo.company && <p className="flex items-center"><Building className="w-4 h-4 mr-2 text-orange-500" /> <strong>Company:</strong> {selectedOrder.customerInfo.company}</p>}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Selected Features</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    {Array.isArray(selectedOrder.selectedFeatures) && selectedOrder.selectedFeatures.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Additional Message</h4>
                  <p className="text-gray-700 break-words">{selectedOrder.message || 'N/A'}</p>
                </div>
              </div>

              <button
                onClick={() => setShowOrderModal(false)}
                className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Team Member Modal */}
      {showAddMemberModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddMemberModal(false);
                    setEditingMember(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddMemberSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newMember.name}
                      onChange={handleAddMemberChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={newMember.role}
                      onChange={handleAddMemberChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={newMember.experience}
                    onChange={handleAddMemberChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="bio"
                    value={newMember.bio}
                    onChange={handleAddMemberChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture <span className="text-red-500">*</span>
                  </label>
                  <label htmlFor="image-upload" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <span className="text-gray-700">{fileName || 'Choose File'}</span>
                    <input
                      id="image-upload"
                      type="file"
                      name="image"
                      onChange={handleAddMemberChange}
                      accept="image/*"
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Max image size: {MAX_IMAGE_SIZE_MB}MB</p>
                  {newMember.image && fileName && (
                    <div className="mt-2 text-sm text-green-600">
                      Image selected: {fileName}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(newMember.social).map(([platform, value]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                      </label>
                      <input
                        type="url"
                        name={`social.${platform}`}
                        value={value}
                        onChange={handleAddMemberChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddMemberModal(false);
                      setEditingMember(null);
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminPanel;