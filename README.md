// Currently in the process of converting this application to Typescript //

Hi, this is a photo/image search app I created using JS, React, HTML, CSS, NodeJS, Express and MongoDB.

Below I will give a brief description of how the app works and its features.

When you load the page you are greeted by the home page which loads random photos/images every time. At the top, there is a search bar, side scroll categories section and a register/login button.

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/47a3877b-0f4c-4090-9f73-a7109c11ccdd)

Click the register button to go to register page and set up an account:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/07b8737f-b860-467f-bfda-1ebcfb5c37f1)
![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/61e734e2-83e4-45e6-8e52-548c6bef9e49)

Input validation toast messages will appear on the top right:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/2d893f48-f907-43e7-96db-b5659d904370)

When successfully registered, you will be redirected to the login page and a toast will appear telling you that the registration was successful:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/6372c609-275b-46f0-885b-553c86188a44)

When successfully logged in, you will be redirected to the home page and a toast will appear telling you that login was successful:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/abb461a9-d12d-42b0-894e-f472a104e98e)

Clicking on any category link will show photos/images relevent to that category:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/b249eba9-ff04-4ac3-9fef-e5fd83c0ba35)

Hovering over an image will give you an option to like or unlike the image depending on whether it has already been liked or not:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/9a2e36b0-9098-405c-9ba3-9fe49180f9b2)
![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/8d946dda-8301-46e8-af42-7f70d4afbed3)

When you like/unlike an image, a toast appears at the bottom right of the screen:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/70eb864a-da23-485e-b703-4d37e42776ae)
![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/03b062cb-f994-41cd-93bf-fa85e6b9dc43)

Clicking on an image will take you to that image's details page where you can also like/unlike the image as well as download it in various resolutions:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/a583485c-d0f7-4422-af99-d0cf96cb807c)

Clicking on the user icon at the top right allows you to go to your liked photos where you can unlike any photos you have saved:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/dd214fcc-b28d-461f-9fd9-dc5445ce1bee)
![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/27f93513-6632-46b5-96c8-239a9faa08b1)

If you unlike an image on your liked photos page, you can undo that action by using the undo button that appears when an image is unliked:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/22b7a225-55e9-40bb-a0f9-192356ea90a3)

When you click the logout button, your current session cookie is cleared and you are logged out, then redirected back to the home page:

![image](https://github.com/M0NDI/mondi-photo-gallery-fullstack/assets/52505246/57a44d66-7d10-45be-a76f-298060c0a174)
