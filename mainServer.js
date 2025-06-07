// =============================================
// Website Details
// =============================================
export const websiteData = {
  // =============================================
  // Company Information
  // =============================================
  company: {
    name: "Web Link Creator",
    tagline: "Crafting Digital Excellence",
    description: "We transform ideas into stunning digital experiences through innovative web development, creative design, and strategic solutions.",
    established: "2020",
    projects: "150+",
    clients: "85+",
    satisfaction: "98%"
  },
  
  // =============================================
  // Navigation Menu
  // =============================================
  navigation: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Team", path: "/team" },
    { name: "Subscription", path: "/subscription" },
    { name: "Contact", path: "/contact" }
  ],

  // =============================================
  // Services Offered
  // =============================================
  services: [
    {
      id: 1,
      title: "WordPress Development",
      description: "Custom WordPress websites tailored to your business needs with advanced functionality and SEO optimization.",
      icon: "Globe",
      features: ["Custom Theme Development", "Plugin Integration", "SEO Optimization", "Responsive Design", "E-commerce Solutions"],
      price: "Starting from $899",
      timeline: "2-4 weeks",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Web Development",
      description: "Full-stack web applications built with modern technologies for scalable and secure solutions.",
      icon: "Code",
      features: ["React/Vue Development", "Backend APIs", "Database Design", "Cloud Deployment", "Performance Optimization"],
      price: "Starting from $1,299",
      timeline: "3-6 weeks",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Logo Design",
      description: "Professional brand identity design that captures your business essence and creates lasting impressions.",
      icon: "Palette",
      features: ["Brand Research", "Multiple Concepts", "Vector Files", "Brand Guidelines", "Social Media Kit"],
      price: "Starting from $299",
      timeline: "1-2 weeks",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Banner Design",
      description: "Eye-catching banners and graphics for web, social media, and print marketing campaigns.",
      icon: "Image",
      features: ["Web Banners", "Social Media Graphics", "Print Materials", "Animated Banners", "Brand Consistency"],
      price: "Starting from $99",
      timeline: "3-5 days",
      color: "from-orange-500 to-red-500"
    }
  ],

  // =============================================
  // Team Members
  // =============================================
  team: [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Founder & Lead Developer",
      experience: 8,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Full-stack developer with expertise in modern web technologies and a passion for creating exceptional digital experiences.",
      social: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        twitter: "https://twitter.com/alexjohnson"
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      experience: 6,
      image: "https://images.pexels.com/photos/3782218/pexels-photo-3782218.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Creative designer focused on user-centered design principles and creating intuitive digital experiences.",
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        dribbble: "https://dribbble.com/sarahchen",
        instagram: "https://instagram.com/sarahchen"
      }
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      role: "WordPress Specialist",
      experience: 5,
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "WordPress expert specializing in custom theme development and e-commerce solutions.",
      social: {
        linkedin: "https://linkedin.com/in/mikerodriguez",
        github: "https://github.com/mikerodriguez"
      }
    },
    {
      id: 4,
      name: "Lisa Wang",
      role: "Marketing Specialist",
      experience: 4,
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Digital marketing expert specializing in SEO, content strategy, and social media management.",
      social: {
        linkedin: "https://linkedin.com/in/lisawang",
        twitter: "https://twitter.com/lisawang"
      }
    },
    {
      id: 5,
      name: "David Kim",
      role: "Backend Developer",
      experience: 6,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Backend developer with expertise in cloud architecture and scalable application development.",
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
        github: "https://github.com/davidkim"
      }
    },
    {
      id: 6,
      name: "Emma Thompson",
      role: "Project Manager",
      experience: 7,
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Experienced project manager ensuring timely delivery and seamless client communication.",
      social: {
        linkedin: "https://linkedin.com/in/emmathompson",
        twitter: "https://twitter.com/emmathompson"
      }
    }
  ],

  // =============================================
  // Subscription Plans
  // =============================================
  subscriptions: {
    // WordPress Development Plans
    wordpress: [
      {
        id: 1,
        name: "WordPress Starter",
        price: 299,
        period: "month",
        description: "Perfect for small businesses getting started with WordPress",
        features: [
          "WordPress Website Setup",
          "Basic Theme Customization",
          "5 Pages Included",
          "Mobile Responsive Design",
          "Basic SEO Setup",
          "1 Month Support"
        ],
        featuresIncluded: [
          "WordPress Installation",
          "Theme Setup",
          "Plugin Configuration",
          "Responsive WP Design",
          "Basic WP SEO",
          "WP Form Integration",
          "Basic WooCommerce Support"
        ],
        popular: false,
        color: "from-blue-400 to-blue-600"
      },
      {
        id: 2,
        name: "WordPress Professional",
        price: 599,
        period: "month",
        description: "Ideal for growing businesses requiring advanced WordPress functionality",
        features: [
          "Custom WordPress Development",
          "Advanced Theme Features",
          "10 Pages Included",
          "E-commerce Integration",
          "Advanced SEO & Analytics",
          "3 Months Support",
          "Logo Design Included"
        ],
        featuresIncluded: [
          "Custom WordPress Theme",
          "Advanced Plugin Development",
          "WooCommerce Integration",
          "Advanced WP SEO",
          "WP Security Hardening",
          "Speed Optimization (WP)",
          "Priority WP Support",
          "Monthly WP Updates"
        ],
        popular: true,
        color: "from-purple-400 to-purple-600"
      },
      {
        id: 3,
        name: "WordPress Enterprise",
        price: 999,
        period: "month",
        description: "Complete WordPress solution for established businesses",
        features: [
          "Premium WordPress Development",
          "Custom Backend Development",
          "Unlimited Pages",
          "Advanced E-commerce",
          "Premium SEO Package",
          "6 Months Support",
          "Complete Brand Package",
          "Priority Support"
        ],
        featuresIncluded: [
          "Enterprise WordPress Solution",
          "Headless WordPress Option",
          "Multi-site Management",
          "Custom WP Integrations",
          "Dedicated WP Support",
          "Advanced WP Security",
          "Performance Scaling (WP)",
          "API Integration (WP)"
        ],
        popular: false,
        color: "from-green-400 to-green-600"
      }
    ],
    // Full Stack Development Plans
    fullstack: [
      {
        id: 4,
        name: "Full Stack Starter",
        price: 799,
        period: "month",
        description: "Perfect for startups and small businesses needing a custom web application",
        features: [
          "Custom Frontend Development",
          "Basic Backend API",
          "Database Setup",
          "5 Pages Included",
          "Mobile Responsive Design",
          "Basic Authentication",
          "1 Month Support"
        ],
        featuresIncluded: [
          "SPA/PWA Development",
          "RESTful API Development",
          "SQL/NoSQL Database",
          "Mobile-First Design",
          "User Authentication",
          "Third-Party API Integration"
        ],
        popular: false,
        color: "from-blue-400 to-blue-600"
      },
      {
        id: 5,
        name: "Full Stack Professional",
        price: 1499,
        period: "month",
        description: "Ideal for growing businesses requiring advanced web applications",
        features: [
          "Advanced Frontend Development",
          "Custom Backend API",
          "Database Optimization",
          "10 Pages Included",
          "Advanced Authentication",
          "Real-time Features",
          "3 Months Support",
          "Cloud Deployment"
        ],
        featuresIncluded: [
          "Custom Web Application",
          "Microservices Architecture",
          "Advanced Database Solutions",
          "Real-time Data Sync",
          "Scalable Cloud Deployment",
          "API Development & Integration",
          "Performance Monitoring",
          "Enhanced Security Protocols"
        ],
        popular: true,
        color: "from-purple-400 to-purple-600"
      },
      {
        id: 6,
        name: "Full Stack Enterprise",
        price: 2499,
        period: "month",
        description: "Complete solution for large-scale web applications",
        features: [
          "Premium Frontend Development",
          "Custom Backend Architecture",
          "Advanced Database Design",
          "Unlimited Pages",
          "Enterprise Authentication",
          "Real-time Features",
          "6 Months Support",
          "Cloud Infrastructure",
          "CI/CD Pipeline"
        ],
        featuresIncluded: [
          "Enterprise Web Platform",
          "Distributed System Design",
          "Big Data Integration",
          "High Availability",
          "DevOps & CI/CD",
          "Advanced API Gateways",
          "Global Scalability",
          "Comprehensive Security Audit"
        ],
        popular: false,
        color: "from-green-400 to-green-600"
      }
    ]
  },

  // =============================================
  // Orders
  // =============================================
  orders: [
    {
      id: 1703123456789,
      planId: 2,
      planName: "Professional",
      planPrice: 599,
      customerInfo: {
        name: "John Smith",
        email: "john@example.com",
        company: "TechStart Inc.",
        phone: "+1 (555) 123-4567",
        message: "Looking for a complete e-commerce solution for our startup."
      },
      date: "2024-01-15T10:30:00.000Z",
      status: "pending"
    },
    {
      id: 1703023456789,
      planId: 1,
      planName: "Starter",
      planPrice: 299,
      customerInfo: {
        name: "Emily Davis",
        email: "emily@greenearth.com",
        company: "Green Earth Co.",
        phone: "+1 (555) 987-6543",
        message: "Need a simple website for our environmental consulting business."
      },
      date: "2024-01-14T14:20:00.000Z",
      status: "completed"
    }
  ],

  // =============================================
  // Contact Information
  // =============================================
  contact: {
    email: "hello@digicraftsolutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, New York, NY 10001",
    social: {
      facebook: "https://facebook.com/digicraftsolutions",
      twitter: "https://twitter.com/digicraftsolutions",
      linkedin: "https://linkedin.com/company/digicraftsolutions",
      instagram: "https://instagram.com/digicraftsolutions"
    }
  },

  // =============================================
  // Testimonials
  // =============================================
  testimonials: [
    {
      id: 1,
      name: "John Smith",
      company: "TechStart Inc.",
      rating: 5,
      text: "DigiCraft transformed our vision into a stunning website that exceeded all expectations. Their attention to detail is remarkable.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      id: 2,
      name: "Emily Davis",
      company: "Green Earth Co.",
      rating: 5,
      text: "The team's creativity and technical expertise helped us launch our e-commerce platform successfully. Highly recommended!",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ]
};

