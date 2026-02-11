'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, MessageCircle, Phone } from 'lucide-react'

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What are clothing bales?",
        answer: "Clothing bales are large bundles of second-hand or factory overrun clothing sold in bulk. Each bale typically contains 35-50kg of mixed clothing items, perfect for retailers who want to stock their stores with variety at wholesale prices."
      },
      {
        question: "How many pieces are in a typical bale?",
        answer: "The number of pieces varies by category: Kids bales typically have 100-120 pieces, Ladies bales have 80-100 pieces, Gents bales have 60-80 pieces, and Mixed bales have 90-110 pieces. The exact count depends on the types of clothing included."
      },
      {
        question: "Can I see the contents before buying?",
        answer: "While you can't see every individual item, we provide detailed photos of sample items from each bale type. We also give you a breakdown of what to expect (e.g., 30% tops, 25% dresses, 20% pants, etc.)."
      }
    ]
  },
  {
    category: "Ordering & Payment",
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order by calling us at +254 726 076717 or messaging us on WhatsApp. Tell us what type of bales you need, and we'll guide you through the process and provide current availability and pricing."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept M-Pesa payments, bank transfers, and cash on delivery (Nairobi area only). For M-Pesa, use Paybill 123456 with your phone number as the account number. Bank details are provided upon order confirmation."
      },
      {
        question: "Do I need to pay upfront?",
        answer: "Yes, we require full payment before dispatch for most orders. However, for established customers or large orders, we may offer payment terms. Cash on delivery is available within Nairobi for an additional fee."
      },
      {
        question: "Can I get a discount for bulk orders?",
        answer: "Yes! We offer discounts for orders of 5+ bales. The more you order, the better the price. Contact us to discuss bulk pricing for your specific needs."
      }
    ]
  },
  {
    category: "Delivery & Shipping",
    questions: [
      {
        question: "How long does delivery take?",
        answer: "Delivery times vary by location: Within Nairobi (same day or next day), Major towns like Mombasa, Kisumu (2-3 days), Other areas (3-5 days). We'll provide a specific timeline when you place your order."
      },
      {
        question: "What are the delivery costs?",
        answer: "Delivery costs are: Within Nairobi - KSh 500, Major towns - KSh 800-1,200, Remote areas - KSh 1,500+. FREE delivery for orders above KSh 15,000 anywhere in Kenya!"
      },
      {
        question: "Do you deliver nationwide?",
        answer: "Yes, we deliver to all parts of Kenya. We use reliable courier services and matatu services to ensure your bales reach you safely, regardless of your location."
      },
      {
        question: "Can I track my delivery?",
        answer: "Yes, once your order is dispatched, we'll provide you with tracking information and regular updates via SMS or WhatsApp until your bales are delivered."
      }
    ]
  },
  {
    category: "Quality & Returns",
    questions: [
      {
        question: "What if I'm not satisfied with my bale?",
        answer: "We stand behind our quality. If you're not satisfied, contact us within 24 hours of delivery. We'll work with you to resolve the issue, which may include a partial refund or replacement bale."
      },
      {
        question: "Do you accept returns?",
        answer: "Returns are accepted within 48 hours of delivery if the bale significantly differs from what was described. The bale must be unopened and in original condition. Return shipping costs apply unless the error was on our part."
      },
      {
        question: "How do you ensure quality?",
        answer: "Every bale is personally inspected by our team before dispatch. We remove damaged items, ensure good variety, and check that the weight and piece count meet our standards. We've been in business for 3+ years and maintain high quality standards."
      },
      {
        question: "What condition are the clothes in?",
        answer: "Our clothes are in good, wearable condition. They're mostly second-hand items that have been sorted and cleaned. Some may show minor signs of wear, but all are suitable for resale. We also carry some factory overruns which are new items."
      }
    ]
  },
  {
    category: "Business Support",
    questions: [
      {
        question: "Do you provide business advice?",
        answer: "Yes! We help new retailers understand the market, pricing strategies, and what sells well in different areas. Our founder Wambui has years of experience and is happy to share insights to help your business succeed."
      },
      {
        question: "Can you help me choose the right bales?",
        answer: "Tell us about your location, target customers, and budget. We'll recommend the best bale types for your market and help you build a diverse inventory that sells well."
      },
      {
        question: "Do you offer credit terms for regular customers?",
        answer: "For established customers with a good payment history, we may offer credit terms of 7-14 days. This is evaluated on a case-by-case basis after you've completed several successful orders."
      }
    ]
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our clothing bales, ordering process, 
            delivery, and more. Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems.includes(itemId)
                  
                  return (
                    <div key={faqIndex} className="p-6">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full text-left flex items-center justify-between group"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          )}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="mt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-blue-600 p-8 lg:p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team is here to help! Contact us directly for personalized assistance 
            with your clothing bale needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254726076717"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call: +254 726 076717
            </a>
            <a 
              href="https://wa.me/254726076717?text=Hi! I have a question about your clothing bales"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
