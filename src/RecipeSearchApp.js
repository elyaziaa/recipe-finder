// Import necessary libraries from React and Axios for API requests
import React, { useState } from 'react';
import axios from 'axios';

// Define the main functional component
const RecipeSearchApp = () => {
  // Define variables for user inputs and results
  const [ingredient, setIngredient] = useState(''); // Ingredient input from the user
  const [cuisine, setCuisine] = useState(''); // Selected cuisine filter
  const [diet, setDiet] = useState(''); // Selected diet filter
  const [type, setType] = useState(''); // Selected recipe type filter
  const [recipes, setRecipes] = useState([]); // Array to store fetched recipe results
  const [recipeDetails, setRecipeDetails] = useState({}); // Object to store ingredients for each recipe by ID

  // Function to fetch recipes based on the search criteria
  const searchRecipes = async () => {
    try {
      // Make a GET request to Spoonacular API for searching recipes
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          includeIngredients: ingredient, // Include the user-specified ingredient
          cuisine: cuisine || undefined, // Filter by cuisine if selected
          diet: diet || undefined, // Filter by diet if selected
          type: type || undefined, // Filter by type if selected
          number: 5, // Limit the results to 5 recipes
        },
        headers: {
          'x-api-key': process.env.REACT_APP_SPOONACULAR_API_KEY, // API key from .env file
        },
      });
      const fetchedRecipes = response.data.results; // Get recipes from the API response
      setRecipes(fetchedRecipes); // Update the recipes state with fetched data

      // For each recipe, fetch detailed information including ingredients
      fetchedRecipes.forEach(recipe => fetchRecipeDetails(recipe.id));
    } catch (error) {
      console.error('Error fetching recipes:', error); // Log any errors
    }
  };

  // Function to fetch detailed information for each recipe (including ingredients)
  const fetchRecipeDetails = async (recipeId) => {
    try {
      // Make a GET request to get specific recipe details using its ID
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
        headers: {
          'x-api-key': process.env.REACT_APP_SPOONACULAR_API_KEY, // API key from .env file
        },
      });
      // Update the recipeDetails state with ingredients for the recipe ID
      setRecipeDetails(prevState => ({
        ...prevState,
        [recipeId]: response.data.extendedIngredients, // Store ingredients under recipe ID
      }));
    } catch (error) {
      console.error('Error fetching recipe details:', error); // Log any errors
    }
  };

  // Inline styles for better design
  const styles = {
    container: {
      backgroundColor: '#f0f4f8', // Light background color
      padding: '40px',
      borderRadius: '10px',
      maxWidth: '800px',
      margin: 'auto',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for card effect
    },
    inputGroup: {
      marginBottom: '20px', // Space between input fields
    },
    input: {
      padding: '10px',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    select: {
      padding: '10px',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#007bff', // Blue button color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    recipeContainer: {
      marginTop: '20px',
      textAlign: 'left',
    },
    recipeCard: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    recipeImage: {
      width: '100%',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    ingredientsList: {
      listStyleType: 'none', // No bullet points for ingredients list
      paddingLeft: '0',
    },
  };

  // JSX to render the component UI
  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: '20px' }}>🍴 Recipe Finder 🍴</h1>

      {/* Input for entering an ingredient */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          style={styles.input}
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter an ingredient (e.g., tomato, cheese)"
        />
      </div>

      {/* Dropdown for selecting cuisine */}
      <div style={styles.inputGroup}>
        <select style={styles.select} value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Any Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="japanese">Japanese</option>
        </select>
      </div>

      {/* Dropdown for selecting diet */}
      <div style={styles.inputGroup}>
        <select style={styles.select} value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Any Diet</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
        </select>
      </div>

      {/* Dropdown for selecting recipe type */}
      <div style={styles.inputGroup}>
        <select style={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any Type</option>
          <option value="main course">Main Course</option>
          <option value="side dish">Side Dish</option>
          <option value="dessert">Dessert</option>
          <option value="appetizer">Appetizer</option>
        </select>
      </div>

      {/* Button to initiate recipe search */}
      <button onClick={searchRecipes} style={styles.button}>
        Search Recipes
      </button>

      {/* Container to display fetched recipes and ingredients */}
      <div style={styles.recipeContainer}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <h3>{recipe.title}</h3>
              {recipe.image && <img src={recipe.image} alt={recipe.title} style={styles.recipeImage} />}
              
              {/* Display ingredients if available */}
              <h4>Ingredients:</h4>
              {recipeDetails[recipe.id] ? (
                <ul style={styles.ingredientsList}>
                  {recipeDetails[recipe.id].map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              ) : (
                <p>Loading ingredients...</p>
              )}
            </div>
          ))
        ) : (
          <p>No recipes found. Try different ingredients or filters!</p>
        )}
      </div>
    </div>
  );
};

// Export the component to be used in other files
export default RecipeSearchApp;
