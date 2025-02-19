// Enhanced Responsive PieChart Component (src/components/charts/PieChart.tsx)
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LegendOrdinal } from '@visx/legend';
import { Text } from '@visx/text';
import { Box, useTheme, Typography } from '@mui/material';

// Generic props for reusability
export type PieChartProps<T> = {
  data: T[];
  margin?: { top: number; right: number; bottom: number; left: number };
  valueKey: keyof T & string;
  labelKey: keyof T & string;
  colorKey: keyof T & string;
  title?: string;
  showLegend?: boolean;
  aspectRatio?: number; // Optional aspect ratio constraint (width/height)
};

/**
 * A responsive PieChart component that renders a pie chart using the provided data.
 *
 * @template T - The type of the data items.
 *
 * @param {Object} props - The properties object.
 * @param {T[]} props.data - The data to be visualized in the pie chart.
 * @param {Object} [props.margin={ top: 20, right: 20, bottom: 20, left: 20 }] - The margin around the chart.
 * @param {string} props.valueKey - The key in the data items that holds the value for the pie slices.
 * @param {string} props.labelKey - The key in the data items that holds the label for the pie slices.
 * @param {string} props.colorKey - The key in the data items that holds the color for the pie slices.
 * @param {string} [props.title] - The title of the pie chart.
 * @param {boolean} [props.showLegend=true] - Whether to show the legend.
 * @param {number} [props.aspectRatio=1.5] - The aspect ratio of the chart.
 *
 * @returns {JSX.Element} The rendered PieChart component.
 */
export default function PieChart<T>({
  data,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  valueKey,
  labelKey,
  colorKey,
  title,
  showLegend = true,
  aspectRatio = 1.5, // Default aspect ratio
}: PieChartProps<T>) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  // Tooltip setup
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<T>();

  const { containerRef: tooltipContainerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  // Use ResizeObserver to handle responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;

      const { width } = entries[0].contentRect;
      let height = width / aspectRatio;

      // Set minimum height to ensure chart is visible
      height = Math.max(height, 200);

      setDimensions({ width, height });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [aspectRatio]);

  // Dimensions
  const innerWidth = dimensions.width - margin.left - margin.right;
  const innerHeight = dimensions.height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerX = innerWidth / 2 + margin.left;
  const centerY = innerHeight / 2 + margin.top;

  // Prepare scales and colors
  const getColor = (d: T) => String(d[colorKey]);
  const getLabel = (d: T) => String(d[labelKey]);
  const getValue = (d: T) => Number(d[valueKey]);

  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: data.map(getLabel),
        range: data.map(getColor),
      }),
    [data, labelKey, colorKey]
  );

  // Calculate total for percentage display
  const total = useMemo(() => data.reduce((sum, d) => sum + getValue(d), 0), [data, valueKey]);

  // Handle tooltip
  const handleMouseOver = (event: React.MouseEvent<SVGGElement>, d: T) => {
    const point = localPoint(event);

    if (point) {
      showTooltip({
        tooltipData: d,
        tooltipLeft: point.x,
        tooltipTop: point.y,
      });
    }
  };

  // Adjust font size based on chart dimensions
  const getLabelFontSize = () => {
    if (dimensions.width < 300) return 8;
    if (dimensions.width < 500) return 10;
    return 12;
  };

  return (
    <Box
      ref={tooltipContainerRef}
      sx={{
        width: '100%', // Take full width of parent
        position: 'relative',
        fontFamily: theme.typography.fontFamily,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      p={2}
    >
      <Box>
        {title && (
          <Typography variant="h6" align="center">
            {title}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box
          ref={containerRef}
          sx={{
            height: 'auto',
            minHeight: 200,
            flexGrow: 1,
            minWidth: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <svg width={dimensions.width} height={dimensions.height} style={{ display: 'block' }}>
            <Group top={centerY} left={centerX}>
              <Pie
                data={data}
                pieValue={getValue}
                outerRadius={radius}
                innerRadius={radius / 3}
                cornerRadius={3}
                padAngle={0.01}
              >
                {(pie) => {
                  return pie.arcs.map((arc, index) => {
                    const arcPath = pie.path(arc);
                    const arcData = arc.data as T;
                    const arcValue = getValue(arcData);
                    const percentage = ((arcValue / total) * 100).toFixed(1);

                    return (
                      <g
                        key={`arc-${index}`}
                        onPointerMove={(e) => handleMouseOver(e, arcData)}
                        onPointerLeave={hideTooltip}
                      >
                        <path
                          d={arcPath || ''}
                          fill={getColor(arcData)}
                          stroke={theme.palette.background.paper}
                          strokeWidth={1}
                        />

                        {/* Show percentage label inside the pie slice if large enough */}
                        {arcValue / total > 0.05 && radius > 50 && (
                          <Text
                            textAnchor="middle"
                            verticalAnchor="middle"
                            transform={`translate(${pie.path.centroid(arc)[0]}, ${pie.path.centroid(arc)[1]})`}
                            style={{
                              fill: theme.palette.getContrastText(getColor(arcData)),
                              fontSize: getLabelFontSize(),
                              fontWeight: 'bold',
                              pointerEvents: 'none',
                            }}
                          >
                            {`${percentage}%`}
                          </Text>
                        )}
                      </g>
                    );
                  });
                }}
              </Pie>
            </Group>
          </svg>
        </Box>

        {/* Legend with responsive layout */}
        {showLegend && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 2,
              fontSize: getLabelFontSize(),
            }}
          >
            <LegendOrdinal
              scale={colorScale}
              direction="column"
              labelFormat={(label) => {
                const item = data.find((d) => getLabel(d) === label);
                if (item) {
                  return dimensions.width < 350
                    ? `${label.substring(0, 3)}` // Shortened for small screens
                    : `${label}`;
                }
                return label;
              }}
              shape="circle"
              shapeHeight={dimensions.width < 350 ? 8 : 15}
              shapeWidth={dimensions.width < 350 ? 8 : 15}
              itemMargin="0 8px"
            />
          </Box>
        )}

        {/* Tooltip */}
        {tooltipOpen && tooltipData && (
          <TooltipInPortal
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[3],
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: dimensions.width < 350 ? '0.75rem' : '0.875rem',
            }}
          >
            <div>
              <strong>{getLabel(tooltipData)}</strong>
            </div>
            <div>
              Count: {getValue(tooltipData)} ({((getValue(tooltipData) / total) * 100).toFixed(1)}%)
            </div>
          </TooltipInPortal>
        )}
      </Box>
    </Box>
  );
}
