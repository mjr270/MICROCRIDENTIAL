// User data storage and authentication
const USERS_KEY = 'kaushallink_users';
const PENDING_VERIFICATION_KEY = 'kaushallink_pending_verification';

// Get all registered users
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// Save users to storage
const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Get pending verification users
export const getPendingUsers = () => {
  try {
    const pending = localStorage.getItem(PENDING_VERIFICATION_KEY);
    return pending ? JSON.parse(pending) : [];
  } catch (error) {
    console.error('Error loading pending users:', error);
    return [];
  }
};

// Save pending verification users
const savePendingUsers = (users) => {
  try {
    localStorage.setItem(PENDING_VERIFICATION_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving pending users:', error);
    return false;
  }
};

// Register a new user (adds to pending verification)
export const registerUser = (userData) => {
  try {
    const { email, password, firstName, lastName, phone, institution, role } = userData;
    
    // Check if user already exists
    const users = getUsers();
    const pendingUsers = getPendingUsers();
    
    if (users.find(u => u.email === email) || pendingUsers.find(u => u.email === email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      return { success: false, message: 'All fields are required' };
    }

    // Prevent unauthorized admin creation (you can add admin auth check here)
    const validRoles = ['Learner', 'Institution', 'Employer'];
    if (role === 'Admin') {
      // In production, add proper admin authorization check
      console.warn('Admin registration attempted - requires authorization');
      // For now, allow but log it. In production, add proper checks.
    } else if (!validRoles.includes(role)) {
      return { success: false, message: 'Invalid role selected' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    // Validate phone format (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
      return { success: false, message: 'Invalid phone number (10-15 digits required)' };
    }

    // Validate password strength (In production, use bcrypt for hashing)
    if (password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters' };
    }
    
    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return { success: false, message: 'Password must contain uppercase, lowercase, and numbers' };
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user object
    // WARNING: In production, NEVER store plain text passwords. Use bcrypt or similar.
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // SECURITY RISK: This should be hashed with bcrypt in production
      firstName,
      lastName,
      phone,
      institution: institution || 'Not specified',
      role,
      verificationCode,
      createdAt: new Date().toISOString(),
      verified: false,
      uploadedDocuments: []
    };

    // Add to pending users
    pendingUsers.push(newUser);
    savePendingUsers(pendingUsers);

    return { 
      success: true, 
      message: 'Registration successful! Please verify your account.',
      verificationCode, // In production, send via email/SMS
      userId: newUser.id
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
};

// Verify user with code
export const verifyUser = (email, verificationCode) => {
  try {
    const pendingUsers = getPendingUsers();
    const userIndex = pendingUsers.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    const user = pendingUsers[userIndex];

    if (user.verificationCode !== verificationCode) {
      return { success: false, message: 'Invalid verification code' };
    }

    // Move user to verified users
    const verifiedUser = { ...user, verified: true, verifiedAt: new Date().toISOString() };
    delete verifiedUser.verificationCode; // Remove verification code

    const users = getUsers();
    users.push(verifiedUser);
    saveUsers(users);

    // Remove from pending
    pendingUsers.splice(userIndex, 1);
    savePendingUsers(pendingUsers);

    return { success: true, message: 'Account verified successfully!', user: verifiedUser };
  } catch (error) {
    console.error('Verification error:', error);
    return { success: false, message: 'Verification failed. Please try again.' };
  }
};

// Resend verification code
export const resendVerificationCode = (email) => {
  try {
    const pendingUsers = getPendingUsers();
    const userIndex = pendingUsers.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Generate new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    pendingUsers[userIndex].verificationCode = verificationCode;
    savePendingUsers(pendingUsers);

    return { 
      success: true, 
      message: 'Verification code resent!',
      verificationCode // In production, send via email/SMS
    };
  } catch (error) {
    console.error('Resend verification error:', error);
    return { success: false, message: 'Failed to resend code. Please try again.' };
  }
};

// Authenticate user (login)
export const authenticateUser = (email, password) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      // Check if user is in pending verification
      const pendingUsers = getPendingUsers();
      const pendingUser = pendingUsers.find(u => u.email === email);
      
      if (pendingUser) {
        return { 
          success: false, 
          message: 'Please verify your account first',
          needsVerification: true,
          email: pendingUser.email
        };
      }
      
      return { success: false, message: 'Invalid email or password' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Return user without password
    const { password: _, verificationCode, ...userWithoutPassword } = user;
    
    return { 
      success: true, 
      message: 'Login successful!',
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed. Please try again.' };
  }
};

// Get user by email
export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

// Update user profile
export const updateUser = (email, updates) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
    saveUsers(users);

    return { success: true, message: 'Profile updated successfully!', user: users[userIndex] };
  } catch (error) {
    console.error('Update user error:', error);
    return { success: false, message: 'Failed to update profile. Please try again.' };
  }
};

// Delete user account
export const deleteUser = (email) => {
  try {
    const users = getUsers();
    const filteredUsers = users.filter(u => u.email !== email);
    
    if (users.length === filteredUsers.length) {
      return { success: false, message: 'User not found' };
    }

    saveUsers(filteredUsers);
    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    console.error('Delete user error:', error);
    return { success: false, message: 'Failed to delete account. Please try again.' };
  }
};
