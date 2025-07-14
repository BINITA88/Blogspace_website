// import React from "react";
// import { Button } from "../ui/button";
// import { BookOpenText, MessageCircle, Bell } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
//       <div className="max-w-7xl mx-auto text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BlogSpace</h1>
//         <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
//           A blog website that functions like a social media platform — like, comment, and chat in real time. Customize your profile, bookmark content, send friend requests, receive notifications, and enjoy a realistic reading experience through our virtual book-style interface.
//         </p>
//         <Button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 text-lg">
//           Get Started
//         </Button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 mt-16">
//         <div className="bg-white p-6 rounded-2xl shadow">
//           <MessageCircle className="h-10 w-10 text-red-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Real-Time Interaction</h3>
//           <p>Chat live, like, and comment on blog posts instantly — just like your favorite social platform.</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <Bell className="h-10 w-10 text-red-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Notifications & Requests</h3>
//           <p>Send/receive friend requests and get notified about new interactions and messages.</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow">
//           <BookOpenText className="h-10 w-10 text-red-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Book-Like Blog View</h3>
//           <p>Read blogs in a beautifully designed book interface, featuring author info, date, and more.</p>
//         </div>
//       </div>

//       <div className="mt-20 text-center">
//         <p className="text-md text-gray-500">Ready to dive in?</p>
//         <Button className="mt-4 bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-900">
//           Explore Blogs
//         </Button>
//       </div>
//     </div>
//   );
// }

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
} from 'lucide-react';

const BlogPlatformLanding = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

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
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Immersive Reading Experience",
      description:
        "Experience content in our unique book-like interface with page-turning animations and realistic layouts that make reading a joy.",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalized Profiles",
      description:
        "Create your digital identity with customizable profiles, activity tracking, and content recommendations tailored just for you.",
      color: "from-cyan-600 to-teal-700",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Social Interactions",
      description:
        "Like, comment, and share your favorite posts. Build communities around your interests and discover new perspectives daily.",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: <Bookmark className="w-8 h-8" />,
      title: "Smart Collections",
      description:
        "Save and organize your favorite content with intelligent bookmarking that learns from your reading patterns and preferences.",
      color: "from-teal-600 to-cyan-700",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Activity Insights",
      description:
        "Track your reading progress, engagement metrics, and discover fascinating insights about your content consumption habits.",
      color: "from-cyan-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100">
      {/* Status Notification */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showNotification
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>

    

    

  {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
              Powerful Features for Modern Readers
            </h2>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto">
              Everything you need to create, share, and discover amazing content
              in one beautifully designed platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-teal-100"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>

                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-teal-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-teal-700 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPlatformLanding;
