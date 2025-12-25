import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router";

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-600 font-medium mb-2">Something went wrong</h2>
          <p className="text-red-500 text-sm">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

// Interfaces
interface OverviewStats {
  totalStudents: number;
  totalPartners: number;
  totalSchools: number;
  upcomingExams: number;
}

interface EnrollmentData {
  month: string;
  count: number;
}

interface DistributionData {
  label: string;
  value: number;
  color: string;
}

interface OngoingClass {
  schoolName: string;
  partnersName: string;
  chapters: string;
  schoolContact: string;
  partnersContact: string;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

interface SortConfig {
  key: keyof OngoingClass | null;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  searchTerm: string;
  field: keyof OngoingClass | 'all';
}

// Mock API functions with pagination, sorting, and filtering
const fetchOngoingClassesWithParams = async (
  page: number,
  itemsPerPage: number,
  sort: SortConfig,
  filter: FilterConfig
): Promise<{ classes: OngoingClass[]; total: number }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let data = [
    {
      schoolName: "Vidya Niketan",
      partnersName: "John Smith",
      chapters: "Robotics",
      schoolContact: "+977 9034567865",
      partnersContact: "+977 9034567865"
    },
    {
      schoolName: "Pragati",
      partnersName: "Sarah Johnson",
      chapters: "IoT",
      schoolContact: "+977 9034567866",
      partnersContact: "+977 9034567866"
    },
    {
      schoolName: "Kanchanjunga",
      partnersName: "Mike Wilson",
      chapters: "Robotics",
      schoolContact: "+977 9034567867",
      partnersContact: "+977 9034567867"
    },
    {
      schoolName: "Global Academy",
      partnersName: "Emma Davis",
      chapters: "AI",
      schoolContact: "+977 9034567868",
      partnersContact: "+977 9034567868"
    },
    {
      schoolName: "Modern School",
      partnersName: "Chris Brown",
      chapters: "Machine Learning",
      schoolContact: "+977 9034567869",
      partnersContact: "+977 9034567869"
    }
  ];

  // Apply filtering
  if (filter.searchTerm) {
    data = data.filter(item => {
      if (filter.field === 'all') {
        return Object.values(item).some(value => 
          value.toLowerCase().includes(filter.searchTerm.toLowerCase())
        );
      }
      return item[filter.field].toLowerCase().includes(filter.searchTerm.toLowerCase());
    });
  }

  // Apply sorting
  if (sort.key) {
    data.sort((a, b) => {
      const aValue = a[sort.key!];
      const bValue = b[sort.key!];
      return sort.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  // Apply pagination
  const start = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);

  return {
    classes: paginatedData,
    total: data.length
  };
};

// Mock API functions
const fetchOverviewStats = async (): Promise<OverviewStats> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalStudents: Math.floor(Math.random() * 1000),
    totalPartners: Math.floor(Math.random() * 100),
    totalSchools: Math.floor(Math.random() * 50),
    upcomingExams: Math.floor(Math.random() * 10)
  };
};

const fetchEnrollmentTrend = async (): Promise<EnrollmentData[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    count: 40 + Math.floor(Math.random() * 45) // Random number between 40-85
  }));
};

const fetchDistributionData = async (): Promise<DistributionData[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { label: 'Attendance', value: 30, color: '#2ecc40' },
    { label: 'Exams', value: 25, color: '#0074D9' },
    { label: 'Payments', value: 25, color: '#FFDC00' },
    { label: 'Complaints', value: 20, color: '#FF4136' }
  ];
};

const fetchOngoingClasses = async (): Promise<OngoingClass[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      schoolName: "Vidya Niketan",
      partnersName: "John Smith",
      chapters: "Robotics",
      schoolContact: "+977 9034567865",
      partnersContact: "+977 9034567865"
    },
    {
      schoolName: "Pragati",
      partnersName: "Sarah Johnson",
      chapters: "IoT",
      schoolContact: "+977 9034567866",
      partnersContact: "+977 9034567866"
    },
    {
      schoolName: "Kanchanjunga",
      partnersName: "Mike Wilson",
      chapters: "Robotics",
      schoolContact: "+977 9034567867",
      partnersContact: "+977 9034567867"
    }
  ];
};

