import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;