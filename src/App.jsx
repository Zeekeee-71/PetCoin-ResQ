import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Coins, Smartphone, Heart, Shield, TrendingUp, Users, Zap, Star, ExternalLink } from 'lucide-react'
import SolSendIsland from "@/components/solana/SolSendIsland";
import Ping from "@/components/solana/Ping"
import PurchaseSection from "@/components/solana/PurchaseSection"
import dogBanner from './assets/real_dog_yellow_hoodie.png'
import dogScene from './assets/00003-871641687.png'
import './App.css'

function App() {
  const [showPurchaseSection, setShowPurchaseSection] = useState(false);

  const scrollToPurchaseSection = () => {
    setShowPurchaseSection(true);
    // Scroll to purchase section after a brief delay to allow DOM update
    setTimeout(() => {
      const element = document.getElementById('purchase-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Dog Banner */}
      <header className="petcoin-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <nav className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">ResQ</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-white hover:text-yellow-300 transition-colors">Features</a>
              <a href="#tokenomics" className="text-white hover:text-yellow-300 transition-colors">Tokenomics</a>
              <a href="#app" className="text-white hover:text-yellow-300 transition-colors">AI App</a>
              <a href="#community" className="text-white hover:text-yellow-300 transition-colors">Community</a>
            </div>

            <Button 
              className="petcoin-button font-semibold px-6"
              onClick={scrollToPurchaseSection}
            >
              Buy RESQ
            </Button>

          </nav>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                🚀 Now Live on Solana
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                The Future of <span className="text-yellow-300">Pet-Powered</span> Cryptocurrency
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed">
                Join the revolution where pet lovers unite! ResQ combines the power of artificial intelligence 
                with the love for our furry friends, creating a cryptocurrency that supports animal welfare worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">

                <Button 
                  size="lg" 
                  className="petcoin-button text-lg px-8 py-3"
                  onClick={scrollToPurchaseSection}
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Get RESQ Tokens
                </Button>

                {/*
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download App
                </Button>
                */}
              </div>
            </div>
            <div className="relative">
              <img 
                src={dogBanner} 
                alt="ResQ Mascot" 
                className="w-full max-w-md mx-auto petcoin-float rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold petcoin-bounce">
                1B Tokens!
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold petcoin-text-gradient mb-4">
              Why Choose ResQ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another cryptocurrency. We're a movement dedicated to improving the lives of pets 
              and their owners through cutting-edge AI technology and blockchain innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">1 Billion Token Supply</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Massive token supply ensuring accessibility for all pet lovers. Built on Solana for 
                  lightning-fast transactions and minimal fees.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">AI-Powered Mobile App</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Revolutionary AI tools for pet diagnosis, vet finding, and health monitoring. 
                  Exclusive access for holders with $1000+ worth of tokens.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Animal Welfare Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Every transaction supports pet rescue organizations and animal welfare initiatives. 
                  Token burns directly benefit pet charities worldwide.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Secure & Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Built with enhanced security features and complete transparency. 
                  Smart contracts audited for maximum investor protection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Rewards Program</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Exclusive rewards and benefits for long-term holders. 
                  Premium features unlock at different holding thresholds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="petcoin-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Join a passionate community of pet lovers and crypto enthusiasts. 
                  Governance voting rights for major decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 petcoin-hero-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Tokenomics That Make Sense
              </h2>
              <div className="space-y-6">
                <div className="petcoin-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Total Supply</span>
                    <span className="text-2xl font-bold text-teal-600">1,000,000,000 RESQ</span>
                  </div>
                  <p className="text-gray-600">Fixed supply with deflationary mechanisms</p>
                </div>
                
                <div className="petcoin-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Blockchain</span>
                    <span className="text-xl font-bold text-purple-600">Solana (SOL)</span>
                  </div>
                  <p className="text-gray-600">Lightning-fast transactions, minimal fees</p>
                </div>
                
                <div className="petcoin-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">DEX Platform</span>
                    <span className="text-xl font-bold text-blue-600">Raydium</span>
                  </div>
                  <p className="text-gray-600">Liquid trading with deep market depth</p>
                </div>

                <div className="petcoin-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Charity Burns</span>
                    <span className="text-xl font-bold text-pink-600">Quarterly</span>
                  </div>
                  <p className="text-gray-600">Token burns benefit pet welfare organizations</p>
                </div>

                <div className="petcoin-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Contract Address</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open('https://dexscreener.com/solana', '_blank')}
                      className="text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on Dexscreener
                    </Button>
                  </div>
                  <p className="text-gray-600">Track ResQ on Dexscreener</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={dogScene} 
                alt="Pet Community" 
                className="w-full rounded-2xl shadow-2xl petcoin-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Join Our Pack!</h3>
                <p className="text-lg">Where pets and profits unite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI App Section */}
      <section id="app" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-teal-500 to-yellow-500 text-white px-4 py-2 text-lg mb-4">
              🤖 Phase 2 Launch
            </Badge>
            <h2 className="text-4xl font-bold petcoin-text-gradient mb-4">
              AI-Powered Pet Care App
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary mobile application featuring cutting-edge AI technology for pet health, 
              diagnosis, and veterinary services. Exclusive access for qualified token holders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-teal-50 to-white border border-teal-100">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Diagnosis</h3>
              <p className="text-gray-600">Instant pet health analysis using advanced AI algorithms</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-yellow-50 to-white border border-yellow-100">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Vet Finder</h3>
              <p className="text-gray-600">Locate qualified veterinarians in your area instantly</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-pink-50 to-white border border-pink-100">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Health Tracking</h3>
              <p className="text-gray-600">Monitor your pet's health metrics and vaccination schedules</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Premium Support</h3>
              <p className="text-gray-600">24/7 AI-powered pet care assistance and emergency alerts</p>
            </div>
          </div>
          {/*
          <div className="text-center">
            <div className="petcoin-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Unlock Premium Features</h3>
              <p className="text-gray-600 mb-6">
                Hold $1000+ worth of RESQ tokens to access exclusive AI-powered pet care features. 
                Early adopters get lifetime premium access!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="petcoin-button">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Pre-Register Now
                </Button>
                <Button size="lg" variant="outline">
                  View Requirements
                </Button>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 petcoin-gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the ResQ Community
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-3xl mx-auto">
            Connect with fellow pet lovers, stay updated on the latest developments, 
            and be part of the revolution that's changing how we care for our furry friends.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="petcoin-card p-6">
              <h3 className="text-xl font-bold mb-4">🐕 Active Community</h3>
              <p className="text-gray-600 mb-4">Join thousands of pet lovers on our social platforms</p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://x.com/PetCoinAI2025', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Follow on X
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://t.me/ResQ_Channel', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join Telegram
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://www.reddit.com/r/PetCoinAI/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join Reddit
                </Button>
              </div>
            </div>
            
            <div className="petcoin-card p-6">
              <h3 className="text-xl font-bold mb-4">📱 Mobile First</h3>
              <p className="text-gray-600 mb-4">Access everything from your smartphone</p>
              <p className="text-gray-600 mb-4">[Coming Soon!]</p>
              <Button variant="outline" className="w-full">Download App</Button>
            </div>
            {/*
            <div className="petcoin-card p-6">
              <h3 className="text-xl font-bold mb-4">🎯 Regular Updates</h3>
              <p className="text-gray-600 mb-4">Stay informed about new features and partnerships</p>
              <Button variant="outline" className="w-full">Subscribe</Button>
            </div>
            */}
          </div>

          <div className="max-w-4xl mx-auto" id="purchase-section">
            {!showPurchaseSection ? (
              <div className="petcoin-card p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Join the pet-powered cryptocurrency revolution today. Buy RESQ tokens, 
                  support animal welfare, and unlock exclusive AI-powered features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="petcoin-button text-lg px-8"
                    onClick={scrollToPurchaseSection}
                  >
                    <Coins className="mr-2 h-5 w-5" />
                    Get RESQ Tokens
                  </Button>
                  {/*
                  <Button size="lg" variant="outline">
                    Read Whitepaper
                  </Button>
                  */}
                </div>
              </div>
            ) : (
              <PurchaseSection />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coins className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-bold">ResQ</span>
              </div>
              <p className="text-gray-400 mb-4">
                The future of pet-powered cryptocurrency, built with love for our furry friends.
              </p>
              <p className="text-sm text-gray-500">
                Website: https://resq.petcoinai.info
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#tokenomics" className="hover:text-teal-400 transition-colors">Tokenomics</a></li>
                <li><a href="#app" className="hover:text-teal-400 transition-colors">AI App</a></li>
                <li><a href="#community" className="hover:text-teal-400 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Audit Report</a></li>
                <li>
                  <a 
                    href="https://dexscreener.com/solana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors flex items-center"
                  >
                    Dexscreener <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>petcoinai@gmail.com</li>
                <li>
                  <a 
                    href="https://x.com/PetCoinAI2025" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors flex items-center"
                  >
                    Follow us on X <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/ResQ_Channel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors flex items-center"
                  >
                    Join Telegram <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>Discord Community</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResQ. All rights reserved. Built with ❤️ for pets everywhere.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App

