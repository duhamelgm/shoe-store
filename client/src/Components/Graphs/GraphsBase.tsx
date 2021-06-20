import { useMemo, useRef, useEffect, useState, FunctionComponent } from "react";
import { useAtom } from "jotai";
import {
  VictoryChart,
  VictoryHistogram,
  VictoryTheme,
  VictoryArea
} from "victory";
import { ordersHistogramAtom } from "../../atoms/metrics.atoms";
import { MetricDataPoint } from "../../types/metrics.types";

type ComponentProps = {
  rawData: Array<MetricDataPoint>;
};

const GraphsBase: FunctionComponent<ComponentProps> = ({ rawData }) => {
  const [chartWidth, setChartWidth] = useState(400);
  const containerEl = useRef<HTMLDivElement>(null);

  const data = useMemo(
    () =>
      rawData.map((el: MetricDataPoint) => ({
        x: new Date(el.date),
        y: el.value
      })),
    [rawData]
  );

  useEffect(() => {
    if (containerEl.current) {
      setChartWidth(containerEl.current.clientWidth - 300);
    }
  }, [containerEl]);

  return (
    <div
      className="graphs-card bg-white shadow overflow-hidden sm:rounded-md"
      ref={containerEl}
    >
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
        scale={{ x: "time" }}
        padding={{ top: 35, bottom: 45, right: 0, left: 0 }}
        width={chartWidth}
      >
        <VictoryArea
          data={data}
          style={{
            data: { fill: "#00A3CC" }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default GraphsBase;
