import { Phone, Package, Truck, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: "Contact Us",
      description: "Call or WhatsApp us to discuss your needs. Tell us what type of bales you're looking for and your budget.",
      details: [
        "Call +254 726 076717",
        "WhatsApp for instant response",
        "Discuss your specific requirements",
        "Get personalized recommendations"
      ]
    },
    {
      icon: Package,
      title: "Choose Your Bales",
      description: "Browse our available stock and select the bales that match your business needs. We'll provide detailed information about each bale.",
      details: [
        "View available bales with photos",
        "Get detailed descriptions and piece counts",
        "Receive pricing information",
        "Ask questions about specific items"
      ]
    },
    {
      icon: Truck,
      title: "Payment & Delivery",
      description: "Make payment through M-Pesa or bank transfer. We'll arrange fast delivery to your location within 24-48 hours.",
      details: [
        "Secure payment via M-Pesa or bank transfer",
        "Receive payment confirmation",
        "Track your delivery status",
        "Get delivery within 24-48 hours"
      ]
    }
  ]

  const paymentMethods = [
    {
      name: "M-Pesa",
      description: "Pay instantly using M-Pesa. Safe, secure, and convenient.",
      number: "Paybill: 123456, Account: Your Phone Number"
    },
    {
      name: "Bank Transfer",
      description: "Direct bank transfer for larger orders.",
      details: "Bank details provided upon order confirmation"
    },
    {
      name: "Cash on Delivery",
      description: "Pay when you receive your bales (Nairobi area only).",
      note: "Available for orders within Nairobi"
    }
  ]

  return (
    <div className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your clothing bales is simple and straightforward. Follow these three easy steps 
            to start stocking your store with quality clothing.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      Step {index + 1}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
                  <div className="text-center">
                    <step.icon className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-xl font-semibold text-gray-800">
                      {step.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Payment Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="text-xl font-semibold mb-3">{method.name}</h4>
                <p className="text-gray-600 mb-4">{method.description}</p>
                {method.number && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">{method.number}</p>
                  </div>
                )}
                {method.details && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">{method.details}</p>
                  </div>
                )}
                {method.note && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">{method.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Delivery Areas</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Nairobi & Surrounding Areas</h4>
                  <p className="text-gray-600">Same day or next day delivery available</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Major Towns</h4>
                  <p className="text-gray-600">Mombasa, Kisumu, Nakuru, Eldoret - 2-3 days</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Other Areas</h4>
                  <p className="text-gray-600">3-5 days depending on location</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Delivery Costs</h3>
            <div className="bg-white border rounded-xl p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Within Nairobi</span>
                  <span className="font-semibold">KSh 500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Major Towns</span>
                  <span className="font-semibold">KSh 800 - 1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Remote Areas</span>
                  <span className="font-semibold">KSh 1,500+</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Orders above KSh 15,000</span>
                    <span>FREE Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 p-8 lg:p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your clothing bale needs. Our team is ready to help you find the perfect bales for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254700000000"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now: +254 700 000 000
            </a>
            <a 
              href="https://wa.me/254700000000?text=Hi! I'd like to learn more about ordering clothing bales"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Package className="mr-2 w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
