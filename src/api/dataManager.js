const API_BASE_URL = 'http://localhost:3001/api';

// Function to fetch data
export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/websiteData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const updateData = async (newData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/websiteData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Helper function to convert File to base64 with compression
const convertFileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // Create an image element to get the dimensions
        const img = new Image();
        img.src = e.target.result;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with reduced quality
        const base64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Function to add team member
export const addTeamMember = async (memberData) => {
  try {
    const websiteData = await fetchData();
    if (!websiteData) {
      throw new Error('Failed to fetch website data');
    }

    // Generate a unique ID for the new member
    const newId = Date.now().toString();
    
    // Create the new member object
    const newMember = {
      id: newId,
      ...memberData,
      // Convert image file to base64 if it exists
      image: memberData.image ? await convertFileToBase64(memberData.image) : null
    };

    // Add the new member to the team array
    if (!Array.isArray(websiteData.team)) {
      websiteData.team = [];
    }
    websiteData.team.push(newMember);

    // Save the updated data
    const success = await updateData(websiteData);
    if (!success) {
      throw new Error('Failed to update website data');
    }
    return newMember;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

// Function to update team member
export const updateTeamMember = async (memberId, updatedData) => {
  const websiteData = await fetchData();
  if (!websiteData) return null;

  const memberIndex = websiteData.team.findIndex(member => member.id === memberId);
  if (memberIndex !== -1) {
    // If there's a new image, convert it to base64
    if (updatedData.image && updatedData.image instanceof File) {
      updatedData.image = await convertFileToBase64(updatedData.image);
    }

    // Update the member data
    websiteData.team[memberIndex] = {
      ...websiteData.team[memberIndex],
      ...updatedData
    };

    const success = await updateData(websiteData);
    return success ? websiteData.team[memberIndex] : null;
  }
  return null;
};

// Function to add order
export const addOrder = async (orderData) => {
  const websiteData = await fetchData();
  if (!websiteData) return null;

  const newOrder = {
    id: Date.now(),
    ...orderData,
    date: new Date().toISOString(),
    status: "pending"
  };
  
  websiteData.orders.unshift(newOrder); // Add to beginning (newest first)
  const success = await updateData(websiteData);
  return success ? websiteData.orders : null;
};

// Function to update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  const websiteData = await fetchData();
  if (!websiteData) return null;

  const orderIndex = websiteData.orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    websiteData.orders[orderIndex].status = newStatus;
    const success = await updateData(websiteData);
    return success ? websiteData.orders : null;
  }
  return websiteData.orders;
};

// Function to delete order
export const deleteOrder = async (orderId) => {
  const websiteData = await fetchData();
  if (!websiteData) return null;

  const orderIndex = websiteData.orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    websiteData.orders.splice(orderIndex, 1);
    const success = await updateData(websiteData);
    return success ? websiteData.orders : null;
  }
  return websiteData.orders;
};

// Function to delete team member
export const deleteTeamMember = async (memberId) => {
  const websiteData = await fetchData();
  if (!websiteData) return null;

  const memberIndex = websiteData.team.findIndex(member => member.id === memberId);
  if (memberIndex !== -1) {
    const deletedMember = websiteData.team.splice(memberIndex, 1)[0];
    const success = await updateData(websiteData);
    return success ? deletedMember : null;
  }
  return null;
}; 