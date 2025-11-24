import MetricCard from "./MetricCard";

const CheckAPIStatus: React.FC = () => {
  const status = "OK"; // later this will be dynamic

  return (
    <div className="pt-8">
        <MetricCard title="API Status">
        {status}
        </MetricCard>
    </div>
  );
};

export default CheckAPIStatus;