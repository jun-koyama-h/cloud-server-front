// MyComponent.tsx
import React, { useState } from 'react';
import './Top.css';

const MyComponent: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSelectOption1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectOption2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

  const handleSelectOption3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption3(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const cuisineOptions = [
    "American", "Asian", "British", "Caribbean", "Central Europe",
    "Chinese", "Eastern Europe", "French", "Indian", "Italian",
    "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern",
    "Nordic", "South American", "South East Asian"
  ];

  const mealOptions = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
  
  const dishOptions = ["Biscuits and cookies", "Bread", "Cereals",
    "Condiments and sauces", "Desserts", "Drinks", "Main course", "Pancake",
    "Preps", "Preserve", "Salad", "Sandwiches", "Side dish", "Soup", "Starter", "Sweets"
  ];

  return (
    <div className="container">
      <form>
        <div className="selectContainer">
          <label>Cuisine Type</label>
          <select value={selectedOption1} onChange={handleSelectOption1}>
            {cuisineOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>Meal Type</label>
          <select value={selectedOption2} onChange={handleSelectOption2}>
            {mealOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="selectContainer">
          <label>Dish Type</label>
          <select value={selectedOption3} onChange={handleSelectOption3}>
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
      </form>
    </div>
  );
};

export default MyComponent;
