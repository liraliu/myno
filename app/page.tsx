"use client";

import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { motion } from "framer-motion";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <AuthForm />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen  overflow-hidden w-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-visible">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-turquoise-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-turquoise-600/10 rounded-full blur-3xl"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-turquoise-400/5 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-8 py-6"
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold text-white"
          >
            <span className="bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">
              Myno
            </span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAuth(true)}
            className="text-gray-300 hover:text-turquoise-400 transition-colors duration-300 font-medium"
          >
            Get Started
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                Grow Your Startup.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative inline-block"
              >
                <div className="relative space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative group"
                  >
                    <span className="text-6xl md:text-7xl font-black tracking-tight transition duration-500 hover:scale-[1.05] cursor-pointer">
                      <span className="bg-gradient-to-r from-white via-turquoise-200 to-white bg-clip-text text-transparent">
                        10x Your Users
                      </span>
                    </span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="absolute -inset-4 bg-gradient-to-r from-turquoise-500/5 to-turquoise-400/5 blur-xl rounded-2xl -z-10 transition-all duration-500 group-hover:from-turquoise-500/20 group-hover:to-turquoise-400/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative group"
                  >
                    <span className="text-6xl md:text-7xl font-black tracking-tight transition-transform duration-500 group-hover:scale-[1.05] cursor-pointer">
                      <span className="bg-gradient-to-r from-white via-turquoise-200 to-white bg-clip-text text-transparent">
                        10x Your Revenue
                      </span>
                    </span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute -inset-4 bg-gradient-to-r from-turquoise-500/5 to-turquoise-400/5 blur-xl rounded-2xl -z-10 group-hover:from-turquoise-500/20 group-hover:to-turquoise-400/20 transition-all duration-500"
                    />
                  </motion.div>
                </div>
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Organic marketing. Powered by AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuth(true)}
              className="group relative bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black text-2xl font-bold py-6 px-16 rounded-2xl hover:from-turquoise-400 hover:to-turquoise-500 transform transition-all duration-500 shadow-2xl"
            >
              <span className="relative z-10">Let's Talk</span>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-turquoise-400 to-turquoise-500 rounded-2xl blur-sm"
              />
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-32 mb-16 px-4"
          >
            <motion.div
              variants={itemVariants}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 hover:bg-gray-800/90 transition-all duration-500 transform hover:scale-[1.02] border border-gray-700/50 hover:border-turquoise-500/30"
            >
              <div className="h-full flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-turquoise-500/10 flex items-center justify-center mb-6 group-hover:bg-turquoise-500/20 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-turquoise-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-turquoise-400 transition-colors duration-300">
                  Smart Targeting
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                  AI-powered community discovery to find your perfect audience
                  on Reddit and Discord. Our advanced algorithms analyze
                  engagement patterns to identify the most promising communities
                  for your startup.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 hover:bg-gray-800/90 transition-all duration-500 transform hover:scale-[1.02] border border-gray-700/50 hover:border-turquoise-500/30"
            >
              <div className="h-full flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-turquoise-500/10 flex items-center justify-center mb-6 group-hover:bg-turquoise-500/20 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-turquoise-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-turquoise-400 transition-colors duration-300">
                  Viral Content
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                  Generate engaging post drafts that resonate with your audience
                  and drive growth. Our AI analyzes successful content patterns
                  to help you create posts that are more likely to go viral.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 hover:bg-gray-800/90 transition-all duration-500 transform hover:scale-[1.02] border border-gray-700/50 hover:border-turquoise-500/30"
            >
              <div className="h-full flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-turquoise-500/10 flex items-center justify-center mb-6 group-hover:bg-turquoise-500/20 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 text-turquoise-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-turquoise-400 transition-colors duration-300">
                  Auto-Posting
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                  Schedule and automate your posts across multiple platforms
                  (coming soon). Save time and maintain consistent engagement
                  with our intelligent posting system.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 px-8 pt-8 pb-12 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                Ready to Scale?
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative inline-block"
              >
                <span className="bg-gradient-to-r from-turquoise-400 via-turquoise-500 to-turquoise-600 bg-clip-text text-transparent">
                  Let's Build Something Amazing.
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute -inset-1 bg-gradient-to-r from-turquoise-400/20 to-turquoise-600/20 blur-lg"
                />
              </motion.span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuth(true)}
              className="group relative bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black text-2xl font-bold py-6 px-16 rounded-2xl hover:from-turquoise-400 hover:to-turquoise-500 transform transition-all duration-500 shadow-2xl"
            >
              <span className="relative z-10">Schedule a Call</span>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-turquoise-400 to-turquoise-500 rounded-2xl blur-sm"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="relative z-10 px-8 py-12 text-center"
      >
        <p className="text-gray-500 text-lg">
          © {new Date().getFullYear()} Myno. Built for ambitious startups.
        </p>
      </motion.footer>
    </div>
  );
}
