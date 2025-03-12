import { useState } from 'react';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    basicLabel: {
      paperType: 'waterproof', // 銅板防水貼紙
      size: 'standard', // 90mm*120mm * 2
      shape: 'rectangle', // 矩形
      coating: 'glossy', // 亮膜
    },
    specialProcessing: {
      goldStamp: false,
      embossing: false,
      dottedLine: false,
      variableCode: false
    },
    printingSecurity: {
      laserScratch: false,
      tmaPattern: false,
      visualCode: false,
      antiCopyPattern: false,
      invisibleInk: false
    },
    digitalServices: {
      platform: false,
      domainBinding: false,
      codeQuantity: 1000
    },
    certification: {
      blockchainCert: false
    }
  });

  const calculateBasePrice = () => {
    return formData.digitalServices.codeQuantity * 0.5; // 基本標籤費用：每張 $0.5
  };

  const calculateDigitalServicePrice = () => {
    if (!formData.digitalServices.platform) return 0;
    
    let price = 0;
    const quantity = formData.digitalServices.codeQuantity;
    
    // UID 碼費用計算
    let codePrice;
    if (quantity <= 10000) {
      codePrice = 0.2;
    } else if (quantity <= 50000) {
      codePrice = 0.16;
    } else if (quantity <= 100000) {
      codePrice = 0.1;
    } else {
      codePrice = 0.06;
    }
    
    // 平台費用和網域綁定
    if (quantity < 50000) { // 年購買量未達5萬張需收平台費用
      if (formData.digitalServices.platform) price += 1520;
    }
    if (formData.digitalServices.domainBinding) price += 155;
    
    return price + (quantity * codePrice);
  };

  const calculateCertificationPrice = () => {
    return formData.certification.blockchainCert ? formData.digitalServices.codeQuantity * 0.32 : 0;
  };

  const totalPrice = () => {
    return calculateBasePrice() + calculateDigitalServicePrice() + calculateCertificationPrice();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Label Price Calculator</h2>
      
      {/* Basic Label Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Label</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <select
              value={formData.basicLabel.paperType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                basicLabel: {
                  ...prev.basicLabel,
                  paperType: e.target.value
                }
              }))}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="waterproof">Waterproof Paper</option>
            </select>
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">Paper Type</label>
          </div>
          
          <div className="relative">
            <select
              value={formData.basicLabel.size}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                basicLabel: {
                  ...prev.basicLabel,
                  size: e.target.value
                }
              }))}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="standard">90mm*120mm * 2</option>
            </select>
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">Size</label>
          </div>
          
          <div className="relative">
            <select
              value={formData.basicLabel.shape}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                basicLabel: {
                  ...prev.basicLabel,
                  shape: e.target.value
                }
              }))}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="rectangle">Rectangle</option>
              <option value="square">Square</option>
            </select>
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">Shape</label>
          </div>
          
          <div className="relative">
            <select
              value={formData.basicLabel.coating}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                basicLabel: {
                  ...prev.basicLabel,
                  coating: e.target.value
                }
              }))}
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="glossy">Glossy</option>
              <option value="matte">Matte</option>
            </select>
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm">Coating</label>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="number"
            value={formData.digitalServices.codeQuantity}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              digitalServices: {
                ...prev.digitalServices,
                codeQuantity: parseInt(e.target.value) || 0
              }
            }))}
            placeholder="Enter quantity"
            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
          />
          <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
            Order Quantity
          </label>
        </div>
      </div>

      {/* Special Processing Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Special Processing</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.specialProcessing).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  specialProcessing: {
                    ...prev.specialProcessing,
                    [key]: !prev.specialProcessing[key]
                  }
                }))}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">
                {{
                  goldStamp: 'Gold/Silver Stamping',
                  embossing: 'Embossing',
                  dottedLine: 'Dotted Line',
                  variableCode: 'Variable Code (Digital Services Required)'
                }[key]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Printing Security Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Printing Security</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.printingSecurity).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  printingSecurity: {
                    ...prev.printingSecurity,
                    [key]: !prev.printingSecurity[key]
                  }
                }))}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">
                {{
                  laserScratch: 'Laser Scratch',
                  tmaPattern: 'TMA Pattern',
                  visualCode: 'Visual Code',
                  antiCopyPattern: 'Anti-Copy Pattern',
                  invisibleInk: 'Invisible Ink'
                }[key]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Digital Services Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Digital Services</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.digitalServices.platform}
              onChange={() => setFormData(prev => ({
                ...prev,
                digitalServices: {
                  ...prev.digitalServices,
                  platform: !prev.digitalServices.platform
                }
              }))}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Platform Service</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.digitalServices.domainBinding}
              onChange={() => setFormData(prev => ({
                ...prev,
                digitalServices: {
                  ...prev.digitalServices,
                  domainBinding: !prev.digitalServices.domainBinding
                }
              }))}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Domain Binding</span>
          </label>
        </div>
      </div>

      {/* Certification Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Certification Services</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.certification.blockchainCert}
              onChange={() => setFormData(prev => ({
                ...prev,
                certification: {
                  ...prev.certification,
                  blockchainCert: !prev.certification.blockchainCert
                }
              }))}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Blockchain Certification</span>
          </label>
        </div>
      </div>

      {/* Total Price Display */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Price</h3>
        <p className="text-3xl font-bold text-blue-600">${totalPrice().toFixed(2)}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>Base Price: ${calculateBasePrice().toFixed(2)}</p>
          <p>Digital Services: ${calculateDigitalServicePrice().toFixed(2)}</p>
          <p>Certification: ${calculateCertificationPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;