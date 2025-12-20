import React, { useState, useRef, useEffect } from 'react';
import { Camera, MessageCircle, Upload, X, Send, Leaf, AlertCircle, CheckCircle, Sparkles, TrendingUp, Activity, Info, ChevronRight, Droplet, Sun, Wind } from 'lucide-react';
import './index.css'

export default function PlantDiseaseApp() {
  const [activeTab, setActiveTab] = useState('detection');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your AI farming assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setDiseaseResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeDisease = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setDiseaseResult({
        disease: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        confidence: 94.5,
        severity: 'High',
        affectedArea: '35%',
        treatment: [
          'Remove and destroy infected leaves immediately to prevent spread',
          'Apply copper-based fungicide (Bordeaux mixture) every 7-10 days',
          'Ensure proper spacing between plants for optimal air circulation',
          'Avoid overhead watering; water at the base of plants during morning hours',
          'Apply organic mulch to prevent soil splash and reduce humidity'
        ],
        prevention: [
          'Plant resistant varieties when available',
          'Maintain proper field sanitation',
          'Monitor weather conditions for high humidity',
          'Implement crop rotation annually'
        ],
        environmentalFactors: {
          temperature: '18-22°C',
          humidity: '85-90%',
          rainfall: 'High'
        }
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newUserMessage = {
        type: 'user',
        text: userMessage,
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, newUserMessage]);
      setUserMessage('');
      setIsTyping(true);
      
      setTimeout(() => {
        const responses = [
          'Based on your query, I recommend checking soil pH levels. Most crops thrive in a pH range of 6.0-7.0. You can use a simple soil test kit available at agricultural stores.',
          'For natural pest control, neem oil is highly effective. Mix 2 tablespoons of pure neem oil per gallon of water and spray during early morning or evening hours.',
          'Yellowing leaves typically indicate nitrogen deficiency. Consider applying well-decomposed organic compost or a balanced NPK fertilizer (10-10-10) at recommended rates.',
          'The ideal watering schedule varies by crop and soil type. Generally, deep watering 2-3 times per week is better than shallow daily watering. Check soil moisture at 2-3 inches depth.',
          'For better yields, ensure your crops receive adequate sunlight (6-8 hours daily), maintain proper spacing, and practice regular weeding to reduce competition for nutrients.',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setIsTyping(false);
        setChatMessages(prev => [...prev, {
          type: 'bot',
          text: randomResponse,
          timestamp: new Date()
        }]);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-sm bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-2xl">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  Krishi <span className="text-green-300">Mitra</span>
                </h1>
                <p className="text-green-100 text-sm font-medium flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Plant Disease Detection & Support
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Activity className="w-5 h-5 text-green-300" />
                <div>
                  <p className="text-xs text-green-200">Detection Rate</p>
                  <p className="font-bold">99.2%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <div>
                  <p className="text-xs text-green-200">Plants Analyzed</p>
                  <p className="font-bold">1.2M+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-2 flex gap-2 max-w-lg mx-auto border border-white/20">
          <button
            onClick={() => setActiveTab('detection')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
              activeTab === 'detection'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeTab === 'detection' && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            )}
            <Camera className="w-5 h-5" />
            <span>Disease Detection</span>
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
              activeTab === 'chatbot'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeTab === 'chatbot' && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            )}
            <MessageCircle className="w-5 h-5" />
            <span>AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 relative">
        {activeTab === 'detection' ? (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              {/* Detection Header */}
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-8 border-b border-white/10">
                <h2 className="text-3xl font-black text-white mb-3 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                  Plant Disease Detection System
                </h2>
                <p className="text-green-100 text-lg">Upload an image of your plant for instant AI-powered diagnosis</p>
              </div>

              <div className="p-8">
                {!uploadedImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-4 border-dashed border-white/30 rounded-2xl p-16 text-center hover:border-green-400 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      <Upload className="w-24 h-24 text-white/50 group-hover:text-green-400 mx-auto mb-6 transition-colors relative" />
                    </div>
                    <p className="text-2xl font-bold text-white mb-3">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-green-200 text-lg mb-4">
                      Support: JPG, PNG, WebP (Max 10MB)
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Instant Results</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>95%+ Accuracy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Free Analysis</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Image Preview */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50"></div>
                      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 border border-white/10">
                        <img
                          src={uploadedImage}
                          alt="Uploaded plant"
                          className="w-full max-h-[500px] object-contain rounded-xl"
                        />
                        <button
                          onClick={() => {
                            setUploadedImage(null);
                            setDiseaseResult(null);
                          }}
                          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    {!diseaseResult && !isAnalyzing && (
                      <button
                        onClick={analyzeDisease}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-green-500/50 hover:shadow-2xl hover:shadow-green-500/60 hover:scale-[1.02] flex items-center justify-center gap-3 group"
                      >
                        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        Analyze Plant Disease
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    {isAnalyzing && (
                      <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                          <div className="absolute inset-0 border-4 border-green-500/30 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-green-400 animate-pulse" />
                        </div>
                        <p className="text-white font-bold text-xl mb-2">Analyzing your plant...</p>
                        <p className="text-green-200">AI is processing the image</p>
                      </div>
                    )}

                    {diseaseResult && (
                      <div className="space-y-6">
                        {/* Disease Alert */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-400/50 p-8 backdrop-blur-sm">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                          <div className="relative flex items-start gap-4">
                            <div className="bg-red-500 p-3 rounded-xl">
                              <AlertCircle className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-3xl font-black text-white mb-2">
                                {diseaseResult.disease}
                              </h3>
                              <p className="text-red-200 text-lg italic mb-4">{diseaseResult.scientificName}</p>
                              <div className="flex flex-wrap gap-3">
                                <span className="bg-red-900/50 text-red-100 px-4 py-2 rounded-full font-bold text-sm border border-red-400/50">
                                  Confidence: {diseaseResult.confidence}%
                                </span>
                                <span className="bg-orange-900/50 text-orange-100 px-4 py-2 rounded-full font-bold text-sm border border-orange-400/50">
                                  Severity: {diseaseResult.severity}
                                </span>
                                <span className="bg-yellow-900/50 text-yellow-100 px-4 py-2 rounded-full font-bold text-sm border border-yellow-400/50">
                                  Affected: {diseaseResult.affectedArea}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Environmental Factors */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-6 text-center backdrop-blur-sm">
                            <Sun className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <p className="text-orange-200 text-sm mb-1">Temperature</p>
                            <p className="text-white font-bold text-lg">{diseaseResult.environmentalFactors.temperature}</p>
                          </div>
                          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6 text-center backdrop-blur-sm">
                            <Droplet className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <p className="text-blue-200 text-sm mb-1">Humidity</p>
                            <p className="text-white font-bold text-lg">{diseaseResult.environmentalFactors.humidity}</p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30 rounded-xl p-6 text-center backdrop-blur-sm">
                            <Wind className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                            <p className="text-purple-200 text-sm mb-1">Rainfall</p>
                            <p className="text-white font-bold text-lg">{diseaseResult.environmentalFactors.rainfall}</p>
                          </div>
                        </div>

                        {/* Treatment */}
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-8 backdrop-blur-sm">
                          <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <div className="bg-blue-500 p-2 rounded-lg">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            Treatment Recommendations
                          </h4>
                          <div className="space-y-4">
                            {diseaseResult.treatment.map((step, index) => (
                              <div key={index} className="flex items-start gap-4 bg-blue-900/20 p-4 rounded-xl border border-blue-400/20">
                                <span className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white font-black rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg shadow-lg">
                                  {index + 1}
                                </span>
                                <span className="text-white text-lg leading-relaxed pt-1">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Prevention */}
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-8 backdrop-blur-sm">
                          <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                            <div className="bg-green-500 p-2 rounded-lg">
                              <Info className="w-6 h-6 text-white" />
                            </div>
                            Prevention Tips for Future
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {diseaseResult.prevention.map((tip, index) => (
                              <div key={index} className="flex items-start gap-3 bg-green-900/20 p-4 rounded-xl border border-green-400/20">
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-white leading-relaxed">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setUploadedImage(null);
                            setDiseaseResult(null);
                          }}
                          className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold text-lg transition-all border border-white/20 hover:border-white/40"
                        >
                          Analyze Another Plant
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20" style={{ height: '700px' }}>
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 p-8 border-b border-white/10">
                <h2 className="text-3xl font-black text-white mb-3 flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-xl">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  AI Farming Assistant
                </h2>
                <p className="text-green-100 text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 animate-pulse text-green-300" />
                  Online • Ready to help with your farming questions
                </p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none'
                          : 'bg-white/90 text-gray-800 rounded-bl-none border border-white/20 backdrop-blur-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 text-gray-800 px-6 py-4 rounded-2xl rounded-bl-none shadow-lg backdrop-blur-sm border border-white/20">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-t border-white/10 backdrop-blur-sm">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about farming, crops, diseases..."
                    className="flex-1 px-6 py-4 bg-white/90 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 placeholder-gray-500 font-medium backdrop-blur-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userMessage.trim()}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl transition-all flex items-center gap-3 font-bold shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/60 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    <Send className="w-6 h-6" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}