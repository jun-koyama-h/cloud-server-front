// MyComponent.tsx
import React, { useState } from 'react';
import './Top.css';
import { useNavigate } from 'react-router-dom';

const MyComponent: React.FC = () => {
  const [selectedCusineOption, setSelectedCusineOption] = useState<string>('');
  const [selectedMealOption, setSelectedMealOption] = useState<string>('');
  const [selectedDishOption, setSelectedDishOption] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<{ image: string, cuisineType: string, mealType: string, dishType: string }>({ image: '', cuisineType: '', mealType: '', dishType: '' });
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectCusineOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCusineOption(event.target.value);
    setFormData({ ...formData, cuisineType: event.target.value });
  };

  const handleSelectMealOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealOption(event.target.value);
    setFormData({ ...formData, mealType: event.target.value });
  };

  const handleSelectDishOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDishOption(event.target.value);
    setFormData({ ...formData, dishType: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        const base64String = reader.result?.toString().split(",")[1]; // base64文字列を取得
        if (base64String) {
          setFormData({ ...formData, image: base64String });
        }
      };
      
      reader.readAsDataURL(file);
      // setFormData({ ...formData, image: base64String });
    } else {
      setSelectedImage(null);
      setImagePreview('');
    }
    // setSelectedImage(file || null);
  };
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Edamam APIキーを取得してここにセットする
      const apiKey = 'YOUR_EDAMAM_API_KEY';

      // EdamamのRecipes APIのエンドポイント
      const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=tomato&app_id=09957592&app_key=e2cc47cb30db76e0f7cf5a30f33a441e`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
          navigate('/Result', { state: { recipes: data.hits } });
        } else {
          setError('検索結果が見つかりませんでした');
        }
        // setRecipes(data.hits);
        // setError(null);
      } else {
        const errorResponse = await response.json();
        setError(`APIへのリクエストが失敗しました: ${response.status}: ${errorResponse.message}`);
        setRecipes([]);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
      setError('エラーが発生しました');
      setRecipes([]);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // グループワーク用URL
  //     // const apiUrl = 'https://0nb04mo3l7.execute-api.ap-northeast-1.amazonaws.com/dev';
  //     // 動作確認URL
  //     // const apiUrl = 'https://k85c3fsuo9.execute-api.ap-northeast-1.amazonaws.com/dev';
  //     const apiUrl = 'https://api.edamam.com/api/recipes/v2';
  //     // console.log(JSON.stringify(formData));
  //     const params = {
  //         "type": "public",
  //         "app_id": "09957592",
  //         "app_key": "e2cc47cb30db76e0f7cf5a30f33a441e",
  //         "q": 'tomato',
  //     }
  //     const response = await fetch(apiUrl, {
  //       // method: 'POST',
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify(formData),
  //       body: JSON.stringify(params),
  //     });

  //     if (response.ok) {
  //       console.log('APIへのリクエストが成功しました。');
  //       const result = await response.json();
  //       // 結果の画像があれば表示
  //       if (result && result.imageUrl) {
  //         // ここで結果の画像を表示するためのstateを更新する
  //         // 例えば、新しいstateを追加してそれを使う
  //         // const [resultImage, setResultImage] = useState<string | null>(result.imageUrl);
  //         // または既存のstateを更新する
  //         // setSelectedImage(result.imageUrl);
  //       }
  //     } else {
  //       console.error('APIへのリクエストが失敗しました。');
  //       const errorResponse = await response.json();
  //       setError(`APIへのリクエストが失敗しました。${response.status}: ${errorResponse.message}`);
  //     }
  //   } catch (error) {
  //     console.error('エラーが発生しました:', error);
  //   }
  // };

  const cuisineOptions = [
    "", "American", "Asian", "British", "Caribbean", "Central Europe",
    "Chinese", "Eastern Europe", "French", "Indian", "Italian",
    "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern",
    "Nordic", "South American", "South East Asian"
  ];

  const mealOptions = ["", "Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
  
  const dishOptions = ["", "Biscuits and cookies", "Bread", "Cereals",
    "Condiments and sauces", "Desserts", "Drinks", "Main course", "Pancake",
    "Preps", "Preserve", "Salad", "Sandwiches", "Side dish", "Soup", "Starter", "Sweets"
  ];

  return (
    <div className="container">
      <form>
        <div className="selectContainer">
          <label>Cuisine Type</label>
          <select value={selectedCusineOption} onChange={handleSelectCusineOption}>
            {cuisineOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>Meal Type</label>
          <select value={selectedMealOption} onChange={handleSelectMealOption}>
            {mealOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>Dish Type</label>
          <select value={selectedDishOption} onChange={handleSelectDishOption}>
            {dishOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="fileInput">
          <input type="file" id="imageInput" onChange={handleImageChange} />
          <label htmlFor="imageInput" className="fileInputLabel">
            {selectedImage ? 'Image Selected' : 'Choose Image'}
          </label>
        </div>
        {selectedImage && (
        <><div>
            <p>選択した画像のプレビュー:</p>
            <img src={imagePreview as string} alt="プレビュー" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </div><button className="submitButton" onClick={handleSubmit}>送信</button></>
      )}
      </form>
      {error && <div className="errorContainer">{error}</div>}
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
  );
};

export default MyComponent;
