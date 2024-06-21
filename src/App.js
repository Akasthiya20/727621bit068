import React, { useState } from 'react';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  return (
    <div className="App">
      <h1>E-Commerce Site</h1>
      <Filter
        company={company}
        setCompany={setCompany}
        category={category}
        setCategory={setCategory}
        top={top}
        setTop={setTop}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <ProductList
        company={company}
        category={category}
        top={top}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default App;
