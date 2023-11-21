/* import { Link } from "react-router-dom";
import { routes, endpoints, path } from "../../routing/endpoints";

export default function Home() {
  fetch(`${path}/${endpoints.getRoutes}`);
  return (
    <p>
      <Link to={`${routes.pokemon}`}>Go Home</Link>
    </p>
  );
}
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes, path } from "../../routing/endpoints";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch(`${path}${routes.pokemon}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Logg dataen hentet fra APIet
        setPokemon(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <p>
        <Link to={`${routes.pokemon}`}>Go to Pokemon</Link>
      </p>
      <ul>
        {pokemon.map((poke) => (
          <li key={poke._id}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}
