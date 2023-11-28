import React, { createContext, useState, useEffect } from "react";
import { path } from "../routing/endpoints";

export const TrainersContext = createContext();

export const TrainersProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const response = await fetch(`${path}/trainers`);
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  useEffect(() => {
    const createTrainers = async () => {
      const trainersToCreate = [{ navn: "Ash Ketchum" }, { navn: "Gary Oak" }];

      for (const trainer of trainersToCreate) {
        try {
          await fetch(`${path}/trainers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trainer),
          });
        } catch (error) {
          console.error("Error creating trainer:", error);
        }
      }

      fetchTrainers();
    };
    createTrainers();
  }, []);

  return (
    <TrainersContext.Provider value={{ trainers }}>
      {children}
    </TrainersContext.Provider>
  );
};
