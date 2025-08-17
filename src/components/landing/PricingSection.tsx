import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check, Crown, Sparkles, Star } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  discount?: number;
  originalPrice?: number;
}

interface PricingSectionProps {
  isAuthenticated?: boolean;
  onPlanSelect?: (planId: string) => void;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Clean',
    price: 999,
    duration: 'month',
    description: 'Perfect for small apartments and regular maintenance',
    features: [
      'Weekly cleaning service',
      'Basic cleaning supplies included',
      'Standard 2-hour service',
      'Kitchen & bathroom focus',
      'Vacuum & mop floors'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Plus',
    price: 1499,
    duration: 'month',
    description: 'Ideal for medium-sized homes with enhanced services',
    features: [
      'Bi-weekly deep cleaning',
      'Premium cleaning supplies',
      '3-hour comprehensive service',
      'All rooms included',
      'Appliance cleaning',
      'Window cleaning',
      'Priority scheduling'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Complete',
    price: 2499,
    duration: 'month',
    description: 'Ultimate cleaning experience for large homes and villas',
    features: [
      'Weekly premium cleaning',
      'Luxury cleaning supplies',
      '4-hour detailed service',
      'All rooms + outdoor areas',
      'Deep carpet cleaning',
      'Furniture polishing',
      '24/7 support',
      'Free cancellation'
    ],
    discount: 20,
    originalPrice: 3125
  }
];

export const PricingSection = ({ isAuthenticated = false, onPlanSelect }: PricingSectionProps) => {
  const handlePlanSelect = (planId: string) => {
    if (onPlanSelect) {
      onPlanSelect(planId);
    }
  };

  return (
    <section id="subscription-plans" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Cleaning Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect subscription plan that fits your home and lifestyle. 
            All plans include professional cleaning services with flexible scheduling.
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mt-4">
            <Crown className="h-4 w-4 mr-2" />
            30-day money-back guarantee on all plans
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id}
              className="relative transition-all duration-300 hover:scale-105 shadow-xl border-0 bg-white/80 backdrop-blur-sm"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              {plan.discount && (
                <Badge className="absolute -top-3 -right-3 bg-green-500 text-white px-2 py-1 text-xs font-bold">
                  -{plan.discount}%
                </Badge>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-blue-600">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-500 text-lg">
                      /{plan.duration}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ₹{plan.originalPrice}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {isAuthenticated ? 'Get Started' : 'Get Started'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-gray-600">
          <p className="text-lg">
            Need a custom plan? <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">Contact us</a>
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};