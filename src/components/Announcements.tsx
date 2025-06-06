const Announcements = () => {
  return (
    <div className="bg-white rounded-xl w-full max-w-[480px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold text-gray-800">Announcements</h1>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          View All
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer ${
              i === 1
                ? "bg-lamaSkyLight"
                : i === 2
                ? "bg-lamaPurpleLight"
                : "bg-lamaYellowLight"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-medium text-gray-700 text-sm">Lorem ipsum dolor sit</h2>
              <span className="text-[10px] text-gray-400 bg-white rounded-md px-2 py-0.5 select-none">
                2025-01-01
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-snug">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, expedita. Rerum, quidem facilis?
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;