import { STATUS } from "../../utils/consts";

export const InfoBox: React.FC<{
  label: string;
  value: string;
  isStatus?: boolean;
}> = ({ label, value, isStatus }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    {isStatus ? (
      <span
        className={`px-2 py-1 mt-1 inline-block text-xs font-semibold rounded-full ${
          value === STATUS.UNKNOWN
            ? "bg-gray-100 text-gray-800"
            : value === STATUS.ACTIVE
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ) : (
      <p className="font-semibold text-gray-800 mt-1">{value}</p>
    )}
  </div>
);