const sidebarItems = [
  { label: "Dashboard", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
  ), active: true },
  { label: "Tutor", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
  ) },
  { label: "School", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10l9-6 9 6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/><path d="M9 22V12h6v10"/></svg>
  ) },
  { label: "Examination", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
  ) },
  { label: "Attendance", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
  ) },
  { label: "Activities", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  ) },
  { label: "Teacher KYC", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/><path d="M12 11v4"/></svg>
  ) },
  { label: "Salary + Commission Partner", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
  ) },
  { label: "Components Delivery", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
  ) },
  { label: "Complain Box", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
  ) },
  { label: "Teaching Learning Material", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
  ) },
  { label: "Progress Tracking", icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ) },
];

export default function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [distributionData, setDistributionData] = useState<DistributionData[]>([]);
  const [ongoingClasses, setOngoingClasses] = useState<OngoingClass[]>([]);
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc'
  });

  // Filter state
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    searchTerm: '',
    field: 'all'
  });

  // Refresh timestamp
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Function to refresh data
  const refreshData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [stats, enrollment, distribution, classesData] = await Promise.all([
        fetchOverviewStats(),
        fetchEnrollmentTrend(),
        fetchDistributionData(),
        fetchOngoingClassesWithParams(
          pagination.currentPage,
          pagination.itemsPerPage,
          sortConfig,
          filterConfig
        )
      ]);

      setOverviewStats(stats);
      setEnrollmentData(enrollment);
      setDistributionData(distribution);
      setOngoingClasses(classesData.classes);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(classesData.total / prev.itemsPerPage)
      }));
      setLastRefresh(new Date());
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [pagination.currentPage, pagination.itemsPerPage, sortConfig, filterConfig]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [pagination.currentPage, pagination.itemsPerPage, sortConfig, filterConfig]);

  return (
    <div className="flex min-h-screen bg-[#fdfbf0]">
      {/* Sidebar */}
      <aside className="w-[220px] flex flex-col bg-[#3A7D7D] min-h-screen p-4">
        <div className="text-2xl font-bold mb-8 text-white">LOGO</div>
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-[#3A7D7D] font-medium shadow-lg transform -translate-y-0.5 transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Dashboard
          </div>
          {sidebarItems.slice(1).map((item) => {
            const routeMap: Record<string, string> = {
              "Tutor": "/admin_dashboard/tutor",
              "School": "/admin_dashboard/school",
              "Examination": "/admin_dashboard/examination",
              "Attendance": "/admin_dashboard/attendance",
              "Activities": "/admin_dashboard/activities",
              "Teacher KYC": "/admin_dashboard/teacher_kyc",
              "Salary + Commission Partner": "/admin_dashboard/salary_commission",
              "Components Delivery": "/admin_dashboard/components_delivery",
              "Complain Box": "/admin_dashboard/complain_box",
              "Teaching Learning Material": "/admin_dashboard/teaching_learning",
              "Progress Tracking": "/admin_dashboard/progress_tracking",
            };
            return (
              <Link
                key={item.label}
                to={routeMap[item.label] || "#"}
                className="flex items-center gap-2 px-3 py-2 text-white/90 rounded-lg transition-all duration-200
                           hover:bg-white hover:text-[#3A7D7D] hover:shadow-lg hover:-translate-y-0.5 hover:font-medium"
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link 
          to="/"
          className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f3dada] text-[#dc2626]"
          onClick={() => {
            // Add any additional logout logic here (e.g., clearing tokens)
            localStorage.removeItem('authToken');
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Log Out
        </Link>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative w-[480px] mx-auto">
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-[#3A7D7D] text-gray-700"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-[#3A7D7D] text-white px-4 py-2 rounded-lg font-medium">
              Create +
            </button>
            <div className="relative">
              <button
                className="flex items-center space-x-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-[#3A7D7D] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <Link
                    to="/"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add any additional logout logic here (e.g., clearing tokens)
                      localStorage.removeItem('authToken');
                    }}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Overview Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-black">Overview</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-[10px] border border-gray-300 shadow-[0_0_4px_rgba(0,0,0,0.2)] p-4">
              <div className="text-[13px] text-[#000000] font-bold text-center mb-3">Total Students</div>
              <div className="relative flex justify-center items-center">
                <div className="text-[40px] font-bold leading-none text-black">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    overviewStats?.totalStudents || 0
                  )}
                </div>
                <div className="text-[#3A7D7D] absolute right-2 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[10px] border border-gray-300 shadow-[0_0_4px_rgba(0,0,0,0.2)] p-4">
              <div className="text-[13px] text-[#000000] font-bold text-center mb-3">Total Partners</div>
              <div className="relative flex justify-center items-center">
                <div className="text-[40px] font-bold leading-none text-black">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    overviewStats?.totalPartners || 0
                  )}
                </div>
                <div className="text-[#3A7D7D] absolute right-2 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[10px] border border-gray-300 shadow-[0_0_4px_rgba(0,0,0,0.2)] p-4">
              <div className="text-[13px] text-[#000000] font-bold text-center mb-3">Total Schools</div>
              <div className="relative flex justify-center items-center">
                <div className="text-[40px] font-bold leading-none text-black">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    overviewStats?.totalSchools || 0
                  )}
                </div>
                <div className="text-[#FFD700] absolute right-2 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 10l9-6 9 6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[10px] border border-gray-300 shadow-[0_0_4px_rgba(0,0,0,0.2)] p-4">
              <div className="text-[13px] text-[#000000] font-bold text-center mb-3">Upcoming Exam</div>
              <div className="relative flex justify-center items-center">
                <div className="text-[40px] font-bold leading-none text-black">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    overviewStats?.upcomingExams || 0
                  )}
                </div>
                <div className="text-[#3A7D7D] absolute right-2 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4"/>
                    <path d="M8 2v4"/>
                    <path d="M3 10h18"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Student Enrollment Trend</h3>
                <p className="text-sm text-gray-500 mt-1">Performance overview Jan–Jul 2025</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3A7D7D]"></div>
                  <span className="text-sm text-gray-600">Current Year</span>
                </div>
                <div className="px-3 py-1 bg-[#3A7D7D]/10 text-[#3A7D7D] rounded-full text-sm font-medium">
                  +12.4% vs Last Year
                </div>
              </div>
            </div>

            {/* Enhanced Line Chart */}
            <div className="h-[300px] relative bg-gradient-to-b from-white to-[#fafafa] rounded-lg p-6">
              <div className="absolute inset-6">
                <svg width="100%" height="100%" viewBox="0 0 320 200" className="overflow-visible">
                  {/* Enhanced Grid with Gradient */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3A7D7D" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3A7D7D" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines with Enhanced Styling */}
                  {[40, 45, 50, 55, 60, 65, 70, 75, 80, 85].reverse().map((value, i) => (
                    <g key={i} className="transition-opacity duration-300">
                      <line
                        x1="0"
                        y1={i * 20}
                        x2="320"
                        y2={i * 20}
                        stroke="url(#gridGradient)"
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />
                      <text
                        x="-8"
                        y={i * 20}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="end"
                        alignmentBaseline="middle"
                      >
                        {value}
                      </text>
                    </g>
                  ))}
                  
                  {!isLoading && enrollmentData.length > 0 && (
                    <>
                      {/* Data Line with area fill */}
                      <path
                        d={`M${enrollmentData.map((d, i) => `${(i * 320) / (enrollmentData.length - 1)},${200 - (d.count * 2)}`).join(' L')}`}
                        fill="none"
                        stroke="#3A7D7D"
                        strokeWidth="2"
                      />
                      <path
                        d={`M${enrollmentData.map((d, i) => `${(i * 320) / (enrollmentData.length - 1)},${200 - (d.count * 2)}`).join(' L')} V200 H0 Z`}
                        fill="#3A7D7D"
                        fillOpacity="0.1"
                      />
                      
                      {/* Data Points */}
                      {enrollmentData.map((d, i) => (
                        <circle
                          key={i}
                          cx={(i * 320) / (enrollmentData.length - 1)}
                          cy={200 - (d.count * 2)}
                          r="4"
                          fill="#3A7D7D"
                        />
                      ))}
                      
                      {/* X-Axis Labels */}
                      {enrollmentData.map((d, i) => (
                        <text
                          key={i}
                          x={(i * 320) / (enrollmentData.length - 1)}
                          y="180"
                          fontSize="10"
                          fill="#6b7280"
                        >
                          {d.month}
                        </text>
                      ))}
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Distribution Overview</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Total Activities</span>
                <span className="px-3 py-1 bg-[#3A7D7D]/10 text-[#3A7D7D] rounded-full text-sm font-medium">2,458</span>
              </div>
            </div>
            <div className="h-72 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main SVG container with enhanced effects */}
                <div className="relative">
                  <svg width="240" height="240" viewBox="0 0 60 60" className="transform transition-transform duration-500 hover:scale-105">
                    {/* Subtle background pattern */}
                    <defs>
                      <pattern id="gridPattern" width="2" height="2" patternUnits="userSpaceOnUse">
                        <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#f1f5f9" strokeWidth="0.2"/>
                      </pattern>
                      {/* Enhanced gradients with multiple color stops */}
                      <linearGradient id="gradientAttendance" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#22c55e', stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradientExams" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradientPayments" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="gradientComplaints" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#f87171', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                      </linearGradient>
                      {/* Radial gradient for depth */}
                      <radialGradient id="shadowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.05 }} />
                      </radialGradient>
                    </defs>

                    {/* Background elements */}
                    <circle r="30" cx="30" cy="30" fill="url(#gridPattern)"/>
                    <circle r="29" cx="30" cy="30" fill="white" className="filter drop-shadow-md"/>
                    
                    {/* Pie segments with enhanced hover effects */}
                    <g transform="rotate(-90 30 30)" className="transform transition-transform duration-700">
                      <path d="M30 30 L30 1 A29 29 0 0 1 56.1 16.9 Z" 
                        fill="url(#gradientAttendance)" 
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        filter="url(#shadowGradient)"/>
                      <path d="M30 30 L56.1 16.9 A29 29 0 0 1 50.1 50.1 Z" 
                        fill="url(#gradientExams)" 
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        filter="url(#shadowGradient)"/>
                      <path d="M30 30 L50.1 50.1 A29 29 0 0 1 9.9 50.1 Z" 
                        fill="url(#gradientPayments)" 
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        filter="url(#shadowGradient)"/>
                      <path d="M30 30 L9.9 50.1 A29 29 0 0 1 30 1 Z" 
                        fill="url(#gradientComplaints)" 
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        filter="url(#shadowGradient)"/>
                    </g>

                    {/* Center circle with shadow */}
                    <circle r="15" cx="30" cy="30" fill="white" className="filter drop-shadow-lg"/>
                    <text x="30" y="30" textAnchor="middle" dominantBaseline="middle" 
                          className="text-[4px] font-semibold fill-gray-600">OVERVIEW</text>
                  </svg>
                </div>
              </div>

              {/* Enhanced Legend with tooltips and interaction */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="grid grid-cols-2 gap-6 px-8">
                  {[
                    { label: 'Attendance', percent: 35, color: 'from-[#4ade80] to-[#16a34a]' },
                    { label: 'Exams', percent: 25, color: 'from-[#60a5fa] to-[#2563eb]' },
                    { label: 'Payments', percent: 20, color: 'from-[#fbbf24] to-[#d97706]' },
                    { label: 'Complaints', percent: 20, color: 'from-[#f87171] to-[#dc2626]' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-gray-50">
                      <div className="relative">
                        <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color} shadow-sm 
                                     group-hover:scale-110 group-hover:shadow-md transition-all duration-300 block`}></span>
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white shadow-sm opacity-0 
                                     group-hover:opacity-100 transition-all duration-300"></span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                          <span className="text-sm text-gray-500 group-hover:text-[#3A7D7D]">{item.percent}%</span>
                        </div>
                        <div className="mt-1 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${item.color} transform origin-left scale-x-0 
                                      group-hover:scale-x-100 transition-transform duration-500`}
                               style={{ width: `${item.percent}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#F9F7ED] rounded-xl p-6 border border-gray-200">
          <ErrorBoundary>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Today Ongoing Classes</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <select
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                    value={filterConfig.field}
                    onChange={(e) => setFilterConfig(prev => ({
                      ...prev,
                      field: e.target.value as keyof OngoingClass | 'all'
                    }))}
                  >
                    <option value="all">All Fields</option>
                    <option value="schoolName">School Name</option>
                    <option value="partnersName">Partner Name</option>
                    <option value="chapters">Chapters</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1"
                    value={filterConfig.searchTerm}
                    onChange={(e) => setFilterConfig(prev => ({
                      ...prev,
                      searchTerm: e.target.value
                    }))}
                  />
                </div>
                <button
                  onClick={refreshData}
                  className="flex items-center gap-2 text-[#3A7D7D] hover:text-[#2A6D6D]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm">
                    {lastRefresh ? `Last updated ${new Date(lastRefresh).toLocaleTimeString()}` : 'Refresh'}
                  </span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['School Name', 'Partners Name', 'Chapters', 'School Contact', 'Partners Contact'].map((header, index) => {
                      const key = [
                        'schoolName',
                        'partnersName',
                        'chapters',
                        'schoolContact',
                        'partnersContact'
                      ][index] as keyof OngoingClass;
                      
                      return (
                        <th
                          key={header}
                          className="py-4 px-6 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-[#3A7D7D]"
                          onClick={() => setSortConfig({
                            key,
                            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                          })}
                        >
                          <div className="flex items-center gap-1">
                            {header}
                            {sortConfig.key === key && (
                              <svg className={`w-4 h-4 transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}>
                                <path d="M7 10l5-5 5 5z" fill="currentColor" />
                              </svg>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-6">
                        <LoadingSkeleton />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-6 text-center text-red-500">
                        Error loading data: {error.message}
                      </td>
                    </tr>
                  ) : ongoingClasses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                        No ongoing classes found
                        {filterConfig.searchTerm && ' matching your search criteria'}
                      </td>
                    </tr>
                  ) : (
                    ongoingClasses.map((classItem, index) => (
                      <tr key={index} className="hover:bg-white/50">
                        <td className="py-4 px-6 text-sm text-gray-700">{classItem.schoolName}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{classItem.partnersName}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{classItem.chapters}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{classItem.schoolContact}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{classItem.partnersContact}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {!isLoading && ongoingClasses.length > 0 && (
                  <tfoot>
                    <tr>
                      <td colSpan={5} className="py-4 px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-700">
                            Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                            {Math.min(pagination.currentPage * pagination.itemsPerPage, ongoingClasses.length)} of{' '}
                            {ongoingClasses.length} entries
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-3 py-1 rounded border border-green-200 text-green-600
                                       transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5
                                       hover:bg-white hover:border-green-300
                                       disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:translate-y-0"
                              disabled={pagination.currentPage === 1}
                              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                            >
                              Previous
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                              <button
                                key={page}
                                className={`w-8 h-8 rounded transition-all duration-200 shadow-sm ${
                                  page === pagination.currentPage
                                    ? 'bg-green-600 text-white shadow-md -translate-y-0.5 hover:bg-green-700'
                                    : 'border border-green-200 text-green-600 hover:bg-white hover:border-green-300 hover:shadow-md hover:-translate-y-0.5'
                                }`}
                                onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              className="px-3 py-1 rounded border border-green-200 text-green-600
                                       transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5
                                       hover:bg-white hover:border-green-300
                                       disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:translate-y-0"
                              disabled={pagination.currentPage === pagination.totalPages}
                              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}