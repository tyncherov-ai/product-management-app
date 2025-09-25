export const SpecRow: React.FC<{ label: string; value: unknown }> = ({
  label,
  value,
}) => (
  <div className="py-4 flex flex-col md:grid md:grid-cols-3 md:gap-4">
    <p className="font-semibold text-gray-600 md:font-medium md:col-span-1">
      {label}
    </p>
    <p className="text-gray-800 md:col-span-2 mt-1 md:mt-0">
      {String(value) || "N/A"}
    </p>
  </div>
);
