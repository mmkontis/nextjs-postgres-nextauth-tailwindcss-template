'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState('basics');
  const [formData, setFormData] = useState({
    organizationName: '',
    tagline: '',
    website: '',
    yearEstablished: '',
    industry: '',
    numberOfEmployees: '',
    logo: null,
    coverPhoto: null,
    targets: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'coverPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, [type]: file }));
    }
  };

  const handleTargetSelection = (target: string) => {
    setFormData(prevData => ({
      ...prevData,
      targets: prevData.targets.includes(target)
        ? prevData.targets.filter(t => t !== target)
        : [...prevData.targets, target]
    }));
  };

  const handleContinue = () => {
    if (step === 'basics') setStep('branding');
    else if (step === 'branding') setStep('targets');
    else if (step === 'targets') setStep('done');
    // Here you would typically validate the form before moving to the next step
  };

  const renderStepContent = () => {
    switch(step) {
      case 'basics':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">Let's start with the basics</h2>
            <p className="text-gray-600 mb-6">Please fill out the following fields in order to continue</p>
            <form className="space-y-4">
              {['organizationName', 'tagline', 'website', 'yearEstablished', 'industry', 'numberOfEmployees'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Input
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                </div>
              ))}
            </form>
          </>
        );
      case 'branding':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">Branding</h2>
            <p className="text-gray-600 mb-6">Upload your organization's logo and cover photo</p>
            <div className="space-y-6">
              {['logo', 'coverPhoto'].map((type) => (
                <div key={type}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {type === 'logo' ? 'Logo (1:1 ratio)' : 'Cover Photo (4:3 ratio)'}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor={`${type}-upload`} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id={`${type}-upload`} name={`${type}-upload`} type="file" className="sr-only" onChange={(e) => handleFileUpload(e, type)} accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 'targets':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">Choose Your Targets</h2>
            <p className="text-gray-600 mb-6">Select the types of opportunities you're interested in</p>
            <div className="space-y-4">
              {['Internships', 'Entry-level jobs', 'Mid-level positions', 'Senior roles', 'Part-time work', 'Freelance projects'].map(target => (
                <div key={target} className="flex items-center">
                  <input
                    type="checkbox"
                    id={target}
                    checked={formData.targets.includes(target)}
                    onChange={() => handleTargetSelection(target)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={target} className="ml-2 block text-sm text-gray-900">
                    {target}
                  </label>
                </div>
              ))}
            </div>
          </>
        );
      case 'done':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">All Set!</h2>
            <p className="text-gray-600 mb-6">Your organization profile has been created successfully.</p>
            <Button onClick={() => console.log('Redirect to dashboard')}>Go to Dashboard</Button>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/2 p-8">
        <div className="mb-8 flex items-center">
          <Link href="/" className="text-sm text-gray-600 hover:underline">← All Organizations</Link>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-sm text-gray-600">New Organization</span>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['basics', 'branding', 'targets', 'done'].map((s, index) => (
              <div key={s} className={`w-1/4 h-1 ${step === s || index < ['basics', 'branding', 'targets', 'done'].indexOf(step) ? 'bg-blue-600' : 'bg-gray-300'} rounded`}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            {['Basics', 'Branding', 'Targets', 'Done'].map(s => (
              <span key={s} className={step.toLowerCase() === s.toLowerCase() ? 'text-blue-600 font-semibold' : 'text-gray-400'}>{s}</span>
            ))}
          </div>
        </div>

        {renderStepContent()}

        {step !== 'done' && (
          <Button onClick={handleContinue} className="mt-6">Continue</Button>
        )}
      </div>

      <div className="w-1/2 bg-blue-100 p-16 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full mr-4"></div>
            <div>
              <h3 className="font-semibold">{formData.organizationName || 'Your Organization'}</h3>
              <p className="text-sm text-gray-500">Organization</p>
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <span className="text-purple-600">About</span>
            <span>Opportunities</span>
            <span>Events</span>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium">Industry</p>
            <p className="text-sm text-gray-600">{formData.industry || 'Not specified'}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium">Size</p>
            <p className="text-sm text-gray-600">{formData.numberOfEmployees || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">About {formData.organizationName || 'Your Organization'}</p>
            <p className="text-sm text-gray-600">
              {formData.tagline || 'Your organization description will appear here.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}