import React, { useMemo } from 'react';
import Chart from '../../../components/ui/Chart';

const AuditLogsCharts = ({ auditLogs }) => {
  const actionChartData = useMemo(() => {
    const actionCounts = {};
    auditLogs.forEach(log => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });
    return Object.entries(actionCounts).map(([name, value]) => ({ name, value }));
  }, [auditLogs]);

  const entityChartData = useMemo(() => {
    const entityCounts = {};
    auditLogs.forEach(log => {
      entityCounts[log.entity] = (entityCounts[log.entity] || 0) + 1;
    });
    return Object.entries(entityCounts).map(([name, value]) => ({ name, value }));
  }, [auditLogs]);

  const userActivityData = useMemo(() => {
    const userCounts = {};
    auditLogs.forEach(log => {
      const userName = log.user?.name || 'System';
      userCounts[userName] = (userCounts[userName] || 0) + 1;
    });
    return Object.entries(userCounts).map(([name, count]) => ({ name, count })).slice(0, 10);
  }, [auditLogs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card">
        <Chart
          type="pie"
          data={actionChartData}
          title="Actions Distribution"
          height={250}
          showTooltip={true}
        />
      </div>
      <div className="card">
        <Chart
          type="pie"
          data={entityChartData}
          title="Entity Types"
          height={250}
          showTooltip={true}
        />
      </div>
      <div className="card">
        <Chart
          type="bar"
          data={userActivityData}
          title="Top Active Users"
          height={250}
          dataKey="count"
          showTooltip={true}
          showGrid={true}
        />
      </div>
    </div>
  );
};

export default AuditLogsCharts;
