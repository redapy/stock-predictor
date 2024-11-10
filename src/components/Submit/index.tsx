import { useFormStatus } from "react-dom";

const Submit = ({ tickersLength }: { tickersLength: number }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="generate-report-btn disabled:bg-gray-400"
      disabled={tickersLength === 0 || pending}
    >
      Generate Report
    </button>
  );
};

export default Submit;
