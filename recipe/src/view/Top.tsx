// MyComponent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Top.css';

const MyComponent: React.FC = () => {
  const [selectedCusineOption, setSelectedCusineOption] = useState<string>('');
  const [selectedMealOption, setSelectedMealOption] = useState<string>('');
  const [selectedDishOption, setSelectedDishOption] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<{ image: string, cuisineType: string, mealType: string, dishType: string }>({ image: '', cuisineType: '', mealType: '', dishType: '' });
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
    } else {
      setSelectedImage(null);
      setImagePreview('');
    }
  };
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>('');


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      // グループワーク用URL
      const apiUrl = 'https://0nb04mo3l7.execute-api.ap-northeast-1.amazonaws.com/dev';
      // 動作確認URL
      // const apiUrl = 'https://k85c3fsuo9.execute-api.ap-northeast-1.amazonaws.com/dev';
      // console.log(JSON.stringify(formData));
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('APIへのリクエストが成功しました。');
        const data = await response.json();
        const { hits } = JSON.parse(data.body);
        if (hits && hits.length > 0) {
          navigate('/Result', { state: { recipes: hits } });
        } else {
          setError('検索結果が見つかりませんでした');
        }
      } else {
        console.error('APIへのリクエストが失敗しました。');
        const errorResponse = await response.json();
        setError(`APIへのリクエストが失敗しました。${response.status}: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };


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
          <label>料理の種類</label>
          <select value={selectedCusineOption} onChange={handleSelectCusineOption}>
            {cuisineOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>食事のタイプ ランチやディナーなど</label>
          <select value={selectedMealOption} onChange={handleSelectMealOption}>
            {mealOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>料理の種類</label>
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
            {selectedImage ? '選択済みの画像' : '画像を選択してください'}
          </label>
        </div>
        {selectedImage && (
        <><div>
            <p>選択した画像のプレビュー:</p>
            <img src={imagePreview as string} alt="プレビュー" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </div><button className="submitButton" onClick={handleSubmit}>レシピ教えて！</button></>
      )}
      </form>
      {error && <div className="errorContainer">{error}</div>}
    </div>
  );
};

export default MyComponent;
