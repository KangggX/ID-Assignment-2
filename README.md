# Assignment-2
Assignment 2 repos
- [Github repository](https://github.com/KangggX/Assignment-2)
- [Github webpage link](https://kangggx.github.io/Assignment-2/)

# EzyRecipe

EzyRecipe aims to reduce the time taken to prepare a full-course meal within 15 minutes with a large variety of cuisines such as 
American, British, Korean cuisine and many more. EzyRecipe caters to all types of people. Be it being a vegetarian or having an intolerance to lactose, EzyRecipe have it all convered.
 
## Design Process

I made the website with 2 different colours, green and white, which look simple and easy to the eye with an aim to make all content easy to read and understand. The website is mainly for those who want to prepare meals within a certain period of time (e.g. 20 minutes) or with specific filters to cater to their needs. Not only are there many cuisines to choose from, users who have allergies to a certain type of food/ingredient or a different diet choice can also have them filtered out. Having said that, an example of a user who can use this website is a housewife who can make use of the variety of recipes available to prepare meals for her family members to enjoy.

- As a housewife, I want to search for a recipe that contains Pasta, so that I can prepare a meal with my son's favourite ingredient, Pasta.
- As a student, I want to search for recipes that can be prepared in around 20 minutes, so that I can prepare a meal just in time before leaving house for school.
- As an employee, I want to search for recipes that is from the Korean cuisine, so that I can satisfy my cravings for Korean food.

[Adobe XD Wireframe](https://xd.adobe.com/view/471d1f6d-1b7e-4a70-9801-b3aff50f69d6-124e/)

## Features
 
### Existing Features
- Feature 1 - Navigation bar, easy for users to navigate to the "Get Recipe" page to start finding their desired recipe.
- Feature 2 - Multiple forms available to be filled up to get a filtered list of recipe.
- Feature 3 - Included in the API are the images of each recipe searched, thus users can have a clearer look on how each recipe looks like.
- Feature 4 - Detailed information about the recipe servings as well as the nutritional information.
- Feature 5 - Easy to understand ingredients list and instructions list.

### Features Left to Implement
- Dark mode
- The total cost of all ingredients needed to prepare the meal

## Technologies Used

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.

- [Bootstrap](https://getbootstrap.com/)
    - **Bootstrap** is used to simplify the whole process of styling the website

- [Spoonacular API](https://spoonacular.com/food-api/docs#Get-Recipe-Information)
    - The **Spoonacular API** is used to gather all information about the recipe searched for. This is the main "brain" of the website.


## Testing

1. Get Recipe form:
    1. Go to the "Get Recipe" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with something random and verify that an error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears or an error message if no results are found

### How it look and work on different browsers and screen sizes
1. With the help of Bootstrap, catering to different browsers and screen sizes have been made easier. Upon shrinking down the screen size, users are still expected to view the contents easily without any obstruction and the system will still function as intended.

### Bugs and/or Problems discovered
1. During testing, I found out that despite no results were found from the form I have submitted, there were no error message displayed and the code still continue to run.

2. Later in my project I realised that I made an error to the way I have validated my forms using Javascript. The error I made was that users will not be able to submit the form if they only fill the "Meal Type", "Ready Time", "Diet Choice", and/or "Intolerance" input unless they have the "Name" and/or "Cuisine" input filled in.
    1. Issue was fixed by ensuring at least one input have to be filled in-order to submit the form successfully.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from [Pixabay](https://pixabay.com) and provided from the API itself

### Acknowledgements

- I received inspiration for this project from X
