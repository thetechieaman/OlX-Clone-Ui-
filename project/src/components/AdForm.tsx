import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import FormField from './FormField';
import RadioGroup from './RadioGroup';
import ImageUpload from './ImageUpload';
import SuccessPopup from './SuccessPopup';
import { Camera } from 'lucide-react';

interface FormData {
  category: string;
  brand: string;
  model: string;
  variant: string;
  year: string;
  fuel: string;
  transmission: string;
  kmDriven: string;
  owners: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  country: string;
  region: string;
  city: string;
  name: string;
  phone: string;
  profileImage: string;
}

// Mock data for car options
const carOptions = {
  brands: ['Toyota', 'Honda', 'Ford', 'Hyundai', 'Maruti Suzuki'],
  models: {
    Toyota: ['Innova', 'Fortuner', 'Camry'],
    Honda: ['City', 'Civic', 'Amaze'],
    Ford: ['EcoSport', 'Endeavour', 'Figo'],
    Hyundai: ['Creta', 'i20', 'Venue'],
    'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire']
  },
  variants: {
    Innova: ['G', 'GX', 'VX', 'ZX'],
    Fortuner: ['4x2', '4x4', 'Legender'],
    Camry: ['Hybrid'],
    City: ['V', 'VX', 'ZX'],
    Civic: ['V', 'VX', 'ZX'],
    Amaze: ['E', 'S', 'V', 'VX'],
    EcoSport: ['Ambiente', 'Trend', 'Titanium'],
    Endeavour: ['Titanium', 'Titanium+'],
    Figo: ['Ambiente', 'Titanium'],
    Creta: ['E', 'S', 'SX', 'SX(O)'],
    i20: ['Magna', 'Sportz', 'Asta'],
    Venue: ['E', 'S', 'SX', 'SX(O)'],
    Swift: ['LXi', 'VXi', 'ZXi', 'ZXi+'],
    Baleno: ['Sigma', 'Delta', 'Zeta', 'Alpha'],
    Dzire: ['LXi', 'VXi', 'ZXi', 'ZXi+']
  }
};

const AdForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: 'Cars',
    brand: '',
    model: '',
    variant: '',
    year: '',
    fuel: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    title: '',
    description: '',
    price: '',
    images: Array(20).fill(''),
    country: 'India',
    region: 'Andaman & Nicobar Islands',
    city: '',
    name: 'OLX User',
    phone: '',
    profileImage: ''
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [activeTab, setActiveTab] = useState<'list' | 'current'>('current');

  useEffect(() => {
    if (formData.brand) {
      setFormData(prev => ({
        ...prev,
        model: '',
        variant: ''
      }));
    }
  }, [formData.brand]);

  useEffect(() => {
    if (formData.model) {
      setFormData(prev => ({
        ...prev,
        variant: ''
      }));
    }
  }, [formData.model]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateKmDriven = (km: string) => {
    const kmNumber = parseInt(km, 10);
    return !isNaN(kmNumber) && kmNumber >= 0 && kmNumber <= 999999;
  };

  const validateYear = (year: string) => {
    const yearNumber = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    return !isNaN(yearNumber) && yearNumber >= 1900 && yearNumber <= currentYear;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.variant) newErrors.variant = 'Variant is required';
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (!validateYear(formData.year)) {
      newErrors.year = 'Please enter a valid year';
    }
    if (!formData.fuel) newErrors.fuel = 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.kmDriven) {
      newErrors.kmDriven = 'KM driven is required';
    } else if (!validateKmDriven(formData.kmDriven)) {
      newErrors.kmDriven = 'Please enter a valid kilometer reading (0-999999)';
    }
    if (!formData.owners) newErrors.owners = 'Number of owners is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseInt(formData.price, 10)) || parseInt(formData.price, 10) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.images[0]) newErrors.images = 'At least one image is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number (+91XXXXXXXXXX)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm">
      <h1 className="text-2xl font-bold p-6 text-center border-b">POST YOUR AD</h1>
      
      <div className="p-6 space-y-6">
        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">SELECTED CATEGORY</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Cars / Cars</span>
              <button type="button" className="text-blue-600 hover:underline">Change</button>
            </div>
          </div>
        </div>

        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">INCLUDE SOME DETAILS</h2>
          </div>
          <div className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Brand *" error={errors.brand}>
                <select
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Brand</option>
                  {carOptions.brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Model *" error={errors.model}>
                <select
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  disabled={!formData.brand}
                >
                  <option value="">Select Model</option>
                  {formData.brand && carOptions.models[formData.brand]?.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Variant *" error={errors.variant}>
                <select
                  value={formData.variant}
                  onChange={(e) => handleChange('variant', e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  disabled={!formData.model}
                >
                  <option value="">Select Variant</option>
                  {formData.model && carOptions.variants[formData.model]?.map(variant => (
                    <option key={variant} value={variant}>{variant}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Year *" error={errors.year}>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  placeholder="Enter year"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </FormField>
            </div>

            <FormField label="Fuel *" error={errors.fuel}>
              <RadioGroup
                name="fuel"
                value={formData.fuel}
                onChange={(value) => handleChange('fuel', value)}
                options={[
                  { value: 'cng', label: 'CNG & Hybrids' },
                  { value: 'diesel', label: 'Diesel' },
                  { value: 'electric', label: 'Electric' },
                  { value: 'lpg', label: 'LPG' },
                  { value: 'petrol', label: 'Petrol' }
                ]}
              />
            </FormField>

            <FormField label="Transmission *" error={errors.transmission}>
              <RadioGroup
                name="transmission"
                value={formData.transmission}
                onChange={(value) => handleChange('transmission', value)}
                options={[
                  { value: 'automatic', label: 'Automatic' },
                  { value: 'manual', label: 'Manual' }
                ]}
              />
            </FormField>

            <FormField label="KM driven *" error={errors.kmDriven}>
              <input
                type="number"
                value={formData.kmDriven}
                onChange={(e) => handleChange('kmDriven', e.target.value)}
                placeholder="Enter KM driven"
                min="0"
                max="999999"
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.kmDriven.length} / 6
              </div>
            </FormField>

            <FormField label="No. of Owners *" error={errors.owners}>
              <RadioGroup
                name="owners"
                value={formData.owners}
                onChange={(value) => handleChange('owners', value)}
                options={[
                  { value: '1st', label: '1st' },
                  { value: '2nd', label: '2nd' },
                  { value: '3rd', label: '3rd' },
                  { value: '4th', label: '4th' },
                  { value: '4+', label: '4+' }
                ]}
              />
            </FormField>

            <FormField 
              label="Ad title *" 
              error={errors.title}
              characterCount={{ current: formData.title.length, max: 70 }}
            >
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
                maxLength={70}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </FormField>

            <FormField 
              label="Description *" 
              error={errors.description}
              characterCount={{ current: formData.description.length, max: 4096 }}
            >
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Include condition, features and reason for selling"
                maxLength={4096}
                rows={4}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 resize-none"
              />
            </FormField>
          </div>
        </div>

        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">SET A PRICE</h2>
          </div>
          <div className="p-4">
            <FormField label="Price *" error={errors.price}>
              <div className="flex items-center">
                <span className="p-2 bg-gray-50 border border-r-0 rounded-l">₹</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="Enter price"
                  min="0"
                  className="flex-1 p-2 border rounded-r focus:outline-none focus:border-blue-500"
                />
              </div>
            </FormField>
          </div>
        </div>

        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">UPLOAD UP TO 20 PHOTOS</h2>
          </div>
          <div className="p-4">
            <ImageUpload
              maxImages={20}
              images={formData.images}
              onImageUpload={(e, index) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const newImages = [...formData.images];
                    newImages[index] = reader.result as string;
                    setFormData(prev => ({
                      ...prev,
                      images: newImages
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">CONFIRM YOUR LOCATION</h2>
          </div>
          <div className="p-4">
            <div className="mb-4 border-b">
              <div className="flex mb-2">
                <button
                  type="button"
                  className={`flex-1 py-2 text-center ${activeTab === 'list' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('list')}
                >
                  LIST
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 text-center ${activeTab === 'current' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('current')}
                >
                  CURRENT LOCATION
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Country">
                <input
                  type="text"
                  value="India"
                  disabled
                  className="w-full p-2 border rounded bg-gray-50"
                />
              </FormField>

              <FormField label="Region">
                <select
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </FormField>
            </div>

            <FormField label="City *" error={errors.city}>
              <select
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select City</option>
                <option value="Port Blair">Port Blair</option>
                <option value="Car Nicobar">Car Nicobar</option>
              </select>
            </FormField>
          </div>
        </div>

        <div className="border rounded">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-medium">REVIEW YOUR DETAILS</h2>
          </div>
          <div className="p-4">
            <div className="flex items-start mb-4">
              <div className="relative w-16 h-16 rounded-full bg-teal-900 flex items-center justify-center mr-3">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                    👤
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <FormField 
                  label="Name" 
                  characterCount={{ current: formData.name.length, max: 30 }}
                >
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    maxLength={30}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </FormField>
              </div>
            </div>

            <FormField label="Your phone number" error={errors.phone}>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91XXXXXXXXXX"
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="p-6 border-t">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Post now
        </button>
      </div>

      {showSuccessPopup && <SuccessPopup />}
    </form>
  );
};

export default AdForm;