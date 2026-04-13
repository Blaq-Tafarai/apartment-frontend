import React, { useRef, useMemo, useId } from 'react';
import html2canvas from 'html2canvas';
import Skeleton from './Skeleton';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,
} from 'recharts';

// Custom tooltip component moved outside to prevent recreation
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Enhanced color palettes with gradients and themes
const THEMES = {
  default: {
    colors: [
      '#3B82F6', // primary blue
      '#00C49F', // teal
      '#FFBB28', // yellow
      '#FF8042', // orange
      '#8884d8', // purple
      '#82ca9d', // green
      '#ffc658', // gold
      '#ff7c7c', // red
      '#8dd1e1', // light blue
      '#d084d0', // pink
    ],
    gradients: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ]
  },
  dark: {
    colors: [
      '#60A5FA', // light blue
      '#34D399', // light green
      '#FBBF24', // light yellow
      '#FB923C', // light orange
      '#A78BFA', // light purple
      '#86EFAC', // light green
      '#FDE047', // light gold
      '#FCA5A5', // light red
      '#7DD3FC', // light blue
      '#F0ABFC', // light pink
    ],
    gradients: [
      'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      'linear-gradient(135deg, #be185d 0%, #dc2626 100%)',
      'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
      'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
      'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
    ]
  },
  vibrant: {
    colors: [
      '#FF6B6B', // coral
      '#4ECDC4', // turquoise
      '#45B7D1', // sky blue
      '#96CEB4', // sage
      '#FFEAA7', // cream
      '#DDA0DD', // plum
      '#98D8C8', // mint
      '#F7DC6F', // lemon
      '#BB8FCE', // lavender
      '#85C1E9', // powder blue
    ],
    gradients: [
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ]
  }
};

const Chart = React.forwardRef(({
  type = 'bar',
  data = [],
  width = '100%',
  height = 300,
  colors,
  theme = 'default',
  dataKey,
  dataKeys = [], // for multiple series
  xAxisKey = 'name',
  yAxisKey = 'value',
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  title,
  className = '',
  animate = true, // default to true for better UX
  customTooltip,
  legendPosition = 'bottom',
  loading = false,
  exportable = false,
  ariaLabel = 'Chart',
  showShadow = true,
  roundedCorners = true,
  fontSize = '14px',
  fontFamily = 'Inter, sans-serif',
  ...props
}, ref) => {
  // Select theme colors
  const selectedTheme = THEMES[theme] || THEMES.default;
  const chartColors = useMemo(() => colors || selectedTheme.colors, [colors, selectedTheme.colors]);
  const chartRef = useRef(null);
  const titleId = useId();

  const handleExport = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = `${title || 'chart'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    const axisStyle = {
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: '#6B7280',
    };

    const gridStyle = {
      stroke: '#E5E7EB',
      strokeDasharray: '2 2',
    };

    switch (type) {
      case 'pie':
        return (
          <RechartsPieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              dataKey={dataKey || 'value'}
              animationBegin={animate ? 0 : undefined}
              {...props}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <Tooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} />}
          </RechartsPieChart>
        );

      case 'donut':
        return (
          <RechartsPieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              innerRadius={40}
              dataKey={dataKey || 'value'}
              animationBegin={animate ? 0 : undefined}
              {...props}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <Tooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} />}
          </RechartsPieChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || yAxisKey]).map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                animationBegin={animate ? 0 : undefined}
                {...props}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || yAxisKey]).map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={3}
                dot={{ fill: chartColors[index % chartColors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartColors[index % chartColors.length], strokeWidth: 2, fill: '#fff' }}
                animationBegin={animate ? 0 : undefined}
                {...props}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || yAxisKey]).map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                fill={chartColors[index % chartColors.length]}
                fillOpacity={0.3}
                animationBegin={animate ? 0 : undefined}
                {...props}
              />
            ))}
          </AreaChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            {(dataKeys.length > 0 ? dataKeys : [dataKey || yAxisKey]).map((key, index) => (
              <React.Fragment key={key}>
                <Bar
                  dataKey={key}
                  fill={chartColors[index % chartColors.length]}
                  animationBegin={animate ? 0 : undefined}
                />
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke={chartColors[(index + 1) % chartColors.length]}
                  strokeWidth={2}
                  animationBegin={animate ? 0 : undefined}
                />
              </React.Fragment>
            ))}
          </ComposedChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            <Scatter
              dataKey={dataKey || yAxisKey}
              fill={chartColors[0]}
              {...props}
            />
          </ScatterChart>
        );

      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis />
            <Radar
              name={dataKey || yAxisKey}
              dataKey={dataKey || yAxisKey}
              stroke={chartColors[0]}
              fill={chartColors[0]}
              fillOpacity={0.3}
              {...props}
            />
            {showTooltip && <Tooltip />}
          </RadarChart>
        );

      case 'radialBar':
        return (
          <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={data}>
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey={dataKey || yAxisKey}
              fill={chartColors[0]}
              {...props}
            />
            {showLegend && <Legend />}
            {showTooltip && <Tooltip />}
          </RadialBarChart>
        );

      default:
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridStyle} />}
            <XAxis dataKey={xAxisKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            {showTooltip && (customTooltip ? <Tooltip content={customTooltip} /> : <CustomTooltip />)}
            {showLegend && <Legend verticalAlign={legendPosition} wrapperStyle={{ fontFamily: fontFamily, fontSize: fontSize }} />}
            <Bar dataKey={dataKey || yAxisKey} fill={chartColors[0]} />
          </BarChart>
        );
    }
  };

  if (loading) {
    return (
      <div className={`chart-container ${className}`} aria-label={`${ariaLabel} loading`}>
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-text-primary">{title}</h3>
        )}
        <Skeleton variant="rectangular" height={height} />
      </div>
    );
  }

  return (
    <div className={`chart-container ${className}`} ref={chartRef} aria-label={ariaLabel}>
      {(title || exportable) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          )}
          {exportable && (
            <button
              onClick={handleExport}
              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark"
              aria-label="Export chart"
            >
              Export
            </button>
          )}
        </div>
      )}
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
