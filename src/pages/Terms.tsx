import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="luxury-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Rent the Moment's services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the 
                above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Rental Services</h2>
              <p className="mb-4">Our rental services include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Premium clothing and accessories for special occasions</li>
                <li>Professional cleaning and maintenance</li>
                <li>Size consultation and styling advice</li>
                <li>Delivery and pickup services</li>
                <li>Damage protection options</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Payment</h2>
              <p className="mb-4">
                All rentals must be booked in advance through our website or mobile app. 
                Payment is required at the time of booking and includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Rental fee for the specified period</li>
                <li>Security deposit (refundable upon return)</li>
                <li>Delivery and pickup charges (if applicable)</li>
                <li>Any additional services requested</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rental Period and Returns</h2>
              <p className="mb-4">
                Rental periods are clearly specified at the time of booking. Late returns 
                will incur additional charges:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Late return fee: ₹500 per day</li>
                <li>Items must be returned in the same condition as received</li>
                <li>All items must be professionally cleaned before return</li>
                <li>Returns must be made during business hours</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Damage and Loss Policy</h2>
              <p className="mb-4">
                Renters are responsible for any damage, loss, or theft of rented items:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Minor damage: Repair costs will be deducted from security deposit</li>
                <li>Major damage: Full replacement cost plus rental fees</li>
                <li>Loss or theft: Full replacement cost plus rental fees</li>
                <li>Stains that cannot be removed: Cleaning or replacement costs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cancellation Policy</h2>
              <p className="mb-4">
                Cancellations are subject to the following terms:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>More than 48 hours before rental: Full refund</li>
                <li>24-48 hours before rental: 50% refund</li>
                <li>Less than 24 hours before rental: No refund</li>
                <li>Same-day cancellations: No refund</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Size and Fit</h2>
              <p className="mb-4">
                We provide size guides and consultation services, but we cannot guarantee 
                perfect fit. Renters are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing accurate measurements</li>
                <li>Following our size guide recommendations</li>
                <li>Requesting size exchanges within 24 hours of delivery</li>
                <li>Understanding that some alterations may not be possible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="mb-4">You may not use our services:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall Rent the Moment, nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be interpreted and governed by the laws of India. Any disputes 
                arising from these terms will be subject to the exclusive jurisdiction of the 
                courts in India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. We will notify users of 
                any material changes by posting the new Terms and Conditions on this page and 
                updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> legal@rentthemoment.com</p>
                <p><strong>Phone:</strong> 7909921367</p>
                <p><strong>Address:</strong> Rent the Moment, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
