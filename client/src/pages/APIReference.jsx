// src/components/APIReference.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Zap, BookOpen, Copy, Check, Terminal, GitBranch } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const APIReference = () => {
  const { isDarkTheme } = useTheme();
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  const copyToClipboard = (text, endpoint) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/quote",
      description: "Get insurance quote for a flight or trip",
      parameters: [
        { name: "productId", type: "string", required: true, description: "Insurance product identifier" },
        { name: "route", type: "object", required: true, description: "Route information with from/to IATA codes" },
        { name: "flightNo", type: "string", required: true, description: "Flight number" },
        { name: "departureISO", type: "string", required: true, description: "Departure date and time in ISO format" }
      ],
      example: `{
  "productId": "flight_delay_standard",
  "route": {
    "from": "LHR",
    "to": "JFK"
  },
  "flightNo": "BA249",
  "departureISO": "2024-03-15T14:30:00Z"
}`
    },
    {
      method: "POST",
      endpoint: "/api/purchase-intent",
      description: "Create a policy purchase intent",
      parameters: [
        { name: "quotedId", type: "string", required: true, description: "Quote identifier from /api/quote" },
        { name: "wallet", type: "string", required: true, description: "User's wallet address" },
        { name: "partnerId", type: "string", required: false, description: "Partner identifier for affiliate tracking" }
      ],
      example: `{
  "quotedId": "quote_abc123",
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "partnerId": "partner_xyz"
}`
    },
    {
      method: "GET",
      endpoint: "/api/policies?wallet=0x...",
      description: "Get user's insurance policies",
      parameters: [
        { name: "wallet", type: "string", required: true, description: "User's wallet address" },
        { name: "status", type: "string", required: false, description: "Filter by policy status (active, expired, paid)" },
        { name: "limit", type: "number", required: false, description: "Number of results to return" },
        { name: "offset", type: "number", required: false, description: "Pagination offset" }
      ],
      example: `[
  {
    "policyId": "pol_abc123",
    "productId": "flight_delay_standard",
    "premium": "12.50",
    "payout": "250.00",
    "status": "active",
    "start": "2024-03-15T14:30:00Z",
    "end": "2024-03-16T14:30:00Z"
  }
]`
    }
  ];

  const sdkLibraries = [
    {
      name: "JavaScript SDK",
      icon: <Code className="w-6 h-6" />,
      description: "Official JavaScript library for browser and Node.js environments",
      version: "v2.1.0",
      install: "npm install @insurex/sdk",
      documentation: "https://docs.insurex.com/sdk/js"
    },
    {
      name: "React Hooks",
      icon: <Cpu className="w-6 h-6" />,
      description: "React hooks for seamless integration with React applications",
      version: "v1.3.2",
      install: "npm install @insurex/react",
      documentation: "https://docs.insurex.com/sdk/react"
    },
    {
      name: "Python Library",
      icon: <Terminal className="w-6 h-6" />,
      description: "Python client for server-side integration and automation",
      version: "v1.0.4",
      install: "pip install insurex-py",
      documentation: "https://docs.insurex.com/sdk/python"
    },
    {
      name: "Mobile SDK",
      icon: <GitBranch className="w-6 h-6" />,
      description: "Native mobile SDKs for iOS and Android applications",
      version: "v2.0.1",
      install: "See documentation for setup",
      documentation: "https://docs.insurex.com/sdk/mobile"
    }
  ];

  return (
    <section className={`pt-32 pb-20 px-6 ${isDarkTheme
      ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
      : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            API Reference
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Comprehensive API documentation for developers to integrate travel insurance into their applications
          </p>
        </motion.div>

        {/* SDK Libraries */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            SDK Libraries
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {sdkLibraries.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  isDarkTheme
                    ? 'bg-[#172e60]/60 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`mr-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>
                    {sdk.icon}
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                      {sdk.name}
                    </h4>
                    <div className={`text-sm ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                      {sdk.version}
                    </div>
                  </div>
                </div>
                <p className={`mb-4 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                  {sdk.description}
                </p>
                <div className={`mb-4 p-3 rounded-lg font-mono text-sm ${
                  isDarkTheme ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}>
                  {sdk.install}
                </div>
                <a
                  href={sdk.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 text-sm ${
                    isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Documentation</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Core API Endpoints
          </h3>
          <div className="space-y-8">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`rounded-2xl overflow-hidden border ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className={`p-6 border-b ${
                  isDarkTheme ? 'border-blue-900/40' : 'border-blue-200/30'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        endpoint.method === 'GET'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className={`font-mono text-lg ${isDarkTheme ? 'text-blue-200' : 'text-blue-700'}`}>
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(endpoint.endpoint, index)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                        isDarkTheme
                          ? 'bg-blue-700/40 text-blue-200 hover:bg-blue-600/40'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {copiedEndpoint === index ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                    {endpoint.description}
                  </p>
                </div>

                <div className="p-6 border-b">
                  <h5 className={`font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                    Parameters
                  </h5>
                  <div className={`rounded-lg overflow-hidden ${
                    isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-50'
                  }`}>
                    <table className="w-full">
                      <thead>
                        <tr className={isDarkTheme ? 'bg-blue-800/40' : 'bg-blue-100'}>
                          <th className={`p-3 text-left ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>Name</th>
                          <th className={`p-3 text-left ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>Type</th>
                          <th className={`p-3 text-left ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>Required</th>
                          <th className={`p-3 text-left ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr
                            key={paramIndex}
                            className={paramIndex % 2 === 0
                              ? isDarkTheme ? 'bg-blue-900/20' : 'bg-blue-50/50'
                              : ''
                            }
                          >
                            <td className={`p-3 font-mono ${isDarkTheme ? 'text-blue-200' : 'text-blue-700'}`}>
                              {param.name}
                            </td>
                            <td className={`p-3 ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                              {param.type}
                            </td>
                            <td className={`p-3 ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                              {param.required ? 'Yes' : 'No'}
                            </td>
                            <td className={`p-3 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                              {param.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6">
                  <h5 className={`font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                    Example
                  </h5>
                  <div className={`relative rounded-lg p-4 font-mono text-sm ${
                    isDarkTheme ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <button
                      onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                      className={`absolute top-2 right-2 p-1 rounded ${
                        isDarkTheme
                          ? 'bg-blue-700/40 text-blue-200 hover:bg-blue-600/40'
                          : 'bg-blue-200 text-blue-600 hover:bg-blue-300'
                      }`}
                    >
                      {copiedEndpoint === `example-${index}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <pre className="overflow-x-auto">{endpoint.example}</pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default APIReference;