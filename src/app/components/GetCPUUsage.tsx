import MetricCard from "./MetricCard";

const GetCPUUsage: React.FC = () => {
  const status = "OK"; // later this will be dynamic

  return (
    <div className="pt-8">
        <MetricCard title="CPU Usage">
        {status}
        </MetricCard>
    </div>
  );
};

export default GetCPUUsage;