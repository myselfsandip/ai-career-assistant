"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Star } from "lucide-react"
import React from 'react'

export default function PricingSection() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started with basic career tools",
            icon: Star,
            features: [
                "Basic resume builder",
                "1 ATS score check per month",
                "Basic templates",
                "Email support",
                "Community access"
            ],
            buttonText: "Get Started Free",
            buttonVariant: "outline" as const,
            popular: false
        },
        {
            name: "Pro",
            price: "$19",
            period: "per month",
            description: "Ideal for active job seekers and career changers",
            icon: Zap,
            features: [
                "Unlimited resume builds",
                "Unlimited ATS score checks",
                "Premium templates",
                "AI cover letter generator",
                "5 mock interviews per month",
                "Priority support",
                "Industry insights",
                "Salary negotiation tips"
            ],
            buttonText: "Start Pro Trial",
            buttonVariant: "default" as const,
            popular: true
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "per month",
            description: "For teams and recruiters who need advanced features",
            icon: Crown,
            features: [
                "Everything in Pro",
                "Unlimited mock interviews",
                "Advanced analytics",
                "Team collaboration",
                "Custom branding",
                "API access",
                "Dedicated support",
                "Custom integrations",
                "Bulk resume screening"
            ],
            buttonText: "Contact Sales",
            buttonVariant: "outline" as const,
            popular: false
        }
    ]

    return (
        <section id="pricing" className="py-20 bg-gray-50 dark:bg-slate-900/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        Pricing Plans
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Choose Your Career Growth Plan
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Start free and upgrade as you grow. All plans include our core AI-powered features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <Card key={index} className={`relative group hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            
                            <CardHeader className="text-center pb-8">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-100 dark:bg-slate-800'}`}>
                                    <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {plan.name}
                                </CardTitle>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                    <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                                </div>
                                <CardDescription className="mt-4 text-gray-600 dark:text-gray-300">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <Button 
                                    variant={plan.buttonVariant} 
                                    className="w-full mt-8"
                                    size="lg"
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        All plans include a 14-day free trial. No credit card required.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                        <span>✓ Cancel anytime</span>
                        <span>✓ 30-day money back guarantee</span>
                        <span>✓ Enterprise-grade security</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
