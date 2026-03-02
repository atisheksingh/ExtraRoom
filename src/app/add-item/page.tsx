"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStorage } from '@/context/StorageContext';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, ChevronRight, Check, Shirt, Laptop, Trophy, Book, Sofa, Package } from 'lucide-react';

const CATEGORIES = ['Clothing', 'Electronics', 'Sports', 'Books', 'Furniture', 'Other'];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Clothing': <Shirt className="w-8 h-8 mb-2 mx-auto" />,
  'Electronics': <Laptop className="w-8 h-8 mb-2 mx-auto" />,
  'Sports': <Trophy className="w-8 h-8 mb-2 mx-auto" />,
  'Books': <Book className="w-8 h-8 mb-2 mx-auto" />,
  'Furniture': <Sofa className="w-8 h-8 mb-2 mx-auto" />,
  'Other': <Package className="w-8 h-8 mb-2 mx-auto" />,
};
const TIME_SLOTS = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

export default function AddItemPage() {
  const router = useRouter();
  const { addItem } = useStorage();
  const { user } = useAuth();

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    value: 2000,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scheduledPickupDate, setScheduledPickupDate] = useState<string>('');
  const [scheduledPickupTime, setScheduledPickupTime] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  // Get current month & year for calendar
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    setScheduledPickupDate(selected.toISOString().split('T')[0]);
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      let imageUrl = '/images/cardboard-boxes.png';
      if (file && user && storage) {
        const path = `items/${user.uid}/${Date.now()}_${file.name}`;
        const sRef = storageRef(storage, path);
        const snap = await uploadBytes(sRef, file);
        imageUrl = await getDownloadURL(snap.ref);
      } else if (file && user && !storage) {
        console.warn('Firebase Storage not available; skipping image upload.');
      }

      await addItem({
        name: formData.name,
        category: formData.category,
        value: formData.value,
        imageUrl,
        scheduledPickupDate,
        scheduledPickupTime,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to add item:', err);
    } finally {
      setUploading(false);
    }
  };

  const canProceed = {
    1: formData.name.trim() !== '' && formData.value > 0,
    2: preview !== null && formData.category !== '',
    3: scheduledPickupDate && scheduledPickupTime,
    4: true,
  };

  const stepLabels = ['Details', 'Photo & Category', 'Pickup', 'Confirm'];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-12">
            {stepLabels.map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;

              return (
                <div key={stepNum} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isCompleted
                      ? 'bg-orange-500 text-white'
                      : isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                    {label}
                  </span>
                  {stepNum < stepLabels.length && (
                    <div className={`flex-1 h-1 mx-4 ${isCompleted ? 'bg-orange-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column: Form Fields */}
            <div className="col-span-2 space-y-6">
              {/* Step 1: Details */}
              {currentStep === 1 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
                  <p className="text-slate-600 mb-6">Provide basic details about your item</p>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold">Item Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Winter Jackets"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value" className="text-sm font-semibold">Declared Value (₹)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                        className="mt-2"
                      />
                      <p className="text-xs text-slate-500 mt-2">Used for insurance coverage calculations</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 2: Photo & Category */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Upload Item Photo</h2>
                    <p className="text-slate-600 mb-6">Help us identify your item during storage</p>
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 bg-orange-50 text-center relative hover:bg-orange-100 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="file-upload"
                      />
                      <Upload className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 pointer-events-none">Upload Item Photo</h3>
                      <p className="text-sm text-slate-600 mb-4 pointer-events-none">
                        Drag & drop or <span className="text-orange-500">browse</span> from your device
                      </p>
                      <p className="text-xs text-slate-500 pointer-events-none">Supported: JPG, PNG, HEIC (Max 10MB)</p>
                      {preview && (
                        <div className="mt-4 relative z-10 pointer-events-none">
                          <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded mx-auto border-2 border-orange-200" />
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Select Category</h2>
                    <div className="grid grid-cols-3 gap-4">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`p-4 rounded-lg border-2 text-center transition ${formData.category === cat
                            ? 'border-orange-500 bg-orange-50 text-orange-600 font-semibold'
                            : 'border-gray-200 bg-white text-slate-600 hover:border-gray-300'
                            }`}
                        >
                          <div className={`transition-colors ${formData.category === cat ? 'text-orange-500' : 'text-slate-500'}`}>
                            {CATEGORY_ICONS[cat]}
                          </div>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 3: Pickup Scheduling */}
              {currentStep === 3 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-2">Schedule Pickup</h2>
                  <p className="text-slate-600 mb-6">Choose your preferred pickup date and time</p>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-semibold">Select Date</Label>
                      <div className="mt-4 p-4 border rounded-lg bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">
                            {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1))} className="px-2 py-1 hover:bg-gray-200 rounded">←</button>
                            <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1))} className="px-2 py-1 hover:bg-gray-200 rounded">→</button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-600 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day}>{day}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: getFirstDayOfMonth(calendarDate) }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: getDaysInMonth(calendarDate) }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isSelected = scheduledPickupDate === dateStr;
                            return (
                              <button
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                className={`p-2 rounded text-sm font-medium ${isSelected
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-white border border-gray-200 hover:border-orange-300'
                                  }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {scheduledPickupDate && (
                      <div>
                        <Label className="text-sm font-semibold">Available Slots</Label>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setScheduledPickupTime(slot)}
                              className={`p-3 rounded-lg border-2 text-center font-semibold transition ${scheduledPickupTime === slot
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-200 bg-white text-slate-600 hover:border-orange-300'
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Step 4: Confirm */}
              {currentStep === 4 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Confirm Your Item</h2>
                  <div className="space-y-4 bg-slate-50 p-6 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Item Name:</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Category:</span>
                      <span className="font-semibold">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Declared Value:</span>
                      <span className="font-semibold">₹{formData.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pickup Date:</span>
                      <span className="font-semibold">{scheduledPickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pickup Time:</span>
                      <span className="font-semibold">{scheduledPickupTime}</span>
                    </div>
                    {preview && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Photo:</span>
                        <img src={preview} alt="Item" className="h-10 w-10 object-cover rounded" />
                      </div>
                    )}
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-slate-700">
                      <strong>Pickup Information:</strong> Our driver will arrive within the selected 30-minute window. Please have your item ready.
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column: Summary */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Pickup Information</h3>
                <div className="space-y-3 text-sm">
                  {scheduledPickupDate && (
                    <>
                      <div>
                        <span className="text-slate-600">Date:</span>
                        <p className="font-semibold">{scheduledPickupDate}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Time:</span>
                        <p className="font-semibold">{scheduledPickupTime || 'Not selected'}</p>
                      </div>
                    </>
                  )}
                  <p className="text-slate-600 text-xs pt-4">
                    Our driver will arrive within the selected 30-minute window. Please ensure your item is ready for pickup.
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!canProceed[currentStep as keyof typeof canProceed]}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={uploading}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      {uploading ? 'Submitting...' : 'Submit'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
