'use client'

import { useRef, useState } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'

const ticketStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

  .tw-wrap {
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
    background: #f5f3ff;
    border-radius: 12px;
  }

  .tw-ticket {
    width: 540px;
    background: #fff;
    border-radius: 16px;
    border: 0.5px solid #ddd6fe;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 0 0 4px #ede9fe;
  }

  .tw-header {
    background: #f5f3ff;
    border-bottom: 0.5px solid #ddd6fe;
    padding: 26px 32px 22px;
    position: relative;
  }

  .tw-corner-ornament {
    position: absolute;
    top: 16px; right: 24px;
    font-size: 40px;
    color: #ddd6fe;
    font-family: 'Playfair Display', serif;
    line-height: 1;
    user-select: none;
  }

  .tw-hosted {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 6px;
  }

  .tw-event-name {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: #3b0764;
    line-height: 1.15;
    margin-bottom: 5px;
  }

  .tw-tagline {
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: #7c3aed;
    margin-bottom: 10px;
  }

  .tw-slogan {
    display: inline-block;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 12.5px;
    color: #6d28d9;
    background: #ede9fe;
    padding: 4px 14px;
    border-radius: 20px;
    border: 0.5px solid #c4b5fd;
  }

  .tw-divider {
    display: flex;
    align-items: center;
    background: #fff;
    position: relative;
  }

  .tw-notch {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #f5f3ff;
    border: 0.5px solid #ddd6fe;
    flex-shrink: 0;
  }
  .tw-notch.l { margin-left: -13px; }
  .tw-notch.r { margin-right: -13px; }

  .tw-dash {
    flex: 1;
    border-top: 1.5px dashed #ddd6fe;
    margin: 0 6px;
  }

  .tw-admit {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #a78bfa;
    flex-shrink: 0;
    padding: 0 6px;
  }

  .tw-body {
    padding: 20px 32px 18px;
    background: #fff;
  }

  .tw-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 20px;
    margin-bottom: 18px;
  }

  .tw-detail label {
    display: block;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 3px;
  }

  .tw-detail span {
    font-size: 13px;
    font-weight: 500;
    color: #3b0764;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tw-pillars {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tw-pillar {
    font-size: 10px;
    font-weight: 500;
    color: #6d28d9;
    background: #ede9fe;
    border: 0.5px solid #c4b5fd;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .tw-footer {
    background: #faf5ff;
    border-top: 0.5px solid #ddd6fe;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .tw-qr {
    width: 74px;
    height: 74px;
    background: #fff;
    border-radius: 8px;
    border: 0.5px solid #ddd6fe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 4px;
  }

  .tw-holder {
    flex: 1;
  }

  .tw-holder label {
    display: block;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #7c3aed;
    margin-bottom: 3px;
  }

  .tw-holder .tw-name {
    font-size: 16px;
    font-weight: 600;
    color: #3b0764;
    margin-bottom: 7px;
  }

  .tw-mpesa-row {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .tw-mpesa-badge {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #065f46;
    background: #d1fae5;
    border: 0.5px solid #6ee7b7;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .tw-mpesa-code {
    font-size: 12px;
    font-weight: 600;
    color: #064e3b;
    letter-spacing: 1.5px;
    font-family: 'Inter', monospace;
  }

  .tw-price-block {
    text-align: right;
    flex-shrink: 0;
  }

  .tw-price {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #6d28d9;
  }

  .tw-price-sub {
    font-size: 9.5px;
    color: #a78bfa;
    margin-top: -1px;
  }

  .tw-enquiry {
    font-size: 9px;
    color: #a78bfa;
    margin-top: 7px;
  }
`

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
    baleType: ''
  })

  const [ticketForm, setTicketForm] = useState({
    name: '',
    mpesaCode: ''
  })
  const [ticketMessage, setTicketMessage] = useState('')
  const [generatedTicket, setGeneratedTicket] = useState<{
    name: string
    mpesaCode: string
    ticketId: string
    date: string
  } | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const ticketRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `Hi! I'm ${formData.name} from ${formData.business}. 
    
Phone: ${formData.phone}
Email: ${formData.email}
Interested in: ${formData.baleType}

Message: ${formData.message}`

    const whatsappUrl = `https://wa.me/254757270511?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setTicketMessage('')
  }

  const handleGenerateTicket = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ticketForm.name.trim() || !ticketForm.mpesaCode.trim()) {
      setTicketMessage('Please enter your name and M-Pesa code to generate your ticket.')
      setGeneratedTicket(null)
      setQrDataUrl('')
      return
    }

    const ticketId = `${ticketForm.mpesaCode}-${Date.now().toString().slice(-5)}`
    const date = new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
    const qrText = `${ticketForm.name} | ${ticketForm.mpesaCode}`

    try {
      const qrUrl = await QRCode.toDataURL(qrText, { width: 140, margin: 1 })
      setQrDataUrl(qrUrl)
    } catch (error) {
      setQrDataUrl('')
    }

    setGeneratedTicket({
      name: ticketForm.name,
      mpesaCode: ticketForm.mpesaCode,
      ticketId,
      date
    })
    setTicketMessage('Ticket generated. Click the button below to download your actual ticket.')
  }

  const handleDownloadTicket = async () => {
    if (!generatedTicket || !ticketRef.current) {
      setTicketMessage('Please generate the ticket first, then download it.')
      return
    }

    // Clone the ticket into an offscreen fixed-size wrapper to ensure
    // the same pixel dimensions are captured on mobile and desktop.
    const original = ticketRef.current
    const clone = original.cloneNode(true) as HTMLElement
    clone.style.width = '540px'
    clone.style.maxWidth = '540px'
    clone.style.boxSizing = 'border-box'

    const wrapper = document.createElement('div')
    wrapper.style.position = 'absolute'
    wrapper.style.top = '-99999px'
    wrapper.style.left = '0'
    wrapper.style.width = '540px'
    wrapper.style.padding = '0'
    wrapper.style.background = '#ffffff'
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    // Wait for fonts/images to load
    if ((document as any).fonts && (document as any).fonts.ready) {
      try { await (document as any).fonts.ready } catch (e) { /* ignore */ }
    }

    const canvas = await html2canvas(clone, { scale: 2, backgroundColor: '#ffffff', useCORS: true })
    const imgData = canvas.toDataURL('image/png')

    // Cleanup wrapper
    document.body.removeChild(wrapper)

    // Create a larger PDF page and center the ticket image at half the page width
    const pageWidth = 900
    const pageHeight = 600
    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [pageWidth, pageHeight] })
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    const imgTargetWidth = Math.floor(pageWidth * 0.5)
    const imgTargetHeight = (canvas.height * imgTargetWidth) / canvas.width
    const left = Math.round((pageWidth - imgTargetWidth) / 2)
    const top = Math.round((pageHeight - imgTargetHeight) / 2)
    doc.addImage(imgData, 'PNG', left, top, imgTargetWidth, imgTargetHeight)

    const fileName = `WambuiBales-Ticket-${generatedTicket.name.replace(/\s+/g, '_')}.pdf`
    doc.save(fileName)
    setTicketMessage('Your ticket PDF has been downloaded.')
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
                    <p className="text-gray-600">+254 757 270 511</p>
                    <p className="text-sm text-gray-500">Available 8 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <p className="text-gray-600">+254 757 270 511</p>
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
                  href="tel:+254757270511"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/254757270511?text=Hi! I'd like to inquire about your clothing bales"
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
                      placeholder="+254 757 270 511"
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

        {/* Ticket Generator */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Generate Your Event Ticket</h3>
            <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
              Enter your name and M-Pesa payment code to create a downloadable ticket for our special event.
            </p>
            <form onSubmit={handleGenerateTicket} className="space-y-6 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ticketName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="ticketName"
                    name="name"
                    value={ticketForm.name}
                    onChange={handleTicketChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mpesaCode" className="block text-sm font-medium text-gray-700 mb-2">
                    M-Pesa Code
                  </label>
                  <input
                    type="text"
                    id="mpesaCode"
                    name="mpesaCode"
                    value={ticketForm.mpesaCode}
                    onChange={handleTicketChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. ABC123XYZ"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Generate Ticket
              </button>

              {generatedTicket ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Ticket Generated</p>
                    <p>Name: {generatedTicket.name}</p>
                    <p>M-Pesa Code: {generatedTicket.mpesaCode}</p>
                    <p>Date: {generatedTicket.date}</p>
                    <p>Ticket ID: {generatedTicket.ticketId}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadTicket}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Download Actual Ticket
                  </button>
                </div>
              ) : null}

              {ticketMessage ? (
                <p className="text-sm text-green-600 text-center">{ticketMessage}</p>
              ) : null}
            </form>

            {generatedTicket ? (
              <div className="mt-8 tw-wrap">
                <div className="tw-ticket" ref={ticketRef}>
                  <style>{ticketStyles}</style>
                  <div className="tw-header">
                    <div className="tw-corner-ornament">✦</div>
                    <div className="tw-hosted">Hosted by Wambui Munene</div>
                    <div className="tw-event-name">Turban Girlies<br />Reconnect</div>
                    <div className="tw-tagline">Reconnect • Network • Reflect • Renew</div>
                    <div className="tw-slogan">"Kuokoka sio Kuboeka"</div>
                  </div>

                  <div className="tw-divider">
                    <div className="tw-notch l" />
                    <div className="tw-dash" />
                    <div className="tw-admit">Admit One</div>
                    <div className="tw-dash" />
                    <div className="tw-notch r" />
                  </div>

                  <div className="tw-body">
                    <div className="tw-grid">
                      <div className="tw-detail">
                        <label>Date</label>
                        <span>9th August 2026</span>
                      </div>
                      <div className="tw-detail">
                        <label>Time</label>
                        <span>12:00 PM – 5:00 PM</span>
                      </div>
                      <div className="tw-detail">
                        <label>Venue</label>
                        <span>3's Garden, Ruiru</span>
                      </div>
                      <div className="tw-detail">
                        <label>Dress Theme</label>
                        <span>
                          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#7c3aed', flexShrink: 0, display: 'inline-block' }} />
                          Purple Elegance
                        </span>
                      </div>
                    </div>
                    <div className="tw-pillars">
                      <span className="tw-pillar">✦ Fellowship</span>
                      <span className="tw-pillar">✦ Networking</span>
                      <span className="tw-pillar">✦ Worship</span>
                      <span className="tw-pillar">✦ Mentorship</span>
                    </div>
                  </div>

                  <div className="tw-footer">
                    <div className="tw-qr">
                      {qrDataUrl ? (
                        <img src={qrDataUrl} alt="Ticket QR code" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-slate-100" />
                      )}
                    </div>

                    <div className="tw-holder">
                      <label>Ticket Holder</label>
                      <div className="tw-name">{generatedTicket.name}</div>
                      <div className="tw-mpesa-row">
                        <span className="tw-mpesa-badge">M-Pesa</span>
                        <span className="tw-mpesa-code">{generatedTicket.mpesaCode}</span>
                      </div>
                    </div>

                    <div className="tw-price-block">
                      <div className="tw-price">KSh 1,500</div>
                      <div className="tw-price-sub">Entry Fee</div>
                      <div className="tw-enquiry">Enquiries: 0726 076 717</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Location</h3>
            <div className="rounded-lg overflow-hidden h-96">
              <iframe
                width="90%"
                height="90%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.631610594496!2d36.8336190935791!3d-1.2844452999999965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1136ee3d3e87%3A0xddd28795543ff541!2sMumbai%20Shopping%20Complex!5e0!3m2!1sen!2ske!4v1770819408384!5m2!1sen!2ske"
              >
              </iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Located in the heart of Gikomba Market, Kenya's largest second-hand clothing market.
              </p>
              <a
                href="https://maps.app.goo.gl/MFsefAkeb39igaAu6"
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
