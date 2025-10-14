"use client";
import React, { useState } from 'react';
import { CreditCard, FileText, Calendar, Download, Eye, Phone, Mail, MapPin, Send, CheckCircle, XCircle, Clock, Plus, Search, Filter } from 'lucide-react';

// Type definitions
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'processing';
type PaymentMethod = 'esewa' | 'khalti' | 'connectips' | 'fonepay' | 'bank_transfer';

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: PaymentStatus;
  period: string;
  description: string;
  downloadUrl?: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  transactionId: string;
  date: string;
  status: PaymentStatus;
  description: string;
}

interface PaymentInquiry {
  id: number;
  type: 'invoice' | 'payment';
  referenceId: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  dateSubmitted: string;
  adminReply?: string;
}

const SchoolInvoicePayment = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'inquiries'>('invoices');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('esewa');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');

  // Sample data
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      issueDate: '2025-01-01',
      dueDate: '2025-01-15',
      amount: 25000,
      status: 'paid',
      period: 'January 2025',
      description: 'STEAM Education Package - Monthly Subscription',
      downloadUrl: '#'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      issueDate: '2025-02-01',
      dueDate: '2025-02-15',
      amount: 25000,
      status: 'pending',
      period: 'February 2025',
      description: 'STEAM Education Package - Monthly Subscription'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-012',
      issueDate: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 25000,
      status: 'paid',
      period: 'December 2024',
      description: 'STEAM Education Package - Monthly Subscription',
      downloadUrl: '#'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-011',
      issueDate: '2024-11-01',
      dueDate: '2024-11-15',
      amount: 25000,
      status: 'overdue',
      period: 'November 2024',
      description: 'STEAM Education Package - Monthly Subscription'
    }
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: '1',
      invoiceId: '1',
      amount: 25000,
      method: 'esewa',
      transactionId: 'ESW123456789',
      date: '2025-01-10',
      status: 'paid',
      description: 'Payment for January 2025'
    },
    {
      id: '2',
      invoiceId: '3',
      amount: 25000,
      method: 'khalti',
      transactionId: 'KHT987654321',
      date: '2024-12-08',
      status: 'paid',
      description: 'Payment for December 2024'
    },
    {
      id: '3',
      invoiceId: '2',
      amount: 25000,
      method: 'connectips',
      transactionId: 'CIP456789123',
      date: '2025-02-05',
      status: 'processing',
      description: 'Payment for February 2025'
    }
  ]);

  const [inquiries, setInquiries] = useState<PaymentInquiry[]>([
    {
      id: 1,
      type: 'invoice',
      referenceId: 'INV-2025-001',
      subject: 'Invoice Amount Discrepancy',
      message: 'There seems to be an additional charge in this invoice that was not discussed.',
      status: 'resolved',
      dateSubmitted: '2025-01-08',
      adminReply: 'The additional charge was for premium support package. This has been corrected.'
    }
  ]);

  const [newInquiry, setNewInquiry] = useState({
    type: 'invoice' as 'invoice' | 'payment',
    referenceId: '',
    subject: '',
    message: ''
  });

  const financeContact = {
    name: 'Rajesh Sharma',
    position: 'Finance Manager',
    phone: '+977-1-0000000',
    email: 'finance@steamedu.com.np',
    address: 'Kathmandu, Nepal'
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPaymentMethodLogo = (method: PaymentMethod) => {
    const logos = {
      esewa: '🟢 eSewa',
      khalti: '🟣 Khalti',
      connectips: '🔵 ConnectIPS',
      fonepay: '🟡 FonePay',
      bank_transfer: '🏦 Bank Transfer'
    };
    return logos[method];
  };

  const handlePayment = () => {
    // Here you would integrate with the actual payment gateway
    alert(`Redirecting to ${selectedPaymentMethod} for payment of Rs. ${selectedInvoice?.amount}`);
    setShowPaymentModal(false);
  };

  const handleSubmitInquiry = () => {
    const inquiry: PaymentInquiry = {
      id: inquiries.length + 1,
      ...newInquiry,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    setInquiries([inquiry, ...inquiries]);
    setNewInquiry({ type: 'invoice', referenceId: '', subject: '', message: '' });
    setShowInquiryModal(false);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700">Invoice & Payment Management</h1>
                <p className="text-gray-600">Manage your STEAM education subscriptions and payments</p>
              </div>
            </div>
            <div className="bg-blue-50 px-6 py-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">Monthly Subscription</p>
              <p className="text-2xl font-bold text-blue-700">Rs. 25,000</p>
            </div>
          </div>
        </div>

        {/* Finance Contact Card */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <h2 className="text-lg font-bold text-blue-700 mb-4">Finance Support Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{financeContact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{financeContact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-800">{financeContact.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">R</div>
              <div>
                <p className="text-sm text-gray-600">Manager</p>
                <p className="font-medium text-gray-800">{financeContact.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'invoices'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Invoices ({invoices.length})
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payments ({payments.length})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inquiries ({inquiries.length})
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowInquiryModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Inquiry
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mt-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as PaymentStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-white/90 rounded-xl shadow-lg border border-blue-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{invoice.invoiceNumber}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(invoice.status)}`}>
                        {invoice.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{invoice.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Period: {invoice.period}
                      </span>
                      <span>Due: {invoice.dueDate}</span>
                      <span className="text-lg font-bold text-blue-600">Rs. {invoice.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {invoice.downloadUrl && (
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                    {invoice.status === 'pending' || invoice.status === 'overdue' ? (
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPaymentModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </button>
                    ) : (
                      <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Paid
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="bg-white/90 rounded-xl shadow-lg border border-blue-100 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{payment.transactionId}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{payment.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {payment.date}
                      </span>
                      <span>{getPaymentMethodLogo(payment.method)}</span>
                      <span className="text-lg font-bold text-green-600">Rs. {payment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white/90 rounded-xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-800">{inquiry.subject}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inquiry.status === 'resolved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {inquiry.status.toUpperCase()}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    {inquiry.type === 'invoice' ? 'Invoice' : 'Payment'} Reference: {inquiry.referenceId}
                  </p>
                  <p className="text-gray-700">{inquiry.message}</p>
                </div>
                {inquiry.adminReply && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <h4 className="font-medium text-green-800 mb-2">Admin Reply:</h4>
                    <p className="text-green-700">{inquiry.adminReply}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-3">Submitted: {inquiry.dateSubmitted}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Make Payment</h2>
              <p className="text-gray-600 text-sm">Invoice: {selectedInvoice.invoiceNumber}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-blue-600">Rs. {selectedInvoice.amount.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method</label>
                <div className="space-y-2">
                  {(['esewa', 'khalti', 'connectips', 'fonepay','bank_transfer'] as PaymentMethod[]).map((method) => (
                    <label key={method} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPaymentMethod === method}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                        className="mr-3"
                      />
                      <span className="text-lg">{getPaymentMethodLogo(method)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pay Rs. {selectedInvoice.amount.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Submit Inquiry</h2>
              <p className="text-gray-600 text-sm">Have questions about an invoice or payment? We're here to help.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                  <select
                    value={newInquiry.type}
                    onChange={(e) => setNewInquiry({...newInquiry, type: e.target.value as 'invoice' | 'payment'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="invoice">Invoice Related</option>
                    <option value="payment">Payment Related</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
                  <input
                    type="text"
                    value={newInquiry.referenceId}
                    onChange={(e) => setNewInquiry({...newInquiry, referenceId: e.target.value})}
                    placeholder="Invoice or Transaction ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newInquiry.subject}
                  onChange={(e) => setNewInquiry({...newInquiry, subject: e.target.value})}
                  placeholder="Brief description of your inquiry"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newInquiry.message}
                  onChange={(e) => setNewInquiry({...newInquiry, message: e.target.value})}
                  rows={5}
                  placeholder="Please provide detailed information about your inquiry"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitInquiry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolInvoicePayment;