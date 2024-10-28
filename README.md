
# Description of my "Ingredient Recipe Choices" project:
Ingrediant Recipe Choices is a web application built with React that helps users quickly find recipes based on ingredients they have at home. With a few filters, users can discover meal ideas suited to their prefered cuisines, dietary preferences, and available ingredients. Using the Spoonacular API, this simple meal prep app makes it easy to decide what to do with the ingrediants you have at home,a nd what you can add to make a selection of dishes.




# API Used: Spoonacular API
My project uses one API which is the Spoonacular API. It is a  food and recipe database that provides extensive information on recipes, ingredients, and nutritional details. Using Spoonacular, "Ingredient Recipe Choices" offers users a quick and easy way to find recipes based on specific ingredients, cuisines, diets, and recipe types.

Key API Endpoints
Complex Search Endpoint: This endpoint is used to search for recipes using filtering options. This allows my app to take ingredient lists, cuisine preferences, and dietary requirements and return tailored results.

Endpoint: GET https://api.spoonacular.com/recipes/complexSearch

Recipe Information Endpoint: Once a recipe is selected, this endpoint provides detailed information about the recipe, specifically the full list of ingredients.

Endpoint: GET https://api.spoonacular.com/recipes/{id}/information



# Acknowledgments: Built with Assistance from ChatGPT
My project was enhanced with the help of ChatGPT, an AI language model created by OpenAI, here is how:

1- Project Structuring Guidance: Assistance with setting up React components, managing state, and organizing project files.

2- Troubleshooting and Debugging: Real-time troubleshooting support for error messages, missing files, and GitHub setup.

3-Styling and User Interface: Tips on implementing CSS and inline styling to create a user-friendly and visually appealing interface.



# How to Set Up this Program:
1- Open your terminal and type in: git clone https://github.com/elyaziaa/recipe-finder.git

2- Type in: cd recipe-finder

3- Type in: touch .env, and make sure to add the API key

4- Type in: npm install

5- Type in: npm start



