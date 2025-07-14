import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Users,
  BookOpen,
  Sparkles,
  TrendingUp,
  Bell,
  Settings,
  ArrowRight,
  Play,
  Star,
  Eye,
  Clock,
  ChevronDown,
} from 'lucide-react';

const BlogPlatformLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-Time Conversations",
      description:
        "Connect instantly with writers and readers through our integrated chat system. Share thoughts, discuss ideas, and build meaningful connections.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Immersive Reading Experience",
      description:
        "Experience content in our unique book-like interface with page-turning animations and realistic layouts that make reading a joy.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized Profiles",
      description:
        "Create your digital identity with customizable profiles, activity tracking, and content recommendations tailored just for you.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Social Interactions",
      description:
        "Like, comment, and share your favorite posts. Build communities around your interests and discover new perspectives daily.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Bookmark className="w-8 h-8" />,
      title: "Smart Collections",
      description:
        "Save and organize your favorite content with intelligent bookmarking that learns from your reading patterns and preferences.",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Activity Insights",
      description:
        "Track your reading progress, engagement metrics, and discover fascinating insights about your content consumption habits.",
      color: "from-teal-500 to-green-600",
    },
  ];

  const designPrinciples = [
    {
      title: "Always Stay Informed",
      description:
        "Clear status indicators and real-time updates keep you informed about everything happening on the platform.",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: "Familiar & Intuitive",
      description:
        "Our book-like interface uses familiar metaphors that make navigation feel natural and effortless.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: "Full Control",
      description:
        "Easily undo actions, navigate freely, and have complete control over your reading and social experience.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Consistent Experience",
      description:
        "Enjoy uniform design patterns and interactions across all features for a seamless user journey.",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "Error Prevention",
      description:
        "Smart validation and intuitive design patterns help prevent mistakes before they happen.",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      title: "Visual Recognition",
      description:
        "Clear visual cues and contextual information help you navigate without memorizing complex commands.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Flexible & Efficient",
      description:
        "Keyboard shortcuts and customizable interfaces cater to both new and experienced users.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Clean & Focused",
      description:
        "Minimalist design that prioritizes content and removes distractions for optimal reading.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: "Quick Recovery",
      description:
        "Clear error messages with actionable solutions help you understand and fix issues instantly.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: "Help When Needed",
      description:
        "Contextual help and comprehensive guides are always available exactly when you need them.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
  ];

  const mockPosts = [
    {
      author: "Sarah Chen",
      title: "The Future of Digital Storytelling",
      excerpt:
        "How interactive narratives are reshaping the way we consume and create content in the digital age...",
      time: "2 hours ago",
      likes: 47,
      comments: 12,
      bookmarks: 8,
      avatar: "from-pink-500 to-purple-600",
    },
    {
      author: "Marcus Rodriguez",
      title: "Building Communities Through Words",
      excerpt:
        "The power of authentic storytelling in creating meaningful connections across diverse audiences...",
      time: "5 hours ago",
      likes: 23,
      comments: 7,
      bookmarks: 15,
      avatar: "from-blue-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Status Notification */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showNotification
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>

   

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-pink-200 to-indigo-200 rounded-full opacity-60 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Where Stories
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Come Alive
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience blogging like never before with our interactive,
              book-like interface. Connect, share, and discover amazing content
              in a beautifully designed social reading environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Start Reading</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">10K+ Active Readers</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">50K+ Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span className="font-medium">1M+ Interactions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Readers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, share, and discover amazing content
              in one beautifully designed platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>

                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Designed for Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every interaction is thoughtfully crafted to provide an intuitive,
              enjoyable, and efficient experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {designPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {principle.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See It in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of social blogging with our interactive
              platform
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded-md px-4 py-1 text-sm text-gray-500 mx-4">
                  booklike.com/discover
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {mockPosts.map((post, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${post.avatar}`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {post.author}
                        </h3>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <h4 className="font-bold text-xl text-indigo-600 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <div className="flex items-center space-x-6 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bookmark className="w-4 h-4" />
                        <span>{post.bookmarks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default BlogPlatformLanding;
