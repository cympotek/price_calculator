import { useState } from 'react';

const PriceCalculator = () => {
  const [quantity, setQuantity] = useState(1000);
  const [specialProcessing, setSpecialProcessing] = useState({
    goldStamping: false,
    embossing: false,
    dottedLine: false,
    variableCode: false,
    laserScratch: false,
    tmaPattern: false,
    visualCode: false,
    antiCopyPattern: false,
    invisibleInk: false
  });
  const [digitalService, setDigitalService] = useState({
    enabled: false,
    platformFee: false,
    domainBinding: false
  });
  const [certification, setCertification] = useState(false);

  const calculateBasePrice = () => {
    return quantity * 0.5; // 基本标签费用：每张 $0.5
  };

  const calculateDigitalServicePrice = () => {
    if (!digitalService.enabled) return 0;
    
    let price = 0;
    // 平台费用
    if (digitalService.platformFee) price += 1520;
    // 特定网域绑定
    if (digitalService.domainBinding) price += 155;
    
    // UID 码费用计算
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
    
    // 如果年购买量超过5万张，免平台费用
    if (quantity >= 50000 && digitalService.platformFee) {
      price -= 1520;
    }
    
    return price + (quantity * codePrice);
  };

  const calculateCertificationPrice = () => {
    return certification ? quantity * 0.32 : 0;
  };

  const totalPrice = () => {
    return calculateBasePrice() + calculateDigitalServicePrice() + calculateCertificationPrice();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Wine Label Purchase Calculator</h2>
      
      {/* Quantity Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Order Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Special Processing Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Special Processing</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(specialProcessing).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setSpecialProcessing(prev => ({ ...prev, [key]: !prev[key] }))}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">
                {{
                  goldStamping: 'Gold/Silver Stamping',
                  embossing: 'Embossing',
                  dottedLine: 'Dotted Line',
                  variableCode: 'Variable Code',
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

      {/* Digital Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Digital Services</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={digitalService.enabled}
              onChange={() => setDigitalService(prev => ({ ...prev, enabled: !prev.enabled }))}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Enable UID Digital Anti-counterfeiting Service</span>
          </label>
          {digitalService.enabled && (
            <div className="ml-6 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={digitalService.platformFee}
                  onChange={() => setDigitalService(prev => ({ ...prev, platformFee: !prev.platformFee }))}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">Platform Fee ($1,520/year)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={digitalService.domainBinding}
                  onChange={() => setDigitalService(prev => ({ ...prev, domainBinding: !prev.domainBinding }))}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">Domain Binding ($155)</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Certification Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Certification Services</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={certification}
            onChange={() => setCertification(!certification)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Certification Mark + Blockchain ($0.32/piece)</span>
        </label>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Price Calculation</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Basic Label Cost:</span>
            <span>${calculateBasePrice().toFixed(2)}</span>
          </div>
          {digitalService.enabled && (
            <div className="flex justify-between">
              <span>Digital Service Cost:</span>
              <span>${calculateDigitalServicePrice().toFixed(2)}</span>
            </div>
          )}
          {certification && (
            <div className="flex justify-between">
              <span>Certification Service Cost:</span>
              <span>${calculateCertificationPrice().toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;