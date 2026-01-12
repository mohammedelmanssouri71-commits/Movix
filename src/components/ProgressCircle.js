import React from "react";
import { PieChart, Pie, Cell } from "recharts";

// const data = [{ value: 87 }, { value: 13 }]; // 87% complet
// const COLORS = ["#00C49F", "#e0e0e0"]; // couleur verte et gris clair

export default function ProgressCircle({data, COLORS}) {
  return (
    <div style={{ width: 70, height: 70, position: "relative" }}>
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          startAngle={90}  // commence en haut
          endAngle={-270}  // cercle dans le sens horaire
          innerRadius={40}
          outerRadius={50}
          dataKey="value"
          cornerRadius={50} // coins arrondis
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      {/* Pourcentage au centre */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {data[0].value}%
      </div>
    </div>
  );
}
