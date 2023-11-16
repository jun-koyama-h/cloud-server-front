// Result.tsx

import React from 'react';
import './Result.css';
import { useLocation } from 'react-router-dom';

const SearchResultPage = () => {
  const location = useLocation();
  const recipes = location.state?.recipes || [];

  return (
    <div className="container-result">
    <form className="result-form">
    <div>
      <h2>検索結果</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe.uri}>
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p>{recipe.recipe.source}</p>
            <p>カロリー: {recipe.recipe.calories.toFixed(2)} kcal</p>
          </li>
        ))}
      </ul>
    </div>
    </form>
    </div>
  );
};

export default SearchResultPage;
