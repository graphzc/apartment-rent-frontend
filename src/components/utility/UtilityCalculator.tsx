import React, { useState } from "react";
import { formatPrice } from "@/utils/utilityCalculator";

interface UtilityCalculatorProps {
  plumbingUnitPrice?: number;
  electricityUnitPrice?: number;
  defaultPlumbingPrice?: number;
  defaultElectricityPrice?: number;
  latestPlumbingUsage?: number;
  latestElectricityUsage?: number;
}

export default function UtilityCalculator({
  plumbingUnitPrice,
  electricityUnitPrice,
  defaultPlumbingPrice = 18,
  defaultElectricityPrice = 5,
  latestPlumbingUsage = 0,
  latestElectricityUsage = 0,
}: UtilityCalculatorProps) {
  const [plumbingUsage, setPlumbingUsage] = useState<number>(
    latestPlumbingUsage || 0
  );
  const [electricityUsage, setElectricityUsage] = useState<number>(
    latestElectricityUsage || 0
  );

  const [customPlumbingPrice, setCustomPlumbingPrice] = useState<number>(
    plumbingUnitPrice || defaultPlumbingPrice
  );
  const [customElectricityPrice, setCustomElectricityPrice] = useState<number>(
    electricityUnitPrice || defaultElectricityPrice
  );

  // latest - current
  const plumbingCost =
    plumbingUsage * customPlumbingPrice -
    latestPlumbingUsage * (plumbingUnitPrice || defaultPlumbingPrice);

  const electricityCost =
    electricityUsage * customElectricityPrice -
    latestElectricityUsage * (electricityUnitPrice || defaultElectricityPrice);

  const totalCost = plumbingCost + electricityCost;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        เครื่องคำนวณค่าสาธารณูปโภค
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Water Section */}
        <div className="space-y-3">
          <h4 className="font-medium text-blue-600">ค่าน้ำประปา</h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ราคาต่อหน่วย (บาท)
            </label>
            <input
              type="number"
              value={customPlumbingPrice}
              onChange={(e) => setCustomPlumbingPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              จำนวนหน่วยปัจจุบัน
            </label>
            <input
              type="number"
              value={plumbingUsage}
              onChange={(e) => setPlumbingUsage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกจำนวนหน่วย"
              min={0}
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="text-sm text-blue-700">
              <strong>ค่าน้ำ:</strong> {formatPrice(plumbingCost)} บาท
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {plumbingUsage} หน่วย × {formatPrice(customPlumbingPrice)}{" "}
              บาท/หน่วย
            </div>
          </div>
        </div>

        {/* Electricity Section */}
        <div className="space-y-3">
          <h4 className="font-medium text-orange-600">ค่าไฟฟ้า</h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ราคาต่อหน่วย (บาท)
            </label>
            <input
              type="number"
              value={customElectricityPrice}
              onChange={(e) =>
                setCustomElectricityPrice(Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              step="0.01"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              จำนวนหน่วยปัจจุบัน
            </label>
            <input
              type="number"
              value={electricityUsage}
              onChange={(e) => setElectricityUsage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="กรอกจำนวนหน่วย"
              min={0}
            />
          </div>
          <div className="bg-orange-50 p-3 rounded-md">
            <div className="text-sm text-orange-700">
              <strong>ค่าไฟ:</strong> {formatPrice(electricityCost)} บาท
            </div>
            <div className="text-xs text-orange-600 mt-1">
              {electricityUsage} หน่วย × {formatPrice(customElectricityPrice)}{" "}
              บาท/หน่วย
            </div>
          </div>
        </div>
      </div>

      {/* Total Section */}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className="bg-green-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-800">
              ยอดรวมทั้งหมด:
            </span>
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(totalCost)} บาท
            </span>
          </div>
          <div className="text-sm text-green-700 mt-2">
            ค่าน้ำ {formatPrice(plumbingCost)} + ค่าไฟ{" "}
            {formatPrice(electricityCost)} = {formatPrice(totalCost)} บาท
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setPlumbingUsage(0);
            setElectricityUsage(0);
            setCustomPlumbingPrice(plumbingUnitPrice || defaultPlumbingPrice);
            setCustomElectricityPrice(
              electricityUnitPrice || defaultElectricityPrice
            );
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          รีเซ็ต
        </button>
      </div>
    </div>
  );
}
