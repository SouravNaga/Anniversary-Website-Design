import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Award, Edit2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { LoveConfig } from '../types';

interface AnniversaryCounterProps {
  config: LoveConfig;
  onUpdateConfig: (newConfig: LoveConfig) => void;
}

export default function AnniversaryCounter({ config, onUpdateConfig }: AnniversaryCounterProps) {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [partner1, setPartner1] = useState(config.partner1);
  const [partner2, setPartner2] = useState(config.partner2);
  const [anniversaryDate, setAnniversaryDate] = useState(config.anniversaryDate);

  useEffect(() => {
    setPartner1(config.partner1);
    setPartner2(config.partner2);
    setAnniversaryDate(config.anniversaryDate);
  }, [config]);

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(config.anniversaryDate);
      const now = new Date();
      let diffMs = now.getTime() - anniversary.getTime();

      // If date is in the future
      if (diffMs < 0) {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 });
        return;
      }

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let years = now.getFullYear() - anniversary.getFullYear();
      let months = now.getMonth() - anniversary.getMonth();
      let days = now.getDate() - anniversary.getDate();

      if (days < 0) {
        months -= 1;
        // get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeLeft({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.anniversaryDate]);

  const handleSave = () => {
    onUpdateConfig({
      partner1: partner1.trim() || 'Alex',
      partner2: partner2.trim() || 'Sam',
      anniversaryDate: anniversaryDate || new Date().toISOString().split('T')[0],
    });
    setIsEditing(false);
  };

  // Fun milestones
  const getMilestoneInfo = () => {
    const currentDays = timeLeft.totalDays;
    const standardMilestones = [100, 365, 500, 1000, 1500, 2000, 3000, 5000];
    const nextMilestone = standardMilestones.find(m => m > currentDays) || (Math.floor(currentDays / 1000) + 1) * 1000;
    const prevMilestone = standardMilestones.reverse().find(m => m <= currentDays) || 0;
    
    const progress = Math.min(100, ((currentDays - prevMilestone) / (nextMilestone - prevMilestone)) * 100);
    const daysRemaining = nextMilestone - currentDays;

    return { nextMilestone, progress, daysRemaining };
  };

  const milestoneInfo = getMilestoneInfo();

  return (
    <div className="space-y-8" id="anniversary-dashboard">
      {/* Header section with names */}
      <div className="text-center py-4">
        {isEditing ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 max-w-md mx-auto space-y-4"
          >
            <h3 className="font-serif text-xl text-rose-800 font-semibold mb-2">Edit Relationship Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Partner 1</label>
                <input
                  type="text"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/20 text-sm"
                  placeholder="Partner 1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Partner 2</label>
                <input
                  type="text"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/20 text-sm"
                  placeholder="Partner 2"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Anniversary Date</label>
              <input
                type="date"
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
                className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/20 text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
              >
                <Check size={14} /> Save
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="relative inline-block group">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                {config.partner1}
              </h1>
              <div className="relative">
                <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-500 fill-rose-500 animate-heartPulse" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] md:text-xs font-serif font-bold">L</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                {config.partner2}
              </h1>
            </div>
            
            <p className="mt-4 text-sm text-gray-500 italic flex items-center justify-center gap-2">
              <Calendar size={14} className="text-rose-400" />
              Together since {new Date(config.anniversaryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 p-1.5 text-gray-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Edit anniversary date"
              >
                <Edit2 size={12} />
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Main Counter Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Years', value: timeLeft.years, color: 'from-rose-50 to-pink-50 text-rose-700' },
          { label: 'Months', value: timeLeft.months, color: 'from-pink-50 to-amber-50 text-pink-700' },
          { label: 'Days', value: timeLeft.days, color: 'from-amber-50 to-orange-50 text-amber-700' },
          { label: 'Hours', value: timeLeft.hours, color: 'from-orange-50 to-red-50 text-orange-700' },
          { label: 'Minutes', value: timeLeft.minutes, color: 'from-red-50 to-rose-50 text-red-700' },
          { label: 'Seconds', value: timeLeft.seconds, color: 'from-rose-50 to-purple-50 text-rose-700' },
        ].map((unit, idx) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`bg-gradient-to-br ${unit.color} p-4 md:p-6 rounded-2xl shadow-sm border border-white/40 text-center flex flex-col justify-between`}
          >
            <span className="text-3xl md:text-5xl font-serif font-bold leading-none tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70 mt-2 block">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Big milestone summary card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <Award size={32} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-gray-800">
              We have shared <span className="text-rose-600 font-bold">{timeLeft.totalDays.toLocaleString()}</span> days of adventures together!
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Every day is a gift when shared with you.
            </p>
          </div>
        </div>

        {/* Milestone Tracker progress */}
        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-gray-500">
            <span>Next Milestone: {milestoneInfo.nextMilestone} Days</span>
            <span className="text-rose-600">{milestoneInfo.daysRemaining} days left</span>
          </div>
          <div className="w-full bg-rose-100/50 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${milestoneInfo.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
