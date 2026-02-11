import Image from 'next/image'
import { Award, Users, Truck, Heart } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '500+' },
    { icon: Truck, label: 'Bales Delivered', value: '5,000+' },
    { icon: Award, label: 'Years Experience', value: '3+' },
    { icon: Heart, label: 'Customer Satisfaction', value: '98%' },
  ]

  return (
    <div className="section-padding bg-white">
      <div className="container-max">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Wambui Bales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in wholesale clothing, helping small retailers and entrepreneurs 
            build successful businesses with quality clothing bales at competitive prices.
          </p>
        </div>

        {/* Founder Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/wambui-profile.jpeg"
              alt="Wambui - Founder"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Meet Wambui</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wambui started her journey in the clothing business over 5 years ago as a small retailer 
              in Gikomba Market. She understood the challenges that small business owners face when 
              trying to source quality clothing at affordable prices.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              After years of building relationships with suppliers and understanding the market, 
              Wambui decided to help other entrepreneurs by providing direct access to quality 
              clothing bales. Her mission is simple: to empower small retailers with the best 
              products and support to grow their businesses.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Wambui Bales serves over 500 retailers across Kenya, providing not just 
              quality products but also business guidance and support to help entrepreneurs succeed.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To empower small retailers and entrepreneurs across Kenya by providing access to 
              high-quality clothing bales at competitive prices, along with the support and 
              guidance needed to build successful businesses.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Quality first - Every bale is carefully inspected
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Fair pricing - Competitive rates for all customers
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Customer support - We're here to help you succeed
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Community focus - Supporting local entrepreneurs
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Retailers Choose Wambui Bales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Quality Assurance</h4>
              <p className="text-gray-600">
                Every bale is personally inspected by Wambui to ensure you receive only the best quality items.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Business Support</h4>
              <p className="text-gray-600">
                Get advice on market trends, pricing strategies, and business growth from someone who's been there.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Reliable Partnership</h4>
              <p className="text-gray-600">
                Build a long-term relationship with a supplier who understands your business needs and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
