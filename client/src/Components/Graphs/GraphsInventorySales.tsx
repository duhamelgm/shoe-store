import { useAtom } from "jotai";
import { inventorySalesHistogramAtom } from "../../atoms/metrics.atoms";

import GraphsBase from "./GraphsBase";

const GraphsOrder = () => {
  const [ordersHistogram] = useAtom(inventorySalesHistogramAtom);

  return <GraphsBase rawData={ordersHistogram} />;
};

export default GraphsOrder;
