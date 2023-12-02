import React, { createContext, useState, useEffect } from "react";
import { path } from "../routing/endpoints";

export const TrainersContext = createContext();

export const TrainersProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchAndCreateTrainers = async () => {
      const response = await fetch(`${path}/trainers`);
      const existingTrainers = await response.json();

      const trainersToCreate = [
        { navn: "Ash Ketchum" },
        { navn: "Gary Oak" },
      ].filter(
        (trainerToCreate) =>
          !existingTrainers.some(
            (trainer) => trainer.navn === trainerToCreate.navn
          )
      );

      for (const trainer of trainersToCreate) {
        try {
          await fetch(`${path}/trenere`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trainer),
          });
        } catch (error) {
          console.error("Error creating trainer:", error);
        }
      }
      setTrainers([...existingTrainers, ...trainersToCreate]);
    };
    fetchAndCreateTrainers();
  }, []);

  return (
    <TrainersContext.Provider value={{ trainers }}>
      {children}
    </TrainersContext.Provider>
  );
};
