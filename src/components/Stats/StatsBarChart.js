import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { G, Rect, Line, Text } from "react-native-svg";
import _ from "lodash";
import { scalePoint, scaleLinear } from "d3-scale";
import { GRAY_3, BLUE, GRAY_2, GRAY_1 } from "../../design/colors";

const BarChart = ({ data, period, containerStyle }) => {
  // Temp. fix. Need to figure out the loading error in StatsContext where the data is being fetched.
  if (_.isEmpty(data)) {
    return null;
  }

  // Check if all the y-values are zero. If they are, gotta change some stuff in
  // the graph, because scaleLinear handles domains of [0, 0] weirdly.
  const allZeroes = _.every(data, ["y", 0]);

  const SVGHeight = 225;
  const { width: SVGWidth } = Dimensions.get("window");
  const chartMargin = 25;
  const graphHeight = SVGHeight - 2 * chartMargin;
  const graphWidth = SVGWidth - 2 * chartMargin;
  // Change bar width based on period (so they're more clear)
  const getBarWidth = (period) => {
    switch (period) {
      case "week":
        return 18;
      case "month":
        return 7;
      case "year":
        return 14;
      default:
        return 10;
    }
  };

  // X Scale
  const xDomain = data.map((item) => item.x);
  const xRange = [0, graphWidth];
  const scaleX = scalePoint().domain(xDomain).range(xRange).padding(1);

  // Y Scale
  const yMax = _.maxBy(data, (item) => item.y).y; // maxBy returns the whole object
  const niceMaxVal = Math.ceil(yMax / 10) * 10;
  const yDomain = [0, niceMaxVal];
  // If the data is all zeroes, make y-range [0,0]
  const yRange = allZeroes ? [0, 0] : [0, graphHeight];
  const scaleY = scaleLinear().domain(yDomain).range(yRange);

  // Middle Label
  const middleValue = niceMaxVal / 2;

  // Component that displays the x-axis labels depending on the period.
  const XAxisLabels = ({ period, data }) => {
    // Component for label
    const XAxisLabel = ({ value, label = value }) => (
      <Text
        fontSize="12"
        fill={GRAY_1}
        x={scaleX(value)}
        y="16"
        textAnchor="middle"
      >
        {label}
      </Text>
    );

    // If the period chosen is "month", then to avoid crowding the x-axis with
    // 28-31 labels, only show the first day of the month (1) and then days
    // divisible by 5 (5, 10, 15, ...).
    if (period === "month") {
      return data.map((item) => {
        const dayNum = Number(item.x);

        if (dayNum === 1 || dayNum % 5 === 0) {
          return <XAxisLabel value={item.x} key={`Label ${item.x}`} />;
        }
      });
    } else if (period === "year") {
      // If the period chosen is "year", then make the label just the month's
      // initial (J, F, M, ...) to reduce crowding. The reason the item object's
      // x value isn't that to begin with is because then the list keys get
      // messed up (multiple Js, Ms, etc.)
      return data.map((item) => (
        <XAxisLabel
          value={item.x}
          label={item["x"][0]}
          key={`Label ${item.x}`}
        />
      ));
    } else {
      // Otherwise show all of them
      return data.map((item) => (
        <XAxisLabel value={item.x} key={`Label ${item.x}`} />
      ));
    }
  };

  return (
    <View style={containerStyle}>
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + chartMargin}>
          {/* Top dotted axis */}
          {!allZeroes && (
            <Line
              x1="0"
              y1={scaleY(niceMaxVal) * -1}
              x2={graphWidth - 5}
              y2={scaleY(niceMaxVal) * -1}
              stroke={GRAY_3}
              strokeWidth="0.5"
              strokeDasharray={[3, 3]}
            />
          )}
          {/* Top y-label */}
          <Text
            x={graphWidth + 1}
            y={scaleY(niceMaxVal) * -1 + 4}
            textAnchor="start"
            fontSize="12"
            fill={GRAY_2}
          >
            {niceMaxVal}
          </Text>
          {/* Middle dotted axis */}
          {!allZeroes && (
            <Line
              x1="0"
              y1={scaleY(middleValue) * -1}
              x2={graphWidth - 5}
              y2={scaleY(middleValue) * -1}
              stroke={GRAY_3}
              strokeWidth="0.5"
              strokeDasharray={[3, 3]}
            />
          )}
          {/* Middle y-label */}
          {!allZeroes && (
            <Text
              x={graphWidth + 3}
              y={scaleY(middleValue) * -1 + 4}
              textAnchor="start"
              fontSize="12"
              fill={GRAY_2}
            >
              {middleValue}
            </Text>
          )}
          {/* Bars */}
          {!allZeroes &&
            data.map((item) => (
              <Rect
                key={item.x}
                x={scaleX(item.x) - getBarWidth(period) / 2}
                y={scaleY(item.y) * -1}
                rx={4}
                width={getBarWidth(period)}
                height={scaleY(item.y)}
                fill={BLUE}
              />
            ))}
          {/* x-axis */}
          <Line
            x1="0"
            y1="0"
            x2={graphWidth}
            y2="0"
            stroke={GRAY_3}
            strokeWidth="1"
          />
          {/* X-axis labels */}
          <XAxisLabels period={period} data={data} />
        </G>
      </Svg>
    </View>
  );
};

export default BarChart;
