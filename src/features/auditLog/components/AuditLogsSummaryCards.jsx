import React from 'react';
import { Activity, CheckCircle, Edit, Trash2, Users, Database } from 'lucide-react';

const AuditLogsSummaryCards = ({ auditLogs }) => {
  const totalLogs = auditLogs.length;
  const createCount = auditLogs.filter(log => log.action === 'CREATE').length;
  const updateCount = auditLogs.filter(log => log.action === 'UPDATE').length;
  const deleteCount = auditLogs.filter(log => log.action === 'DELETE').length;
  const activeUsers = new Set(auditLogs.map(log => log.userId)).size;
  const entityTypes = new Set(auditLogs.map(log => log.entityType)).size;

  const cards = [
    {
      icon: Activity,
      label: 'Total Logs',
      value: totalLogs,
      color: 'text-blue-500'
    },
    {
      icon: CheckCircle,
      label: 'CREATE',
      value: createCount,
      color: 'text-green-500'
    },
    {
      icon: Edit,
      label: 'UPDATE',
      value: updateCount,
      color: 'text-blue-500'
    },
    {
      icon: Trash2,
      label: 'DELETE',
      value: deleteCount,
      color: 'text-red-500'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: activeUsers,
      color: 'text-purple-500'
    },
    {
      icon: Database,
      label: 'Entities',
      value: entityTypes,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="card flex items-center gap-3">
          <card.icon className={`w-6 h-6 ${card.color}`} />
          <div>
            <p className="text-text-secondary text-sm">{card.label}</p>
            <p className="text-2xl font-bold text-text-primary">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditLogsSummaryCards;
