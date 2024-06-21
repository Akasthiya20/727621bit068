import React from 'react';

const Filter = ({ company, setCompany, category, setCategory, top, setTop, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <div>
      <div>
        <label>Company: </label>
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          <option value="MYN">MYN</option>
          <option value="AZO">AZO</option>
        </select>
      </div>
      <div>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Phone">Phone</option>
          <option value="Computer">Computer</option>
          <option value="TV">TV</option>
          <option value="Earphone">Earphone</option>
          <option value="Tablet">Tablet</option>
          <option value="Charger">Charger</option>
          <option value="Mouse">Mouse</option>
          <option value="Keypad">Keypad</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="Pendrive">Pendrive</option>
          <option value="Remote">Remote</option>
          <option value="Speaker">Speaker</option>
          <option value="Headset">Headset</option>
          <option value="Laptop">Laptop</option>
          <option value="PC">PC</option>
        </select>
      </div>
      <div>
        <label>Top N Products: </label>
        <input type="number" value={top} onChange={(e) => setTop(e.target.value)} />
      </div>
      <div>
        <label>Min Price: </label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div>
        <label>Max Price: </label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
    </div>
  );
};

export default Filter;
