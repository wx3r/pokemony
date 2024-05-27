import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonApp() {
  const [query, setQuery] = useState('');
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [queriedPokemon, setQueriedPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [chosenPokemon, setChosenPokemon] = useState(null);

  useEffect(() => {
    getRandomPokemon();
    getAllPokemon();
  }, []);

  const getRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1302) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setRandomPokemon(response.data);
    } catch (error) {
      console.error('Error fetching random Pokemon:', error);
    }
  };

  const getAllPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`);
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
    }
  };

  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setQueriedPokemon(response.data);
    } catch (error) {
      console.error('Error searching for Pokemon:', error);
      setQueriedPokemon(null);
    }
  };

  const fetchRandomPokemon = () => {
    getRandomPokemon();
  };

  const selectPokemon = async (event) => {
    const selectedName = event.target.value;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedName}`);
      setChosenPokemon(response.data);
    } catch (error) {
      console.error('Error selecting Pokemon:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 flex flex-col items-center py-10">
      <div className="space-y-6 max-w-4xl w-full">
        <div className="flex space-x-4">
          <button onClick={fetchRandomPokemon} className="bg-purple-600 text-white font-bold rounded-lg px-4 py-2 hover:bg-purple-700 shadow-md">
            Get Random Pokemon!
          </button>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pokemon by name"
            className="bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none shadow-md"
          />
          <button onClick={searchPokemon} className="bg-purple-600 text-white font-bold rounded-lg px-4 py-2 hover:bg-purple-700 shadow-md">
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {randomPokemon && randomPokemon.sprites && (
              <>
                <h2 className="text-2xl font-bold mb-4 capitalize">{randomPokemon.name}</h2>
                <img src={randomPokemon.sprites.front_default} alt={randomPokemon.name} className="mb-4 mx-auto"/>
                <p className="text-gray-800">
                  Type: {randomPokemon.types[0].type.name}
                  <br />
                  Stats:
                  <ul className="list-disc list-inside">
                    {randomPokemon.stats.map((stat) => (
                      <li key={stat.stat.name} className="capitalize">{stat.stat.name}: {stat.base_stat}</li>
                    ))}
                  </ul>
                  Abilities:
                  <ul className="list-disc list-inside">
                    {randomPokemon.abilities.map((ability) => (
                      <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
                    ))}
                  </ul>
                </p>
              </>
            )}
          </div>
          {queriedPokemon && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {queriedPokemon.sprites && (
                <>
                  <h2 className="text-2xl font-bold mb-4 capitalize">{queriedPokemon.name}</h2>
                  <img src={queriedPokemon.sprites.front_default} alt={queriedPokemon.name} className="mb-4 mx-auto"/>
                  <p className="text-gray-800">
                    Type: {queriedPokemon.types[0].type.name}
                    <br />
                    Stats:
                    <ul className="list-disc list-inside">
                      {queriedPokemon.stats.map((stat) => (
                        <li key={stat.stat.name} className="capitalize">{stat.stat.name}: {stat.base_stat}</li>
                      ))}
                    </ul>
                    Abilities:
                    <ul className="list-disc list-inside">
                      {queriedPokemon.abilities.map((ability) => (
                        <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
                      ))}
                    </ul>
                  </p>
                </>
              )}
            </div>
          )}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <select onChange={selectPokemon} className="w-full p-2 rounded-lg border border-gray-300 shadow-md">
              <option value="">Select a Pokemon</option>
              {pokemonList.map((pokemon, index) => (
                <option key={index} value={pokemon.name}>{pokemon.name}</option>
              ))}
            </select>
            {chosenPokemon && chosenPokemon.sprites && (
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4 capitalize">{chosenPokemon.name}</h2>
                <img src={chosenPokemon.sprites.front_default} alt={chosenPokemon.name} className="mb-4 mx-auto"/>
                <p className="text-gray-800">
                  Type: {chosenPokemon.types[0].type.name}
                  <br />
                  Stats:
                  <ul className="list-disc list-inside">
                    {chosenPokemon.stats.map((stat) => (
                      <li key={stat.stat.name} className="capitalize">{stat.stat.name}: {stat.base_stat}</li>
                    ))}
                  </ul>
                  Abilities:
                  <ul className="list-disc list-inside">
                    {chosenPokemon.abilities.map((ability) => (
                      <li key={ability.ability.name} className="capitalize">{ability.ability.name}</li>
                    ))}
                  </ul>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonApp;
