import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, Tag, Search } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { isDarkTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Decentralized Travel Insurance",
      excerpt: "How blockchain technology is revolutionizing the travel insurance industry with instant payouts and transparent policies.",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Understanding Parametric Insurance",
      excerpt: "Learn how parametric insurance works and why it's perfect for travel-related risks like flight delays and cancellations.",
      author: "Michael Chen",
      date: "2024-03-10",
      readTime: "7 min read",
      category: "education",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Top 5 Travel Destinations for 2024",
      excerpt: "Discover the most exciting travel destinations for this year and how to stay protected during your adventures.",
      author: "Emma Rodriguez",
      date: "2024-03-05",
      readTime: "4 min read",
      category: "travel",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "How Smart Contracts Automate Insurance Claims",
      excerpt: "A deep dive into the technology that powers instant claim processing without human intervention.",
      author: "David Kim",
      date: "2024-02-28",
      readTime: "6 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1620676044949-5c5542b4b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Benefits of Crypto Payments for Global Travelers",
      excerpt: "Why cryptocurrency and stablecoins are becoming the preferred payment method for international travel protection.",
      author: "Lisa Wang",
      date: "2024-02-20",
      readTime: "5 min read",
      category: "finance",
      image: "https://images.unsplash.com/photo-1620476214170-1d6800d1c9e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Case Study: How We Processed 10,000 Claims in 60 Seconds",
      excerpt: "A detailed look at our platform's performance during the recent winter storm travel disruptions.",
      author: "Robert Smith",
      date: "2024-02-15",
      readTime: "8 min read",
      category: "case-study",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "technology", name: "Technology" },
    { id: "travel", name: "Travel" },
    { id: "finance", name: "Finance" },
    { id: "education", name: "Education" },
    { id: "case-study", name: "Case Studies" }
  ];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`pt-32 pb-20 px-6 min-h-screen ${isDarkTheme
      ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
      : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            InsureX Blog
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Insights, updates, and stories about the future of travel insurance and blockchain technology
          </p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-12"
        >
          <div className={`rounded-2xl p-6 mb-8 ${isDarkTheme
            ? 'bg-[#172e60]/60 border-blue-900/60'
            : 'bg-white/70 border-blue-200/50'} border backdrop-blur-sm`}>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-2xl">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    isDarkTheme 
                      ? 'bg-[#172e60]/40 border-blue-800/60 text-white placeholder-blue-300' 
                      : 'bg-white border-blue-200 text-slate-800 placeholder-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? isDarkTheme
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : isDarkTheme
                        ? 'bg-[#172e60]/40 text-blue-300 hover:bg-[#172e60]/80'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map(post => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`rounded-2xl overflow-hidden border backdrop-blur-sm transition-all duration-300 group ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60 hover:border-blue-400/60'
                  : 'bg-white/70 border-blue-200/50 hover:border-blue-400/50'
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    isDarkTheme 
                      ? 'bg-blue-700/40 text-blue-300' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
                
                <h2 className={`text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>
                  {post.title}
                </h2>
                
                <p className={`mb-4 line-clamp-3 ${
                  isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                }`}>
                  {post.excerpt}
                </p>
                
                <div className={`flex items-center justify-between text-sm mb-4 ${
                  isDarkTheme ? 'text-blue-300' : 'text-blue-500'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <button className={`flex items-center gap-2 font-medium group-hover:gap-3 transition-all ${
                  isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        {filteredPosts.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mt-12"
          >
            <button className={`px-8 py-3 rounded-xl font-medium transition-all ${
              isDarkTheme
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              Load More Articles
            </button>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className={`mt-20 rounded-2xl p-8 text-center ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
            Stay Updated with InsureX
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-100' : 'text-blue-100'}`}>
            Subscribe to our newsletter for the latest updates, product releases, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;