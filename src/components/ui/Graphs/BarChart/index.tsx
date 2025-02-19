// components/charts/BarChart.tsx
import { useMemo, useRef, useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { Box, Typography, useTheme } from '@mui/material';

type BarChartProps<T> = {
  data: T[];
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxisLabel: string;
  yAxisLabel: string;
  xKey: keyof T;
  yKey: keyof T;
  barFill?: string;
  title?: string;
  aspectRatio?: number;
  minHeight?: number;
};

// Inner component that renders the actual chart
function BarChartContent<T>({
  data,
  width,
  height,
  margin = { top: 40, right: 30, bottom: 80, left: 60 }, // Increased bottom margin to 80px
  xAxisLabel,
  yAxisLabel,
  xKey,
  yKey,
  barFill,
  title,
}: BarChartProps<T> & { width: number; height: number }) {
  const theme = useTheme();

  // Responsive sizes
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  // Type assertion helpers
  const getXValue = (d: T) => String(d[xKey]);
  const getYValue = (d: T) => Number(d[yKey]);

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, innerWidth],
        domain: data.map(getXValue),
        padding: 0.3,
      }),
    [data, innerWidth, xKey]
  );

  const yScale = useMemo(() => {
    const maxY = Math.max(...data.map(getYValue));
    return scaleLinear<number>({
      range: [innerHeight, 0],
      domain: [0, maxY * 1.1], // Add 10% padding on top
      nice: true,
    });
  }, [data, innerHeight, yKey]);

  // Generate Y-axis ticks based on available height
  const yTickCount = Math.max(2, Math.floor(innerHeight / 50));

  // Dynamic rotation of X-axis labels when space is tight
  const shouldRotateLabels = xScale.bandwidth() < 40;
  
  // Responsive font sizing based on available width
  const getFontSize = (baseSize: number) => {
    if (width < 300) return baseSize - 2;
    if (width < 500) return baseSize - 1;
    return baseSize;
  };

  return (
    <>
      {title && (
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            mb: 1,
            fontSize: getFontSize(18)
          }}
        >
          {title}
        </Typography>
      )}
      <svg width={width} height={height} overflow="visible">
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
            const barX = xScale(getXValue(d)) ?? 0;
            const barY = innerHeight - barHeight;

            return (
              <Bar
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={barFill || theme.palette.primary.main}
                rx={2}
              />
            );
          })}

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickLabelProps={() => ({
              fill: theme.palette.text.primary,
              fontSize: getFontSize(12),
              textAnchor: shouldRotateLabels ? 'end' : 'middle',
              transform: shouldRotateLabels ? 'rotate(-45)' : undefined,
              dx: shouldRotateLabels ? -5 : 0,
              dy: shouldRotateLabels ? 0 : 5,
            })}
            label={xAxisLabel}
            labelProps={{
              fill: theme.palette.text.primary,
              fontSize: getFontSize(14),
              textAnchor: 'middle',
              dy: shouldRotateLabels ? 55 : 15, // Increased distance
            }}
          />

          <AxisLeft
            scale={yScale}
            numTicks={yTickCount}
            tickLabelProps={() => ({
              fill: theme.palette.text.primary,
              fontSize: getFontSize(12),
              textAnchor: 'end',
              dx: -5,
              dy: 3,
            })}
            label={yAxisLabel}
            labelProps={{
              fill: theme.palette.text.primary,
              fontSize: getFontSize(14),
              textAnchor: 'middle',
              transform: 'rotate(-90)',
              y: -40,
              x: -innerHeight / 2,
            }}
          />
        </Group>
      </svg>
    </>
  );
}

// Wrapper component that handles responsiveness
export default function BarChart<T>({
  data,
  margin,
  xAxisLabel,
  yAxisLabel,
  xKey,
  yKey,
  barFill,
  title,
  aspectRatio = 16/9, // Default aspect ratio
  minHeight = 250, // Increased minimum height
}: BarChartProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState<{ width: number, height: number } | null>(null);

  // Set default margin with enough bottom space
  const defaultMargin = { 
    top: margin?.top ?? 40, 
    right: margin?.right ?? 30, 
    bottom: margin?.bottom ?? 80, // Ensure sufficient bottom margin
    left: margin?.left ?? 60 
  };

  // Update dimensions based on width and aspect ratio
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        
        // Calculate height based on aspect ratio
        let height = Math.max(width / aspectRatio, minHeight);

        // Ensure minimum height includes margins
        const totalMarginHeight = defaultMargin.top + defaultMargin.bottom;
        if (height - totalMarginHeight < 100) {
          height = 100 + totalMarginHeight;
        }

        setContainerDimensions({ width, height });
        
        // Set the container height
        containerRef.current.style.height = `${height}px`;
      }
    };

    // Initial update and add resize listener
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [aspectRatio, minHeight, defaultMargin.top, defaultMargin.bottom]);

  if (!containerDimensions) {
    return <Box ref={containerRef} sx={{ width: '100%', minHeight: `${minHeight}px` }} />;
  }

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: '100%',
        position: 'relative',
        overflow: 'hidden', // Prevent overflow
      }}
      p={2}
    >
      <ParentSize debounceTime={50}>
        {({ width, height }) => (
          <BarChartContent<T>
            data={data}
            width={width}
            height={height}
            margin={defaultMargin}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            xKey={xKey}
            yKey={yKey}
            barFill={barFill}
            title={title}
          />
        )}
      </ParentSize>
    </Box>
  );
}