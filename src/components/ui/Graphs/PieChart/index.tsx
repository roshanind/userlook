import { useMemo, useRef, useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LegendOrdinal } from '@visx/legend';

import { Box, Typography, useTheme } from '@ui';

export type PieChartProps<T> = {
  data: T[];
  margin?: { top: number; right: number; bottom: number; left: number };
  valueKey: keyof T & string;
  labelKey: keyof T & string;
  colorKey: keyof T & string;
  title?: string;
  showLegend?: boolean;
  aspectRatio?: number;
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
  aspectRatio = 1.5,
}: PieChartProps<T>) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
  const animationFrameId = useRef<number>(null);

  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<T>();
  const { containerRef: tooltipContainerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(Math.max(width / aspectRatio, 200));

      setDimensions({ width, height });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updateDimensions);
    });

    resizeObserver.observe(containerRef.current);
    updateDimensions();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [aspectRatio]);

  const { radius, centerX, centerY } = useMemo(() => {
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;
    return {
      radius: Math.min(innerWidth, innerHeight) / 2,
      centerX: innerWidth / 2 + margin.left,
      centerY: innerHeight / 2 + margin.top,
    };
  }, [dimensions, margin]);

  const { colorScale, total } = useMemo(
    () => ({
      colorScale: scaleOrdinal({
        domain: data.map((d) => String(d[labelKey])),
        range: data.map((d) => String(d[colorKey])),
      }),
      total: data.reduce((sum, d) => sum + Number(d[valueKey]), 0),
    }),
    [data, labelKey, colorKey, valueKey]
  );

  return (
    <Box
      ref={tooltipContainerRef}
      sx={{
        width: '100%',
        position: 'relative',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {title && (
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <svg width={dimensions.width} height={dimensions.height} style={{ display: 'block' }}>
            <Group top={centerY} left={centerX}>
              <Pie
                data={data}
                pieValue={(d) => Number(d[valueKey])}
                outerRadius={radius}
                innerRadius={radius / 3}
                cornerRadius={3}
                padAngle={0.01}
              >
                {(pie) =>
                  pie.arcs.map((arc, index) => {
                    const arcData = arc.data as T;
                    const arcValue = Number(arcData[valueKey]);
                    const percentage = ((arcValue / total) * 100).toFixed(1);
                    const [centroidX, centroidY] = pie.path.centroid(arc);

                    return (
                      <g
                        key={`arc-${index}`}
                        onMouseMove={(event) => {
                          const point = localPoint(event);
                          if (point) {
                            showTooltip({
                              tooltipData: arcData,
                              tooltipLeft: point.x,
                              tooltipTop: point.y,
                            });
                          }
                        }}
                        onMouseLeave={hideTooltip}
                      >
                        <path
                          d={pie.path(arc) || ''}
                          fill={String(arcData[colorKey])}
                          stroke={theme.palette.background.paper}
                          strokeWidth={1}
                        />
                        {arcValue / total > 0.05 && radius > 50 && (
                          <text
                            x={centroidX}
                            y={centroidY}
                            textAnchor="middle"
                            fill={theme.palette.getContrastText(String(arcData[colorKey]))}
                            fontSize={12}
                            dy=".33em"
                          >
                            {`${percentage}%`}
                          </text>
                        )}
                      </g>
                    );
                  })
                }
              </Pie>
            </Group>
          </svg>
        </Box>

        {showLegend && (
          <Box sx={{ minWidth: 100 }}>
            <LegendOrdinal
              scale={colorScale}
              direction="column"
              labelFormat={(label) => String(label)}
              shape="circle"
              shapeHeight={15}
              shapeWidth={15}
              itemMargin="0 8px"
            />
          </Box>
        )}

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
              <strong>{String(tooltipData[labelKey])}</strong>
            </div>
            <div>
              Value: {Number(tooltipData[valueKey])} ({((Number(tooltipData[valueKey]) / total) * 100).toFixed(1)}%)
            </div>
          </TooltipInPortal>
        )}
      </Box>
    </Box>
  );
}