// =============================================
// Data Management Functions
// =============================================

// Function to add team member
export const addTeamMember = (memberData) => {
  // Generate a unique ID for the new member
  const newId = Math.max(...websiteData.team.map(member => member.id)) + 1;
  
  // Handle image upload
  let imageUrl = memberData.image;
  if (memberData.image instanceof File) {
    // In a real application, you would upload the image to a storage service
    // For now, we'll use a placeholder image from the existing team members
    const placeholderImages = [
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3782218/pexels-photo-3782218.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    ];
    imageUrl = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  }

  const newMember = {
    id: newId,
    name: memberData.name,
    role: memberData.role,
    experience: memberData.experience,
    bio: memberData.bio,
    image: imageUrl,
    social: memberData.social || {}
  };

  websiteData.team.push(newMember);
  return newMember;
};

// Function to add order
export const addOrder = (orderData) => {
  const newOrder = {
    id: Date.now(),
    ...orderData,
    date: new Date().toISOString(),
    status: "pending"
  };
  websiteData.orders.unshift(newOrder); // Add to beginning (newest first)
  return newOrder;
};

// Function to update order status
export const updateOrderStatus = (orderId, newStatus) => {
  const orderIndex = websiteData.orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    websiteData.orders[orderIndex].status = newStatus;
    return websiteData.orders[orderIndex];
  }
  return null;
};

// Function to delete order
export const deleteOrder = (orderId) => {
  const orderIndex = websiteData.orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    const deletedOrder = websiteData.orders.splice(orderIndex, 1)[0];
    return deletedOrder;
  }
  return null;
};

// Function to delete team member
export const deleteTeamMember = (memberId) => {
  const memberIndex = websiteData.team.findIndex(member => member.id === memberId);
  if (memberIndex !== -1) {
    const deletedMember = websiteData.team.splice(memberIndex, 1)[0];
    return deletedMember;
  }
  return null;
};