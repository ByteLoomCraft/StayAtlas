import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Chart = () => {
  const data = [
    { name: "Jan", totalBookings: 4000, monthlyUsers: 2400 },
    { name: "Feb", totalBookings: 3000, monthlyUsers: 1398 },
    { name: "Mar", totalBookings: 2000, monthlyUsers: 9800 },
    { name: "Apr ", totalBookings: 2780, monthlyUsers: 3908 },
    { name: "May ", totalBookings: 1890, monthlyUsers: 4800 },
    { name: "Jun", totalBookings: 2390, monthlyUsers: 3800 },
    { name: "Jul", totalBookings: 3490, monthlyUsers: 4300 },
    { name: "Aug", totalBookings: 3732, monthlyUsers: 4600 },
    { name: "Sep", totalBookings: 4200, monthlyUsers: 4800 },
    { name: "Oct", totalBookings: 5000, monthlyUsers: 5300 },
    { name: "Nov", totalBookings: 7275, monthlyUsers: 9887 },
    { name: "Dec", totalBookings: 8678, monthlyUsers: 9948 },
    
  ];

  return (
    <div className="w-full max-w-3xl p-6 bg-black" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotalBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMonthlyUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <CartesianGrid stroke="#444" />
          <Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: 'none' }} />
          <Area type="monotone" dataKey="totalBookings" stroke="#8884d8" fill="url(#colorTotalBookings)" />
          <Area type="monotone" dataKey="monthlyUsers" stroke="#82ca9d" fill="url(#colorMonthlyUsers)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;