import React from 'react';
import Chart from './Chart';

// Example data for different chart types
const sampleData = [
  { name: 'Jan', value: 400, sales: 240, profit: 160 },
  { name: 'Feb', value: 300, sales: 139, profit: 221 },
  { name: 'Mar', value: 200, sales: 980, profit: 229 },
  { name: 'Apr', value: 278, sales: 390, profit: 200 },
  { name: 'May', value: 189, sales: 480, profit: 218 },
  { name: 'Jun', value: 239, sales: 380, profit: 250 },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
  { name: 'Other', value: 100 },
];

const radarData = [
  { name: 'Speed', value: 120 },
  { name: 'Reliability', value: 98 },
  { name: 'Comfort', value: 86 },
  { name: 'Safety', value: 99 },
  { name: 'Design', value: 85 },
];

const ChartExample = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Chart Component Examples</h1>

      {/* Pie Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
        <Chart
          type="pie"
          data={pieData}
          height={300}
          showTooltip={true}
          theme="vibrant"
          animate={true}
        />
      </div>

      {/* Donut Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Donut Chart</h2>
        <Chart
          type="donut"
          data={pieData}
          height={300}
          showTooltip={true}
        />
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <Chart
          type="bar"
          data={sampleData}
          height={300}
          dataKey="value"
          showTooltip={true}
          showGrid={true}
        />
      </div>

      {/* Line Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
        <Chart
          type="line"
          data={sampleData}
          height={300}
          dataKey="value"
          showTooltip={true}
          showGrid={true}
        />
      </div>

      {/* Area Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Area Chart</h2>
        <Chart
          type="area"
          data={sampleData}
          height={300}
          dataKey="value"
          showTooltip={true}
          showGrid={true}
        />
      </div>

      {/* Composed Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Composed Chart (Bar + Line)</h2>
        <Chart
          type="composed"
          data={sampleData}
          height={300}
          dataKey="sales"
          showTooltip={true}
          showGrid={true}
        />
      </div>

      {/* Scatter Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Scatter Chart</h2>
        <Chart
          type="scatter"
          data={sampleData}
          height={300}
          dataKey="profit"
          xAxisKey="name"
          showTooltip={true}
          showGrid={true}
        />
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Radar Chart</h2>
        <Chart
          type="radar"
          data={radarData}
          height={300}
          dataKey="value"
          showTooltip={true}
        />
      </div>

      {/* Radial Bar Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Radial Bar Chart</h2>
        <Chart
          type="radialBar"
          data={pieData}
          height={300}
          dataKey="value"
          showTooltip={true}
        />
      </div>
    </div>
  );
};

export default ChartExample;
