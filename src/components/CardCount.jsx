import React from "react";

const CardCount = ({ title, count, textColor = "" }) => {
  return (
    <div className="bg-base-100 shadow card bg-primary/5 p-4 rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${textColor}`}>{count} items</p>
    </div>
  );
};

export default CardCount;
