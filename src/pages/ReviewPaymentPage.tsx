import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bath, Calendar, Check, Clock, CreditCard, Home, Shield, Sparkles, Users } from 'lucide-react';
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

export default function ReviewPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan as SubscriptionPlan;
  const selectedOptions = location.state?.selectedOptions as PaymentOptions;

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!selectedPlan || !selectedOptions) {
      navigate('/subscription-selection');
    }
  }, [selectedPlan, selectedOptions, navigate]);

  if (!selectedPlan || !selectedOptions) {
    return null;
  }

  const getBuildingTypeName = (id: string) => {
    return buildingTypes.find(type => type.id === id)?.name || id;
  };

  const getTimeSlotName = (id: string) => {
    return timeSlots.find(slot => slot.id === id)?.name || id;
  };

  const getFrequencyName = (id: string) => {
    return frequencies.find(freq => freq.id === id)?.name || id;
  };

  const getFrequencyPrice = () => {
    const frequency = frequencies.find(f => f.id === selectedOptions.frequency);
    return frequency?.price || 0;
  };

  const getBedroomAdjustment = () => {
    if (selectedOptions.bedrooms <= 2) return 0;
    if (selectedOptions.bedrooms <= 4) return 200;
    return 400;
  };

  const getBathroomAdjustment = () => {
    if (selectedOptions.bathrooms <= 2) return 0;
    if (selectedOptions.bathrooms <= 4) return 150;
    return 300;
  };

  const getBuildingTypeAdjustment = () => {
    switch (selectedOptions.buildingType) {
      case 'villa': return 500;
      case 'penthouse': return 800;
      case 'duplex': return 600;
      default: return 0;
    }
  };

  const basePrice = selectedPlan.price;
  const frequencyAdjustment = getFrequencyPrice();
  const bedroomAdjustment = getBedroomAdjustment();
  const bathroomAdjustment = getBathroomAdjustment();
  const buildingTypeAdjustment = getBuildingTypeAdjustment();
  
  const subtotal = basePrice + frequencyAdjustment + bedroomAdjustment + bathroomAdjustment + buildingTypeAdjustment;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  const handleMakePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would integrate with your payment gateway
      alert('Payment gateway integration would go here!');
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-700"
          onClick={() => navigate('/payment-options', { state: { selectedPlan } })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Options
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Review & Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selections and complete the payment to start your cleaning service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Section - User Details & Options (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Selected Plan Summary */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Selected Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
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

            {/* Home Specifications */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Home className="h-6 w-6 text-green-600" />
                  Home Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Home className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Bedrooms</p>
                      <p className="text-gray-600">{selectedOptions.bedrooms} bedroom{selectedOptions.bedrooms > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Bathrooms</p>
                      <p className="text-gray-600">{selectedOptions.bathrooms} bathroom{selectedOptions.bathrooms > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Building Type</p>
                      <p className="text-gray-600">{getBuildingTypeName(selectedOptions.buildingType)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Schedule */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                  Service Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Time Slot</p>
                      <p className="text-gray-600">{getTimeSlotName(selectedOptions.timeSlot)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Start Date</p>
                      <p className="text-gray-600">{formatDate(selectedOptions.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Frequency</p>
                      <p className="text-gray-600">{getFrequencyName(selectedOptions.frequency)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Check className="h-6 w-6 text-green-600" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Service Duration</p>
                      <p className="text-gray-600">{selectedPlan.serviceHours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Team Size</p>
                      <p className="text-gray-600">{selectedPlan.teamSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Cancellation</p>
                      <p className="text-gray-600">{selectedPlan.cancellation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Bill Summary (30%) */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Bill Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Plan:</span>
                    <span className="font-semibold">₹{basePrice}</span>
                  </div>
                  
                  {frequencyAdjustment !== 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className={`font-semibold ${frequencyAdjustment < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {frequencyAdjustment > 0 ? '+' : ''}₹{frequencyAdjustment}
                      </span>
                    </div>
                  )}
                  
                  {bedroomAdjustment > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms ({selectedOptions.bedrooms}):</span>
                      <span className="font-semibold text-red-600">+₹{bedroomAdjustment}</span>
                    </div>
                  )}
                  
                  {bathroomAdjustment > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms ({selectedOptions.bathrooms}):</span>
                      <span className="font-semibold text-red-600">+₹{bathroomAdjustment}</span>
                    </div>
                  )}
                  
                  {buildingTypeAdjustment > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Building Type:</span>
                      <span className="font-semibold text-red-600">+₹{buildingTypeAdjustment}</span>
                    </div>
                  )}
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span className="font-semibold">₹{gst.toFixed(0)}</span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleMakePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Make Payment
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Secure payment powered by industry-leading encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
