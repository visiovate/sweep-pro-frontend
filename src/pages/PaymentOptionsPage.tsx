import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Bath, Calendar, Clock, Home, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

interface PaymentOptions {
  bedrooms: number;
  bathrooms: number;
  buildingType: string;
  timeSlot: string;
  startDate: string;
  frequency: string;
}

const buildingTypes = [
  { id: '1bhk', name: '1 BHK', icon: '🏠' },
  { id: '2bhk', name: '2 BHK', icon: '🏡' },
  { id: '3bhk', name: '3 BHK', icon: '🏘️' },
  { id: 'villa', name: 'Villa', icon: '🏰' },
  { id: 'penthouse', name: 'Penthouse', icon: '🏢' },
  { id: 'duplex', name: 'Duplex', icon: '🏛️' }
];

const timeSlots = [
  { id: 'morning', name: 'Morning', time: '8:00 AM - 12:00 PM', icon: '🌅' },
  { id: 'afternoon', name: 'Afternoon', time: '12:00 PM - 4:00 PM', icon: '☀️' },
  { id: 'evening', name: 'Evening', time: '4:00 PM - 8:00 PM', icon: '🌆' }
];

const frequencies = [
  { id: 'weekly', name: 'Weekly', description: 'Every 7 days', price: 0 },
  { id: 'biweekly', name: 'Bi-weekly', description: 'Every 14 days', price: -200 },
  { id: 'monthly', name: 'Monthly', description: 'Every 30 days', price: -500 }
];

export default function PaymentOptionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan as SubscriptionPlan;

  const [options, setOptions] = useState<PaymentOptions>({
    bedrooms: 1,
    bathrooms: 1,
    buildingType: '1bhk',
    timeSlot: 'morning',
    startDate: new Date().toISOString().split('T')[0],
    frequency: 'weekly'
  });

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/subscription-selection');
    }
  }, [selectedPlan, navigate]);

  if (!selectedPlan) {
    return null;
  }

  const handleOptionChange = (key: keyof PaymentOptions, value: string | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    navigate('/review-payment', { 
      state: { 
        selectedPlan, 
        selectedOptions: options 
      } 
    });
  };

  const getFrequencyPrice = () => {
    const frequency = frequencies.find(f => f.id === options.frequency);
    return frequency?.price || 0;
  };

  const totalPrice = selectedPlan.price + getFrequencyPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-700"
          onClick={() => navigate(`/subscription-details/${selectedPlan.id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plan Details
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customize Your Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your home specifications and preferred service schedule
          </p>
        </div>

        {/* Selected Plan Summary */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name}</h3>
                <p className="text-gray-600">{selectedPlan.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">₹{selectedPlan.price}</p>
                <p className="text-gray-500">per {selectedPlan.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Bedrooms Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  Number of Bedrooms
                </CardTitle>
                <CardDescription>Select the number of bedrooms in your home</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleOptionChange('bedrooms', num)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        options.bedrooms === num
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-xl font-bold">{num}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bathrooms Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-green-600" />
                  Number of Bathrooms
                </CardTitle>
                <CardDescription>Select the number of bathrooms in your home</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleOptionChange('bathrooms', num)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        options.bathrooms === num
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <span className="text-xl font-bold">{num}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Building Type Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Building Type
                </CardTitle>
                <CardDescription>Select your building type for accurate pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {buildingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleOptionChange('buildingType', type.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        options.buildingType === type.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <span className="font-semibold">{type.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Time Slot Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Preferred Time Slot
                </CardTitle>
                <CardDescription>Choose your preferred cleaning time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleOptionChange('timeSlot', slot.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        options.timeSlot === slot.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{slot.icon}</span>
                        <div>
                          <div className="font-semibold">{slot.name}</div>
                          <div className="text-sm opacity-80">{slot.time}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Start Date Selection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Service Start Date
                </CardTitle>
                <CardDescription>When would you like to start the service?</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="date"
                  value={options.startDate}
                  onChange={(e) => handleOptionChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
              </CardContent>
            </Card>

            {/* Service Frequency */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  Service Frequency
                </CardTitle>
                <CardDescription>How often would you like the service?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {frequencies.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => handleOptionChange('frequency', freq.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        options.frequency === freq.id
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{freq.name}</div>
                          <div className="text-sm opacity-80">{freq.description}</div>
                        </div>
                        {freq.price !== 0 && (
                          <Badge className={freq.price < 0 ? 'bg-green-500' : 'bg-red-500'}>
                            {freq.price > 0 ? '+' : ''}₹{freq.price}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Button */}
        <div className="text-center mt-12">
          <Button 
            className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleNext}
          >
            Next: Review & Payment
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
