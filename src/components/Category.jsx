import React from 'react';

const Category = ({ categories, selectedCategory, onChange }) => {
  return (
    // create a container
    <div className="mb-3"> 
    {/* label for the drop down */}
      <label htmlFor="category" className="fw-semibold" style={{ color: "#8B0000" }}>
        📂 Product Category:
      </label>

      {/* The dropdown itself */}
      <select 
    //   the dropdown name
        id="category" 
        className="form-select form-select-lg rounded-3"

        // to show currently selected category
        value={selectedCategory} 

        //onChange={(e) => onChange(e.target.value)} runs when the user picks something new 
        onChange={(e) => onChange(e.target.value)}
        required>

            {/* this shows --select  a category-- , its like a placeholder before choosing anything */}
        <option value="">📂 Product Category</option>

        {/* creating category options automatically */}
        {/* categories.map((cat, index) => means go through every category */}
        {categories.map((cat, index) => (
            // cat means actual category name

            // React creates an option for each category
            // index is a unique identifier
            // cat - displayes category name inside the option
          <option key={index}value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
