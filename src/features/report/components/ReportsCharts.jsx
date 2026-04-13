import React from 'react';
import Chart from '../../../components/ui/Chart';

const ReportsCharts = ({ typeChartData, scheduleChartData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <Chart
          type="pie"
          data={typeChartData}
          title="Report Types Distribution"
          height={300}
          showTooltip={true}
        />
      </div>
      <div className="card">
        <Chart
          type="bar"
          data={scheduleChartData}
          title="Schedule Frequency"
          height={300}
          dataKey="count"
          showTooltip={true}
          showGrid={true}
        />
      </div>
    </div>
  );
};

export default ReportsCharts;
