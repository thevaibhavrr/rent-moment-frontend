import { useNavigate } from 'react-router-dom';
import { User2, MapPin, Heart, Package, Phone, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';
import { useState, useRef } from 'react';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'menu' | 'profile' | 'address' | 'orders'>('menu');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    dateOfBirth: '',
    gender: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Save profile details (in real app, this would be an API call)
    alert('Profile updated successfully!');
    setActiveSection('menu');
  };

  const handleCallCustomerCare = () => {
    const phoneNumber = "7909921367";
    window.location.href = `tel:${phoneNumber}`;
  };

  const menuItems = [
    {
      id: 'profile',
      icon: User2,
      title: 'My Profile',
      description: 'View and edit your profile details',
      onClick: () => setActiveSection('profile'),
    },
    {
      id: 'address',
      icon: MapPin,
      title: 'My Addresses',
      description: 'Manage your delivery addresses',
      onClick: () => setActiveSection('address'),
    },
    {
      id: 'wishlist',
      icon: Heart,
      title: 'My Wishlist',
      description: 'View your saved items',
      onClick: () => navigate('/wishlist'),
    },
    {
      id: 'orders',
      icon: Package,
      title: 'Order History',
      description: 'View your past orders',
      onClick: () => setActiveSection('orders'),
    },
    {
      id: 'customer-care',
      icon: Phone,
      title: 'Customer Care',
      description: 'Call us for support',
      onClick: handleCallCustomerCare,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => activeSection === 'menu' ? navigate(-1) : setActiveSection('menu')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {activeSection === 'menu' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
            
            {/* User Info Card */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FFDBAC] rounded-full flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-gray-600">{user?.mobile || ''}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className="w-full bg-white rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
                  >
                    <div className="w-12 h-12 bg-[#FFDBAC]/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#FFDBAC]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full mt-6 bg-red-50 text-red-600 font-semibold py-3 rounded-lg hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-[#FFDBAC] rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-[#FFDBAC] rounded-full flex items-center justify-center shadow-lg hover:bg-[#e6c59a] transition-colors"
                  >
                    <Camera className="w-5 h-5 text-gray-900" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">Click camera icon to upload photo</p>
              </div>

              {/* Profile Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={userDetails.mobile}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Mobile number cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={userDetails.dateOfBirth}
                    onChange={(e) => setUserDetails({ ...userDetails, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setActiveSection('menu')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'address' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
              <button
                onClick={() => navigate('/cart?step=address')}
                className="bg-[#FFDBAC] text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-[#e6c59a] transition-colors"
              >
                Add New Address
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Sample addresses - in real app, these would come from API */}
              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">John Doe</h3>
                      <span className="text-xs bg-[#FFDBAC] text-gray-900 px-2 py-1 rounded">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">9876543210</p>
                    <p className="text-sm text-gray-600">
                      123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Jane Doe</h3>
                    <p className="text-sm text-gray-600 mb-1">9876543211</p>
                    <p className="text-sm text-gray-600">
                      456 Park Avenue, Delhi, Delhi - 110001
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
            
            <div className="space-y-4">
              {/* Sample orders - in real app, these would come from API */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #ORD123456</h3>
                    <p className="text-sm text-gray-600">Placed on January 15, 2024</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                    Delivered
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Product Name</h4>
                      <p className="text-sm text-gray-600">Quantity: 2</p>
                    </div>
                    <span className="font-semibold text-gray-900">₹1,999</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Reorder
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #ORD123455</h3>
                    <p className="text-sm text-gray-600">Placed on January 10, 2024</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
                    In Transit
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1595425970377-c970029bfaa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Product Name</h4>
                      <p className="text-sm text-gray-600">Quantity: 1</p>
                    </div>
                    <span className="font-semibold text-gray-900">₹899</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center py-8 text-gray-600">
                <p>No more orders to display</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProfileMenu;

