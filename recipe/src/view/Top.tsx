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
    {value: '', label: ''},
    {value: 'American', label: 'アメリカ料理'},
    {value: 'Asian', label: 'アジア料理'},
    {value: 'British', label: 'イギリス料理'},
    {value: 'Caribbean', label: 'カリブ料理'},
    {value: 'Central Europe', label: '中欧料理'},
    {value: 'Chinese', label: '中華料理'},
    {value: 'Eastern Europe', label: '東欧料理'},
    {value: 'French', label: 'フランス料理'},
    {value: 'Indian', label: 'インド料理'},
    {value: 'Italian', label: 'イタリア料理'},
    {value: 'Japanese', label: '日本料理'},
    {value: 'Kosher', label: 'コーシャー料理'},
    {value: 'Mediterranean', label: '地中海料理'},
    {value: 'Mexican', label: 'メキシコ料理'},
    {value: 'Middle Eastern', label: '中東料理'},
    {value: 'Nordic', label: '北欧料理'},
    {value: 'South American', label: '南米料理'},
    {value: 'South East Asian', label: '東南アジア料理'}
  ];
  const mealOptions = [
    {value: '', label: ''},
    {value: 'Breakfast', label: '朝食'},
    {value: 'Dinner', label: 'ディナー'},
    {value: 'Lunch', label: 'ランチ'},
    {value: 'Snack', label: 'おやつ'},
    {value: 'Teatime', label: 'お茶の時間'}
  ];

  const dishOptions = [
    {value: '', label: ''},
    {value: 'Biscuits and cookies', label: 'ビスケット・クッキー'},
    {value: 'Bread', label: 'パン'},
    {value: 'Cereals', label: 'シリアル'},
    {value: 'Condiments and sauces', label: '調味料・ソース'},
    {value: 'Desserts', label: 'デザート'},
    {value: 'Drinks', label: 'ドリンク'},
    {value: 'Main course', label: 'メインディッシュ'},
    {value: 'Pancake', label: 'パンケーキ'},
    // {value: 'Preps', label: '前菜'},
    {value: 'Preserve', label: '保存食'},
    {value: 'Salad', label: 'サラダ'},
    {value: 'Sandwiches', label: 'サンドイッチ'},
    {value: 'Side dish', label: 'サイドディッシュ'},
    {value: 'Soup', label: 'スープ'},
    {value: 'Starter', label: '前菜'},
    {value: 'Sweets', label: 'スイーツ'}
  ];

  return (
    <div className="container">
      <form>
        <div className="selectContainer">
          <label>料理の種類</label>
          <select value={selectedCusineOption} onChange={handleSelectCusineOption}>
          {cuisineOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>食事のタイプ ランチやディナーなど</label>
          <select value={selectedMealOption} onChange={handleSelectMealOption}>
            {mealOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>料理の種類</label>
          <select value={selectedDishOption} onChange={handleSelectDishOption}>
            {dishOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
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
      {error && <div className="errorContainer">{error}</div>}
      </form>
    </div>
  );
};

export default MyComponent;
