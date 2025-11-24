import MetricCard from "./MetricCard";

const GetAPILatency: React.FC = () => {
  const status = "OK"; // later this will be dynamic

  return (
    <div className="pt-8">
        <MetricCard title="API Latency">
        {status}
        </MetricCard>
    </div>
  );
};

export default GetAPILatency;