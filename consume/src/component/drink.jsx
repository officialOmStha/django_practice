import React, { useEffect, useState } from "react";

const DrinksFetcher = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrinks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/drinks/");
      if (!response.ok) {
        throw new Error("Failed to fetch drinks");
      }
      const data = await response.json();
      setDrinks(data.drinks);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  if (loading) return <p>Loading drinks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drinks List</h1>
      <ul className="space-y-3">
        {drinks.map((drink) => (
          <li key={drink.id} className="border p-3 rounded shadow">
            <h2 className="text-lg font-semibold">{drink.name}</h2>
            <p>{drink.descriptions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksFetcher;
