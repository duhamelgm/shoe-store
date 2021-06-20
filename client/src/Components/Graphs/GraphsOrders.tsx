import { useAtom } from "jotai";
import { ordersHistogramAtom } from "../../atoms/metrics.atoms";

import GraphsBase from "./GraphsBase";

const GraphsOrder = () => {
  const [ordersHistogram] = useAtom(ordersHistogramAtom);

  return <GraphsBase rawData={ordersHistogram} />;
};

export default GraphsOrder;
