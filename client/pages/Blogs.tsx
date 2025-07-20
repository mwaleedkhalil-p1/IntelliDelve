import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Share2
} from "lucide-react";
import { SEO } from "../components/SEO";

const Blogs = () => {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }

    // Animate blog cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "What are Background Checks and Why are They Important?",
      excerpt: "Discover the comprehensive guide to background checks, their types, legal requirements, and why they're crucial for protecting your business and making informed hiring decisions.",
      content: "Background checks are systematic investigations into an individual's personal, professional, and criminal history. They serve as a critical tool for employers, landlords, and organizations to verify information and assess potential risks...",
      author: "IntelliDelve Team",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Background Screening",
      image: "/images/downloaded/unsplash-photo-1560472354-b33ff0c44a43.jpg",
      tags: ["Background Checks", "Employment Screening", "Risk Management", "Compliance"],
      views: "2.4k",
      featured: true
    },
    {
      id: 2,
      title: "Why Companies Lose Money When They Don't Conduct Background Checks",
      excerpt: "Learn about the hidden costs of negligent hiring, including legal liabilities, workplace incidents, and reputation damage that can cost companies millions.",
      content: "The cost of not conducting proper background checks can be devastating for businesses. From negligent hiring lawsuits to workplace violence, the financial and reputational risks are substantial...",
      author: "Sarah Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Risk Management",
      image: "/images/downloaded/unsplash-photo-1451187580459-43490279c0fa.jpg",
      tags: ["Cost Analysis", "Risk Management", "Legal Compliance", "Business Protection"],
      views: "1.8k",
      featured: true
    },
    {
      id: 3,
      title: "The Complete Guide to Pre-Employment Screening in 2024",
      excerpt: "Stay updated with the latest trends, technologies, and legal requirements in pre-employment screening. Essential reading for HR professionals and business owners.",
      content: "Pre-employment screening has evolved significantly with new technologies and changing regulations. This comprehensive guide covers everything you need to know about modern screening practices...",
      author: "Michael Chen",
      date: "2024-01-05",
      readTime: "12 min read",
      category: "Employment Screening",
      image: "/images/downloaded/unsplash-photo-1486406146926-c627a92ad1ab.jpg",
      tags: ["Pre-Employment", "HR Technology", "Screening Process", "2024 Trends"],
      views: "3.1k",
      featured: false
    }
  ];

  const categories = [
    "All Posts",
    "Background Screening",
    "Risk Management", 
    "Employment Screening",
    "Legal Compliance",
    "Technology"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Expert Insights on Background Screening | IntelliDelve Blog"
        description="Stay informed with the latest insights on background checks, employment screening, risk management, and compliance. Expert articles to help protect your business."
        keywords="background check blog, employment screening insights, risk management articles, compliance updates, hiring best practices"
        canonicalUrl="/blogs"
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-brand-navy dark:via-brand-navy/90 dark:to-purple-900/20 pt-20 pb-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `url('/images/downloaded/unsplash-photo-1497366216548-37526070297c.jpg')`,
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:bg-sky-300/10 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Expert Insights & Industry Knowledge
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              IntelliDelve
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:from-sky-300 dark:to-purple-400">
                Insights Blog
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Stay ahead with expert insights on background screening, risk management, 
              and compliance. Your trusted resource for making informed business decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Get Expert Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === "All Posts"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our most popular and insightful articles on background screening and risk management
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.filter(post => post.featured).map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-white">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{post.views}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blogs/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium transition-colors"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-primary dark:hover:text-sky-300 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive library of articles on background screening and business protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-sky-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blogs/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 font-medium transition-colors text-sm"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 dark:from-brand-navy dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Don't let hiring risks cost you money. Get expert background screening solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                Get Free Consultation
              </Link>
              <Link
                to="/what-we-offer"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
