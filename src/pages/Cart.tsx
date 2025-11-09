import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, MapPin, CreditCard, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BeautyHeader from '@/components/BeautyHeader';
import Footer from '@/components/Footer';

interface Address {
  id: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, getDiscount, getFinalTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi' | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    name: user?.name || '',
    mobile: user?.mobile || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: user?.name || 'John Doe',
      mobile: user?.mobile || '9876543210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  ]);

  // Cart page uses regular header
  const isBeautyPage = false;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      const discount = getDiscount(couponCode);
      if (discount > 0) {
        setAppliedCoupon(couponCode.toUpperCase());
        setCouponCode('');
      } else {
        alert('Invalid coupon code');
      }
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.mobile || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert('Please fill all address fields');
      return;
    }

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, address]);
    setNewAddress({
      name: user?.name || '',
      mobile: user?.mobile || '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    });
    setShowAddAddress(false);
    setSelectedAddress(address.id);
  };

  const handleProceedToAddress = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    if (!isAuthenticated) {
      alert('Please login to continue');
      return;
    }
    setStep('address');
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress.id);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select or add an address');
      return;
    }
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setStep('confirmation');
    clearCart();
  };

  const subtotal = getSubtotal();
  const discount = getDiscount(appliedCoupon);
  const finalTotal = getFinalTotal(appliedCoupon);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        {isBeautyPage ? <BeautyHeader /> : <Header />}
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 text-lg mb-4">Please login to view your cart</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#FFDBAC] text-gray-900 px-6 py-2 rounded-lg hover:bg-[#e6c59a] transition-colors"
          >
            Go to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isBeautyPage ? <BeautyHeader /> : <Header />}

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => step === 'cart' ? navigate(-1) : setStep('cart')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'cart' ? 'text-[#FFDBAC]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'cart' ? 'bg-[#FFDBAC] text-gray-900' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="hidden md:block">Cart</span>
            </div>
            <div className={`w-16 h-1 ${step !== 'cart' ? 'bg-[#FFDBAC]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step === 'address' ? 'text-[#FFDBAC]' : step === 'payment' || step === 'confirmation' ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'address' || step === 'payment' || step === 'confirmation' ? 'bg-[#FFDBAC] text-gray-900' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="hidden md:block">Address</span>
            </div>
            <div className={`w-16 h-1 ${step === 'payment' || step === 'confirmation' ? 'bg-[#FFDBAC]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#FFDBAC]' : step === 'confirmation' ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' || step === 'confirmation' ? 'bg-[#FFDBAC] text-gray-900' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="hidden md:block">Payment</span>
            </div>
            <div className={`w-16 h-1 ${step === 'confirmation' ? 'bg-[#FFDBAC]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-[#FFDBAC]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-[#FFDBAC] text-gray-900' : 'bg-gray-200'}`}>
                <Check className="w-5 h-5" />
              </div>
              <span className="hidden md:block">Confirm</span>
            </div>
          </div>
        </div>

        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
              
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-[#FFDBAC] text-gray-900 px-6 py-2 rounded-lg hover:bg-[#e6c59a] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.product._id} className="bg-white rounded-lg p-4 flex gap-4">
                      <img
                        src={item.product.images[0] || '/placeholder.svg'}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-900">₹{item.product.price * item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.product._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm font-medium">
                      🚚 Dispatch in 2-3 days
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Coupon Code */}
                <div className="mb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium text-green-800">Coupon Applied</p>
                        <p className="text-xs text-green-600">{appliedCoupon}</p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToAddress}
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'address' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Delivery Address</h1>
            
            <div className="space-y-4 mb-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-colors ${
                    selectedAddress === address.id ? 'border-[#FFDBAC]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-[#FFDBAC] text-gray-900 px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{address.mobile}</p>
                      <p className="text-sm text-gray-600">
                        {address.address}, {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    <input
                      type="radio"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="w-5 h-5 text-[#FFDBAC]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {showAddAddress ? (
              <div className="bg-white rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={newAddress.mobile}
                    onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                  <textarea
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDBAC]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 bg-[#FFDBAC] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#e6c59a] transition-colors"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-[#FFDBAC] hover:text-[#FFDBAC] transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Add New Address</span>
              </button>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={!selectedAddress}
              className="w-full mt-6 bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h1>
            
            <div className="space-y-4 mb-6">
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-[#FFDBAC]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-5 h-5 text-[#FFDBAC]"
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('card')}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-[#FFDBAC]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Pay securely with card</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-[#FFDBAC]"
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('upi')}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'upi' ? 'border-[#FFDBAC]' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">UPI</h3>
                      <p className="text-sm text-gray-600">Pay with UPI apps</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="w-5 h-5 text-[#FFDBAC]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={!paymentMethod}
              className="w-full bg-[#FFDBAC] text-gray-900 font-semibold py-3 rounded-lg hover:bg-[#e6c59a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Order
            </button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Order will be dispatched in 2-3 days</p>
                <p className="text-sm text-gray-600">You will receive a confirmation email shortly</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#FFDBAC] text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-[#e6c59a] transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  className="border border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

