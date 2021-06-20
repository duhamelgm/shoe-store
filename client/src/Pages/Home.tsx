import { Suspense } from "react";
import GraphsOrders from "../Components/Graphs/GraphsOrders";
import GraphsInventorySales from "../Components/Graphs/GraphsInventorySales";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 pb-12">
      <h1 className="mb-3 font-bold text-xl">Orders over time</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <GraphsOrders />
      </Suspense>

      <hr className="mt-8" />

      <h1 className="mt-6 mb-3 font-bold text-xl">Inventory Sales over time</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <GraphsInventorySales />
      </Suspense>
    </div>
  );
};

export default Home;
