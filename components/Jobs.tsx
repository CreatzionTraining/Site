"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, MapPin, Clock, Briefcase, ArrowRight, Filter, ChevronLeft, Upload, FileText } from "lucide-react";

// Job data type
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
}

function JobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "",
    yearOfGraduation: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    resume: null as File | null,
  });
  
  const jobDetailsRef = useRef<HTMLDivElement>(null);

  // Jobs data - defined early so it's accessible in useEffect
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Build scalable web applications using modern technologies and frameworks.",
      requirements: ["5+ years experience", "React, Node.js", "Cloud platforms"],
      responsibilities: [
        "Design and develop high-volume, low-latency applications for mission-critical systems",
        "Contribute in all phases of the product development life cycle",
        "Write well designed, testable, efficient code",
        "Ensure designs are in compliance with specifications",
        "Prepare and produce releases of software components"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of experience in full-stack development",
        "Strong proficiency in React.js and Node.js",
        "Experience with cloud platforms (AWS/Azure/GCP)",
        "Excellent problem-solving skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance",
        "Flexible work arrangements",
        "Learning and development budget",
        "Annual team retreats"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Hybrid - Chennai",
      type: "Full-time",
      experience: "3+ years",
      description: "Create beautiful and intuitive user experiences for our products.",
      requirements: ["3+ years experience", "Figma, Adobe XD", "Design systems"],
      responsibilities: [
        "Create user-centered designs by understanding business requirements",
        "Create user flows, wireframes, prototypes and mockups",
        "Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets",
        "Collaborate with developers to ensure designs are implemented correctly",
        "Conduct user research and evaluate user feedback"
      ],
      qualifications: [
        "Bachelor's degree in Design or related field",
        "3+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe XD, and other design tools",
        "Strong portfolio demonstrating design skills",
        "Understanding of design systems and component libraries"
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Work from home options",
        "Design tools and software licenses",
        "Conference attendance opportunities"
      ]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
      requirements: ["4+ years experience", "AWS/Azure", "Docker, Kubernetes"],
      responsibilities: [
        "Build and maintain CI/CD pipelines",
        "Manage cloud infrastructure and services",
        "Implement monitoring and logging solutions",
        "Automate deployment processes",
        "Ensure system security and compliance"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "4+ years of DevOps experience",
        "Strong knowledge of AWS or Azure",
        "Experience with Docker and Kubernetes",
        "Proficiency in scripting languages (Python, Bash)"
      ],
      benefits: [
        "Competitive compensation",
        "Health and wellness benefits",
        "Remote work flexibility",
        "Professional certifications support",
        "Latest tools and technologies"
      ]
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead product strategy and work with cross-functional teams.",
      requirements: ["5+ years experience", "Agile methodology", "Technical background"],
      responsibilities: [
        "Define product vision and strategy",
        "Gather and prioritize product requirements",
        "Work closely with engineering, design, and marketing teams",
        "Analyze market trends and competition",
        "Track and measure product success metrics"
      ],
      qualifications: [
        "Bachelor's degree in Business, Engineering, or related field",
        "5+ years of product management experience",
        "Strong understanding of Agile methodologies",
        "Technical background preferred",
        "Excellent communication and leadership skills"
      ],
      benefits: [
        "Competitive salary and bonuses",
        "Comprehensive health coverage",
        "Stock options",
        "Professional development opportunities",
        "Collaborative work environment"
      ]
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "Data",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Analyze complex data sets and build predictive models.",
      requirements: ["3+ years experience", "Python, R", "Machine Learning"],
      responsibilities: [
        "Develop and implement machine learning models",
        "Analyze large datasets to extract insights",
        "Create data visualizations and reports",
        "Collaborate with stakeholders to understand business needs",
        "Stay updated with latest ML/AI technologies"
      ],
      qualifications: [
        "Master's degree in Data Science, Statistics, or related field",
        "3+ years of experience in data science",
        "Proficiency in Python and R",
        "Strong knowledge of machine learning algorithms",
        "Experience with big data technologies"
      ],
      benefits: [
        "Competitive salary",
        "Health and dental insurance",
        "Remote work options",
        "Conference and training budget",
        "Cutting-edge tools and infrastructure"
      ]
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Hybrid - Mumbai",
      type: "Full-time",
      experience: "2+ years",
      description: "Drive marketing campaigns and brand awareness initiatives.",
      requirements: ["2+ years experience", "Digital marketing", "Content creation"],
      responsibilities: [
        "Plan and execute digital marketing campaigns",
        "Create engaging content for various channels",
        "Manage social media presence",
        "Analyze campaign performance and ROI",
        "Collaborate with design and sales teams"
      ],
      qualifications: [
        "Bachelor's degree in Marketing or related field",
        "2+ years of digital marketing experience",
        "Strong content creation skills",
        "Experience with marketing automation tools",
        "Excellent written and verbal communication"
      ],
      benefits: [
        "Competitive compensation",
        "Health benefits",
        "Flexible working hours",
        "Marketing tools and resources",
        "Career growth opportunities"
      ]
    },
    {
      id: 7,
      title: "Cloud Architect",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "7+ years",
      description: "Design and implement cloud-native solutions for enterprise clients.",
      requirements: ["7+ years experience", "AWS/Azure/GCP", "Architecture patterns"],
      responsibilities: [
        "Design scalable cloud architectures",
        "Lead cloud migration projects",
        "Establish cloud best practices and standards",
        "Mentor junior engineers",
        "Evaluate and recommend cloud technologies"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "7+ years of cloud architecture experience",
        "Deep expertise in AWS, Azure, or GCP",
        "Strong understanding of architecture patterns",
        "Cloud certifications preferred"
      ],
      benefits: [
        "Excellent compensation package",
        "Comprehensive benefits",
        "Remote work flexibility",
        "Certification reimbursement",
        "Leadership opportunities"
      ]
    },
    {
      id: 8,
      title: "Business Analyst",
      department: "Consulting",
      location: "Pune",
      type: "Full-time",
      experience: "3+ years",
      description: "Analyze business requirements and provide strategic recommendations.",
      requirements: ["3+ years experience", "SQL, Excel", "Business intelligence"],
      responsibilities: [
        "Gather and document business requirements",
        "Analyze business processes and identify improvements",
        "Create detailed reports and presentations",
        "Work with stakeholders across departments",
        "Support project implementation"
      ],
      qualifications: [
        "Bachelor's degree in Business, IT, or related field",
        "3+ years of business analysis experience",
        "Proficiency in SQL and Excel",
        "Experience with BI tools",
        "Strong analytical and problem-solving skills"
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Professional development",
        "Work-life balance",
        "Collaborative culture"
      ]
    }
  ];

  const departments = ["All", "Engineering", "Design", "Product", "Data", "Marketing", "Consulting"];
  const locations = ["All", "Remote", "Hybrid - Chennai", "Bangalore", "Hybrid - Mumbai", "Pune"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  // Check if user is logged in
  const isLoggedIn = status === "authenticated";

  // Handle return from login with jobId
  useEffect(() => {
    if (isLoggedIn && searchParams) {
      const jobId = searchParams.get('jobId');
      if (jobId) {
        // Find the job by ID
        const job = jobs.find(j => j.id === parseInt(jobId));
        if (job) {
          setSelectedJob(job);
          setShowApplicationForm(true);
          // Clean up URL
          window.history.replaceState({}, '', '/careers/jobs');
        }
      }
    }
  }, [isLoggedIn, searchParams]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(false);
    setTimeout(() => {
      jobDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleApplyNow = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page with return URL
      const currentPath = `/careers/jobs?jobId=${selectedJob?.id}`;
      router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    // If logged in, show application form
    setShowApplicationForm(true);
    setTimeout(() => {
      jobDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setShowApplicationForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      degree: "",
      yearOfGraduation: "",
      experience: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      resume: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
    handleBackToJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FB] to-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#0056b3] to-[#0077FF] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Open Positions
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              Find your next opportunity and join our team of innovators
            </p>
            <div className="text-lg opacity-80">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings OR Job Details - Conditional Rendering */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {!selectedJob ? (
            // Show Job Listings
            filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 119, 255, 0.2)" }}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer"
                    onClick={() => handleViewDetails(job)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#0056b3] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0">
                            <Briefcase className="text-white" size={28} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#0B1320] mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-gray-600">
                              <div className="flex items-center gap-2">
                                <Briefcase size={16} />
                                <span>{job.department}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{job.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-[#F7F9FB] text-[#0056b3] rounded-full text-sm font-medium"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(job);
                        }}
                        className="group bg-gradient-to-r from-[#0056b3] to-[#0077FF] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap self-start"
                      >
                        View Details
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            // Show Job Details or Application Form
            <div className="max-w-4xl mx-auto">
              {!showApplicationForm ? (
                // Job Details View
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={handleBackToJobs}
                    className="flex items-center gap-2 text-[#0056b3] hover:text-[#0077FF] font-semibold mb-8 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Back to All Jobs
                  </button>

                  {/* Job Header */}
                  <div className="mb-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0056b3] to-[#0077FF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-white" size={32} />
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold text-[#0B1320] mb-3">{selectedJob.title}</h2>
                        <div className="flex flex-wrap gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Briefcase size={16} />
                            <span>{selectedJob.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{selectedJob.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Details Content */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-[#0B1320] mb-4">Job Description</h3>
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0B1320] mb-4">Experience Required</h3>
                      <p className="text-gray-700 text-lg">{selectedJob.experience}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0B1320] mb-4">Key Responsibilities</h3>
                      <ul className="space-y-3">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                            <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0B1320] mb-4">Qualifications</h3>
                      <ul className="space-y-3">
                        {selectedJob.qualifications.map((qual, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                            <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2 flex-shrink-0" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0B1320] mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {selectedJob.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                            <div className="w-2 h-2 bg-[#0077FF] rounded-full mt-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleApplyNow}
                      className="w-full bg-gradient-to-r from-[#0056b3] to-[#0077FF] text-white px-8 py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                    >
                      Apply Now
                      <ArrowRight size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                // Application Form View
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="flex items-center gap-2 text-[#0056b3] hover:text-[#0077FF] font-semibold mb-8 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Back to Job Details
                  </button>

                  <h2 className="text-4xl font-bold text-[#0B1320] mb-8">Apply for {selectedJob.title}</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="+91 1234567890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Degree/Department <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="degree"
                          value={formData.degree}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="B.Tech in Computer Science"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Year of Graduation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="yearOfGraduation"
                          value={formData.yearOfGraduation}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="2020"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Total Years of Experience <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-7">5-7 years</option>
                          <option value="7+">7+ years</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current CTC (LPA) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="currentCTC"
                          value={formData.currentCTC}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="e.g., 12 LPA"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expected CTC (LPA) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expectedCTC"
                          value={formData.expectedCTC}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors"
                          placeholder="e.g., 15 LPA"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Notice Period <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0077FF] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                        >
                          <option value="">Select notice period</option>
                          <option value="Immediate">Immediate</option>
                          <option value="15 days">15 days</option>
                          <option value="30 days">30 days</option>
                          <option value="60 days">60 days</option>
                          <option value="90 days">90 days</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Resume <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="flex items-center justify-center gap-3 w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#0077FF] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          {formData.resume ? (
                            <>
                              <FileText className="text-[#0077FF]" size={24} />
                              <span className="text-gray-700 font-medium">{formData.resume.name}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="text-gray-400" size={24} />
                              <span className="text-gray-600">Click to upload resume (PDF, DOC, DOCX)</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-[#0056b3] to-[#0077FF] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Submit Application
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Back to Careers CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#F7F9FB] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1320]">
              Want to Learn More About Our Culture?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover what it's like to work at Creatzion
            </p>
            <Link href="/careers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0056b3] px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#0077FF]"
              >
                Explore Our Culture
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Wrapper component with Suspense boundary for useSearchParams
export default function Jobs() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0077FF] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
