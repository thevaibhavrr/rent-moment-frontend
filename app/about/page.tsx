import { Heart, Users, Star, Shield, Truck, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Rent the Moment</h1>
          <p className="text-xl text-pink-100 max-w-3xl mx-auto">
            We're revolutionizing fashion by making designer clothes accessible to everyone. 
            No more buying expensive outfits for one-time events - rent, wear, and return!
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To democratize fashion by creating a sustainable, accessible platform where everyone 
              can experience luxury without the commitment. We believe that beautiful clothes should 
              be shared, not hoarded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Fashion</h3>
              <p className="text-gray-600">
                Reduce fashion waste by sharing clothes instead of buying new ones. 
                Every rental saves resources and reduces environmental impact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Built by fashion lovers, for fashion lovers. Our community of owners 
                and renters creates a vibrant ecosystem of shared style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Every item is carefully curated and quality-checked to ensure you 
                get the best experience for your special occasions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Rent the Moment was born from a simple observation: people were spending 
                thousands of rupees on beautiful outfits that they would only wear once. 
                Weddings, parties, festivals - each occasion demanded a new outfit, leading 
                to overflowing wardrobes and empty wallets.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We realized that fashion should be about experiences, not ownership. 
                Why buy when you can rent? Why store when you can share? This philosophy 
                led us to create India's premier fashion rental platform.
              </p>
              <p className="text-lg text-gray-600">
                Today, we connect thousands of fashion-conscious individuals across India, 
                making luxury accessible and sustainable fashion a reality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Happy Customers</span>
                  <span className="text-2xl font-bold">10,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Items Rented</span>
                  <span className="text-2xl font-bold">50,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cities Covered</span>
                  <span className="text-2xl font-bold">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Owner Partners</span>
                  <span className="text-2xl font-bold">1,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at Rent the Moment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust & Safety</h3>
              <p className="text-gray-600 text-sm">
                Every transaction is secure, every item is verified, and every user is protected.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenience</h3>
              <p className="text-gray-600 text-sm">
                Free delivery, easy booking, and hassle-free returns - we make it simple.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We maintain the highest standards for all items in our collection.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Promoting circular fashion and reducing environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to revolutionize fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-pink-600 mb-4">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Fashion enthusiast with 10+ years in the industry, passionate about sustainable fashion.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-green-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
              <p className="text-pink-600 mb-4">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Operations expert ensuring smooth logistics and customer satisfaction across India.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Arjun Patel</h3>
              <p className="text-pink-600 mb-4">Tech Lead</p>
              <p className="text-gray-600 text-sm">
                Technology innovator building the platform that connects fashion lovers nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Fashion Revolution?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Whether you want to rent beautiful clothes or earn from your wardrobe, 
            we're here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="bg-white text-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Start Renting
            </Link>
            <Link
              href="/list-item"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-200"
            >
              List Your Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
