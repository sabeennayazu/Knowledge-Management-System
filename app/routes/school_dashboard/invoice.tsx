import React, { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router";
import { IconCurrencyRupeeNepalese } from "@tabler/icons-react";





export default function Invoice() {
  // Wrapper layout states
  const attendance = 95;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  // ------------------------------
// Mock API Data
// ------------------------------
const invoiceData = {
  company: {
    name: "EduTutor Pro",
    tagline: "Educational Services",
    address: "123 Education Street",
    city: "New York, NY 10001",
    phone: "(555) 123-4567",
    email: "billing@edututorpro.com",
  },

  invoice: {
    number: "INV-2024-001",
    date: "March 15, 2024",
    dueDate: "April 15, 2024",
  },

  billTo: {
    school: "Sunshine Elementary School",
    address: "456 School Avenue, Los Angeles, CA 90210",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@sunshineelem.edu",
    contactPhone: "(555) 987-6543",
  },

  serviceSummary: {
    tutor: "Michael Chen",
    subject: "Mathematics",
    gradeLevel: "5th Grade",
    servicePeriod: "March 1–31, 2024",
    hours: 40,
    rate: 45,
  },

  lineItems: [
    {
      description: "Mathematics Tutoring - Grade 5",
      qty: 40,
      rate: 45,
      tax: 144,
      subtotal: 1800,
    },
    {
      description: "Additional Materials & Resources",
      qty: 1,
      rate: 50,
      tax: 4,
      subtotal: 50,
    },
  ],

  priceSummary: {
    subtotal: 1850,
    tax: 148,
    discount: -50,
    total: 1948,
  },

  recentInvoices: [
    { id: "INV-2024-001", date: "Mar 15, 2024", amount: 1948 },
    { id: "INV-2024-002", date: "Feb 15, 2024", amount: 1750 },
    { id: "INV-2024-003", date: "Jan 15, 2024", amount: 2100 },
  ],

  paymentHistory: [
    { label: "Feb Payment", date: "Received Feb 28", amount: 1750 },
    { label: "Jan Payment", date: "Received Jan 30", amount: 2100 },
  ],

  outstanding: {
    amount: 1948,
    dueInDays: 31,
  },

  paymentInstructions: {
    bank: "First National Bank",
    account: "123-456-7890",
    routing: "987654321",
    terms: "Payment due within 30 days of invoice date",
    lateFee: "1.5% per month",
  },
};


  // Sidebar items
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <Icon icon="iconamoon:home-duotone" width={24} height={24} />,
    },
    {
      label: "Attendance",
      icon: <Icon icon="mingcute:calendar-2-line" width={24} height={24} />,
    },
    {
      label: "Tutor",
      icon: <Icon icon="fluent-emoji-high-contrast:teacher" width={24} height={24} />,
    },
    {
      label: "Examination",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "Invoice",
      icon: <Icon icon="streamline-ultimate:cash-payment-bills-bold" width={24} height={24} />,
    },
    {
      label: "Complain Box",
      icon: <Icon icon="streamline-freehand:customer-action-complaint" width={24} height={24} />,
    },
  ];

  // route map for sidebar labels -> paths
  const routeMap: Record<string, string> = {
    Dashboard: "/school_dashboard",
    Attendance: "/school_dashboard/attendance",
    Tutor: "/school_dashboard/tutor",
    Examination: "/school_dashboard/examination",
    Invoice: "/school_dashboard/invoice",
    "Complain Box": "/school_dashboard/complain_box",
  };
  // ------------------------------
