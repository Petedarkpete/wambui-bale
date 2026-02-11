import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, Truck, Shield, ArrowRight, Phone, MessageCircle } from 'lucide-react'

export default function Home() {
  const featuredBales = [
    {
      id: 1,
      name: "Premium Ladies Mix",
      category: "Ladies",
      price: "KSh 8,500",
      weight: "45kg",
      image: "/womens-clothing-bale.png"
    },
    {
      id: 2,
      name: "Kids Assorted",
      category: "Kids",
      price: "KSh 6,200",
      weight: "35kg",
      image: "/colorful-kids-clothes-bale.png"
    },
    {
      id: 3,
      name: "Gents Casual",
      category: "Gents",
      price: "KSh 7,800",
      weight: "40kg",
      image: "/mens-casual-clothing-bale.png"
    }
  ]

  const testimonials = [
    {
      name: "Mary Wanjiku",
      business: "Mama Mary's Boutique",
      rating: 5,
      text: "Wambui Bales has been my go-to supplier for 3 years. Quality is always consistent and prices are fair."
    },
    {
      name: "John Kimani",
      business: "Eastleigh Fashion",
      rating: 5,
      text: "Fast delivery and excellent customer service. The bales always have good variety and quality items."
    },
    {
      name: "Grace Akinyi",
      business: "Grace Collections",
      rating: 5,
      text: "Started my business with Wambui Bales. They helped me understand the market and grow my shop."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Quality Clothing Bales for 
                <span className="text-blue-600"> Retailers</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premium wholesale clothing bales sourced directly from trusted suppliers. 
                Perfect for small retailers, resellers, and entrepreneurs looking to stock quality items at competitive prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="btn-primary inline-flex items-center justify-center">
                  Browse Bales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a 
                  href="https://wa.me/254726076717?text=Hi! I'd like to get a quote for clothing bales"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Get Quote on WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-gray-600">Bales Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/clothing-bales-warehouse.png"
                alt="Clothing bales warehouse"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality Guaranteed</div>
                    <div className="text-sm text-gray-600">100% Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Wambui Bales?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best wholesale clothing experience for retailers across Kenya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every bale is carefully inspected to ensure you receive only the best quality clothing items for your customers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery across Kenya. Get your bales delivered to your doorstep within 24-48 hours.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Our experienced team provides guidance on market trends and helps you choose the right bales for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bales */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Bales
            </h2>
            <p className="text-xl text-gray-600">
              Check out our most popular clothing bales this month
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBales.map((bale) => (
              <div key={bale.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src={bale.image || "/placeholder.svg"}
                  alt={bale.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {bale.category}
                    </span>
                    <span className="text-sm text-gray-600">{bale.weight}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{bale.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{bale.price}</span>
                    <a 
                      href={`https://wa.me/254726076717?text=Hi! I'm interested in the ${bale.name} bale for ${bale.price}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary">
              View All Bales
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from successful retailers who trust Wambui Bales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.business}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Wholesale Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful retailers who trust Wambui Bales for their clothing inventory needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254726076717"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now: +254 726 076 717
            </a>
            <a 
              href="https://wa.me/254726076717?text=Hi! I'd like to learn more about your clothing bales"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
