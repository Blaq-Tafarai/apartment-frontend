import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Sparkline from './Sparkline';
import Skeleton from '../../../components/ui/Skeleton';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend = 'up', 
  icon: Icon, 
  sparklineData,
  isLoading = false,
  variant = 'default',
  className = ''
}) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000) return `$${(val/1000).toFixed(1)}k`;
      return `$${val.toLocaleString()}`;
    }
    return val;
  };

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative card overflow-hidden hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 hover:rotate-[0.5deg] ${className}`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 blur-xl opacity-60" />
      
      <div className="relative flex items-start justify-between p-6 h-full min-h-[140px]">
        <div className="flex-1 space-y-2">
          <p className="text-text-secondary text-sm font-semibold tracking-wide uppercase">{title}</p>
          <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-text-primary to-text-primary-dark bg-clip-text text-transparent drop-shadow-lg">
            {formatValue(value)}
          </h3>
          
          {change && (
            <div className={`flex items-center gap-1.5 text-sm font-bold rounded-full px-2 py-1 ${
              trend === 'up' 
                ? 'bg-success/10 text-success ring-1 ring-success/20' 
                : 'bg-danger/10 text-danger ring-1 ring-danger/20'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 animate-pulse" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}</span>
            </div>
          )}
          
          {sparklineData && (
            <div className="mt-1 pt-1 border-t border-border/50">
              <Sparkline 
                data={sparklineData} 
                color={trend === 'up' ? 'rgb(var(--success))' : 'rgb(var(--danger))'} 
              />
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="relative w-16 h-16 flex-shrink-0 ml-4 group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-xl -z-10 animate-pulse" />
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary-dark to-primary rounded-2xl flex items-center justify-center shadow-2xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-500 shadow-primary/25">
              <Icon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