// Logic (helpers)
// ------------------------------
function formatCurrency(value: number): React.ReactNode {
  return (
    <span className="flex items-center gap-1">
      <IconCurrencyRupeeNepalese size={16} />
      {value.toLocaleString()}
    </span>
  );
}



  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">

      {/* ========================================================= */}
      {/*                        ASIDE                              */}
      {/* ========================================================= */}
      {/* Sidebar - Desktop */}
           <aside className="hidden md:flex w-[220px] flex-col bg-[#3A7D7D] fixed top-0 left-0 h-screen p-4">
             <div className="text-2xl text-center font-bold mb-8 text-white">LOGO</div>
             <nav className="flex-1 space-y-4">
               {sidebarItems.map((item, index) => {
                 const routeMap: Record<string, string> = {
                   "Dashboard": "/school_dashboard",
                   "Attendance": "/school_dashboard/attendance",
                   "Tutor": "/school_dashboard/tutor",
                   "Examination": "/school_dashboard/examination",
                   "Invoice": "/school_dashboard/invoice",
                   "Complain Box": "/school_dashboard/complain_box",
                 };
                 return (
                   <Link
                     key={item.label}
                     to={routeMap[item.label] || "#"}
className={`w-full text-left flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200                                ${location.pathname === routeMap[item.label]
                         ? "bg-[#3A7D7D]/80 text-white border font-semibold shadow-[inset_0_0_2px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.3)] -translate-y-0.5"
                         : "bg-transparent text-white/90 hover:bg-white hover:text-[#3A7D7D] hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:font-medium"}`}
                   >
                     {item.icon}
                     {item.label}
                   </Link>
                 );
               })}
             </nav>
             <Link
               to="/"
               className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f3dada] text-[#dc2626]"
               onClick={() => {
                 localStorage.removeItem('authToken');
               }}
             >
               <Icon icon="ri:logout-circle-line" className="text-lg" />
               Log Out
             </Link>
           </aside>
     
           {/* Sidebar - Mobile */}
           {isMobileSidebarOpen && (
             <div 
               className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
               onClick={() => setIsMobileSidebarOpen(false)}
             ></div>
           )}

      {/* ========================================================= */}
      {/*                           NAVBAR                           */}
      {/* ========================================================= */}
      <div className="fixed top-0 left-60 right-0 bg-[#fdfbf0] z-10">
        <div className="flex justify-between items-center px-10 py-6">

          {/* Search */}
          <div className="relative w-[900px]">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-[#E8E6DA] rounded-full text-sm text-gray-600"
            />
            <Icon icon="mdi:magnify" className="absolute left-3 top-3 text-[#999999] text-lg" />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative">
              <Icon icon="ri:notification-3-fill" className="text-[#3A7D7D] text-3xl" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 bg-[#3A7D7D] px-2 py-1 rounded-3xl"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full bg-[#3A7D7D] flex items-center justify-center">
                  <Icon icon="ix:user-profile-filled" className="text-white w-9 h-9" />
                </div>
                <Icon icon="mdi:chevron-down" className="text-white text-lg w-6 h-6" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-1 z-20">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* ========================================================= */}
      {/*                           MAIN                             */}
      {/* ========================================================= */}
      <main className="pt-[120px] fixed top-0 left-60 px-10 pb-10 overflow-y-auto h-screen w-[calc(100%-240px)] bg-[#fdfbf0]">

      

    <div className="flex gap-6">
      {/* LEFT MAIN INVOICE PANEL */}
      <div className="w-[70%] bg-white border border-[#e8e4d8] rounded-2xl p-8 shadow-sm">

        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#3A7D7D]">{invoiceData.company.name}</h2>
            <p className="text-gray-600">{invoiceData.company.tagline}</p>
            <p className="text-sm text-gray-600 mt-3">{invoiceData.company.address}</p>
            <p className="text-sm text-gray-600">{invoiceData.company.city}</p>
            <p className="text-sm text-gray-600 mt-1">Phone: {invoiceData.company.phone}</p>
            <p className="text-sm text-gray-600">Email: {invoiceData.company.email}</p>
          </div>

          <div className="text-right">
            <h1 className="text-3xl text-black font-bold">INVOICE</h1>
            <p className="text-gray-700 mt-2">Invoice #: {invoiceData.invoice.number}</p>
            <p className="text-gray-700">Date: {invoiceData.invoice.date}</p>
            <p className="text-gray-700">Due Date: {invoiceData.invoice.dueDate}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="bg-[#fdfae8] p-4 rounded-xl mt-8">
          <h3 className="font-semibold text-gray-700 mb-2">Bill To:</h3>
          <p className="font-bold text-gray-800">{invoiceData.billTo.school}</p>
          <p className="text-gray-600">{invoiceData.billTo.address}</p>

          <div className="mt-3">
            <p className="text-gray-700"><span className="font-semibold">Contact:</span> {invoiceData.billTo.contactName}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {invoiceData.billTo.contactEmail}</p>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> {invoiceData.billTo.contactPhone}</p>
          </div>
        </div>

        {/* Service Summary */}
        <div className="bg-[#f8f8f8] p-4 rounded-xl mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Service Summary</h3>

          <div className="grid grid-cols-2 text-gray-700 text-sm">
            <div>
              <p><strong>Tutor:</strong> {invoiceData.serviceSummary.tutor}</p>
              <p><strong>Subject:</strong> {invoiceData.serviceSummary.subject}</p>
            </div>

            <div>
              <p><strong>Grade Level:</strong> {invoiceData.serviceSummary.gradeLevel}</p>
              <p className="flex items-center gap-1"><strong>Rate:</strong> <IconCurrencyRupeeNepalese size={16} /> {invoiceData.serviceSummary.rate}/hour</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mt-8 text-left">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="pb-2">Description</th>
              <th className="pb-2">Quantity</th>
              <th className="pb-2">Rate</th>
              <th className="pb-2">Tax</th>
              <th className="pb-2">Subtotal</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {invoiceData.lineItems.map((item, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-3">{item.description}</td>
                <td>{item.qty}</td>
                <td className="flex items-center gap-1"><IconCurrencyRupeeNepalese size={16} /> {item.rate.toLocaleString()}</td>
                <td className="flex items-center gap-1"><IconCurrencyRupeeNepalese size={16} /> {item.tax.toLocaleString()}</td>
                <td>{formatCurrency(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Price Summary */}
        <div className="mt-6 text-right text-gray-700 space-y-1">
          <p>Subtotal: {formatCurrency(invoiceData.priceSummary.subtotal)}</p>
          <p>Tax: {formatCurrency(invoiceData.priceSummary.tax)}</p>
          <p className="text-green-600">Discount: {formatCurrency(invoiceData.priceSummary.discount)}</p>
          <p className="text-xl font-bold">Total: {formatCurrency(invoiceData.priceSummary.total)}</p>
        </div>

        {/* Payment Status */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-gray-700 font-semibold">Payment Status:</span>
          <span className="bg-yellow-200 px-3 py-1 rounded-full text-yellow-800 text-sm font-medium">Pending</span>
        </div>

        {/* Payment Instructions */}
        <div className="bg-[#f3f7ff] p-4 rounded-xl mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Payment Instructions</h3>

          <p className="text-gray-700"><strong>Bank Transfer</strong></p>
          <p className="text-sm">Bank: {invoiceData.paymentInstructions.bank}</p>
          <p className="text-sm">Account: {invoiceData.paymentInstructions.account}</p>
          <p className="text-sm">Routing: {invoiceData.paymentInstructions.routing}</p>

          <p className="text-gray-700 mt-3"><strong>Terms:</strong> {invoiceData.paymentInstructions.terms}</p>
          <p className="text-sm">Late Fee: {invoiceData.paymentInstructions.lateFee}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Download PDF</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">Print</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send Invoice</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Add Payment</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Edit</button>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[30%] space-y-6">

        {/* Recent invoices */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e4d8]">
          <h3 className="font-semibold text-gray-700 mb-3">Recent Invoices</h3>

          {invoiceData.recentInvoices.map((inv) => (
            <div key={inv.id} className="flex justify-between py-2 border-b last:border-none">
              <div>
                <p className="font-medium text-gray-800">{inv.id}</p>
                <p className="text-gray-600 text-sm">{inv.date}</p>
              </div>
              <p className="font-semibold text-green-700">{formatCurrency(inv.amount)}</p>
            </div>
          ))}
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e8e4d8]">
          <h3 className="font-semibold text-gray-700 mb-3">Payment History</h3>

          {invoiceData.paymentHistory.map((p, i) => (
            <div key={i} className="flex justify-between py-2 border-b last:border-none">
              <div>
                <p className="font-medium text-gray-800">{p.label}</p>
                <p className="text-gray-600 text-sm">{p.date}</p>
              </div>
              <p className="text-green-700 font-semibold">+{formatCurrency(p.amount)}</p>
            </div>
          ))}
        </div>

        {/* Outstanding */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4d8] text-center">
          <h3 className="font-semibold text-gray-700 mb-2">Outstanding Dues</h3>
          <p className="text-3xl font-bold text-yellow-600">{formatCurrency(invoiceData.outstanding.amount)}</p>
          <p className="text-gray-600 mt-2 text-sm">Current Outstanding</p>

          <div className="bg-yellow-100 p-2 rounded-lg mt-3 text-yellow-800 text-sm font-medium">
            Due in {invoiceData.outstanding.dueInDays} days
          </div>
        </div>
      </div>
    </div>
 


      </main>
    </div>
  );
}
