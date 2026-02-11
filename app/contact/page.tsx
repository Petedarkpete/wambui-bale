'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
    baleType: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const message = `Hi! I'm ${formData.name} from ${formData.business}. 
    
Phone: ${formData.phone}
Email: ${formData.email}
Interested in: ${formData.baleType}

Message: ${formData.message}`
    
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your wholesale clothing journey? Get in touch with us today. 
            We're here to help you find the perfect bales for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+254 700 000 000</p>
                    <p className="text-sm text-gray-500">Available 8 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <p className="text-gray-600">+254 700 000 000</p>
                    <p className="text-sm text-gray-500">Quick responses guaranteed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@wambuibales.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Gikomba Market</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 8 AM - 8 PM</p>
                    <p className="text-gray-600">Sunday: 10 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+254700000000"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
                <a 
                  href="https://wa.me/254700000000?text=Hi! I'd like to inquire about your clothing bales"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your business name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="baleType" className="block text-sm font-medium text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select
                    id="baleType"
                    name="baleType"
                    value={formData.baleType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select bale type</option>
                    <option value="ladies">Ladies Bales</option>
                    <option value="gents">Gents Bales</option>
                    <option value="kids">Kids Bales</option>
                    <option value="mixed">Mixed Bales</option>
                    <option value="bulk">Bulk Orders (5+ bales)</option>
                    <option value="consultation">Business Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your business needs, preferred bale types, budget, location, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="mr-2 w-5 h-5" />
                  Send Message via WhatsApp
                </button>
                
                <p className="text-sm text-gray-600 text-center">
                  This form will open WhatsApp with your message pre-filled for quick sending.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Location</h3>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Gikomba Market</h4>
                <p className="text-gray-500">Nairobi, Kenya</p>
                <p className="text-sm text-gray-400 mt-2">
                  Interactive map integration would be implemented here
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Located in the heart of Gikomba Market, Kenya's largest second-hand clothing market.
              </p>
              <a 
                href="https://maps.google.com/?q=Gikomba+Market+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <MapPin className="mr-2 w-4 h-4" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
