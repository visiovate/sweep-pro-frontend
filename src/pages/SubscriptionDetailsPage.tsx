import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  serviceHours: string;
  coverage: string;
  teamSize: string;
  cancellation: string;
}

interface PropertyType {
  id: string;
  name: string;
  description: string;
}

const subscriptionPlans: Record<string, SubscriptionPlan> = {
  basic: {
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
      'Vacuum & mop floors',
      'Dust surfaces and furniture',
      'Empty trash bins',
      'Basic sanitization'
    ],
    serviceHours: '2 hours per session',
    coverage: 'Kitchen, Bathroom, Living Room, Bedroom',
    teamSize: '1 professional cleaner',
    cancellation: '24 hours notice required'
  },
  standard: {
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
      'Priority scheduling',
      'Deep carpet cleaning',
      'Furniture polishing',
      'Cabinet organization'
    ],
    popular: true,
    serviceHours: '3 hours per session',
    coverage: 'All indoor areas + Balcony',
    teamSize: '2 professional cleaners',
    cancellation: '12 hours notice required'
  },
  premium: {
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
      'Free cancellation',
      'Premium air fresheners',
      'Specialty surface treatment',
      'Outdoor area cleaning',
      'Express service available'
    ],
    discount: 20,
    originalPrice: 3125,
    serviceHours: '4 hours per session',
    coverage: 'Complete home + Outdoor areas',
    teamSize: '3 professional cleaners',
    cancellation: 'Free cancellation anytime'
  }
};

const propertyTypes: PropertyType[] = [
  { id: '2bhk', name: '2BHK', description: '2 Bedroom, Hall, Kitchen' },
  { id: '1bhk', name: '1BHK', description: '1 Bedroom, Hall, Kitchen' },
  { id: 'villa', name: 'Villas', description: 'Independent houses & villas' }
];

const pricingOptions = [
  { duration: 'Monthly', price: 10999 },
  { duration: '3 Months', price: 29999 },
  { duration: '6 Months', price: 54999 },
  { duration: 'Yearly', price: 99999 }
];

export default function SubscriptionDetailsPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(planId || 'basic');
  const [selectedProperty, setSelectedProperty] = useState('2bhk');
  
  const plan = subscriptionPlans[selectedPlan];
  
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
          <Button onClick={() => navigate('/')}>
            Back to Plans
          </Button>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    navigate('/payment-options', { state: { selectedPlan: plan } });
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-700"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>

        {/* Property Type Selection Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-full w-fit mx-auto">
            {propertyTypes.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  selectedProperty === property.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
              >
                {property.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Features Card */}
        <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-blue-600 mb-2">
              Pro Plan Features
            </CardTitle>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Perfect for small families and basic home maintenance needs. Our Pro Plan offers essential services with professional quality.
            </p>
            <hr className="border-gray-200 mt-4" />
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-8">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Daily Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Utensils Cleaning</p>
                        <p className="text-sm text-gray-600">Professional cleaning of all kitchen utensils and dishes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Weekly Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bathroom Cleaning</p>
                        <p className="text-sm text-gray-600">Complete sanitization and cleaning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Thrice Weekly Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Floor Sweeping</p>
                        <p className="text-sm text-gray-600">Thorough sweeping of all floor areas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Floor Mopping</p>
                        <p className="text-sm text-gray-600">Deep cleaning with quality cleaning agents</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Additional Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Washing Clothes</p>
                        <p className="text-sm text-gray-600">Optional service available on request</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Options */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing Options</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pricingOptions.map((option) => (
                  <div
                    key={option.duration}
                    className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer shadow-sm"
                  >
                    <p className="text-sm text-gray-600 mb-1">{option.duration}</p>
                    <p className="text-2xl font-bold text-blue-600">₹{option.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4">
              <Button
                className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleProceedToPayment}
              >
                Book Pro Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
