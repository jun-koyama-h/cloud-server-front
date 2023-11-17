import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
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
        {recipes.map((recipe: { recipe: {
            [x: string]: any; uri: Key | null | undefined; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; image: string | undefined; source: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; calories: number; 
}; }) => (
          <li key={recipe.recipe.uri}>
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} />
            <p>{recipe.recipe.source}</p>
            <p>{recipe.recipe.ingredientLines.join()}</p>
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