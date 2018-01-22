<h1 align="center">
  MemoMap 🗺
</h1>

<p float="left" align= "center">
  <img src="READMEimages/cover1.png" />
  <br>
  <img src="READMEimages/cover2.png" />
</p>

**MemoMap** is a travel diary product done with an interactive map interface. It allows a user to personally document the places he or she has been, set some preferences and save it by their individual Facebook account. Memomap is an app that tracks one's memories whilst encourage one to make more. This was a Makers Academy's final project.

***

<h2> How to Use: </h2>

We plan to deploy this App to Heroku, but till then you will need to follow these instructions in order to run MemoMap locally on your machine.

<h4> 1 - Install & Setup MongoDB: </h4>

If you don't already have MongoDB, follow the below steps. In your command line:

```
  brew update

  brew install mongodb

  mkdir -p /data/db

  sudo chown -R `id -un` /data/db
  # Enter your password
```

<h4> 2 - Clone and setup Repo: </h4>

To setup the Repo on your local machine. From your command line:

```
  git clone git@github.com:tmerrr/map-app.git

  cd map-app

  npm i

  mkdir public/uploads

  cd client

  npm i
```

<h4> 3 - Run App: </h4>

To run the app locally on your machine, you will need to open 3 terminals.

In your first terminal, run the following code for activating your databases.

```
  mondgod
```

In your second terminal, change into the project folder of the  directory and run npm start. This runs the back-end of your program.

```
  cd <path>/map-app
  npm start
```

Finally, in your last terminal, change into the same project folder, except go into the client folder. When you run the following code, this will load the front-end.

```
  cd <path>/map-app/client
  npm start
```

<h4> Using the App </h4>

1. Click the 'Login with Facebook' button to sign in.
2. Use the roller on your mouse, or push up or pull down on your touchpad to zoom in and out.
3. Click and drag on the map to move around.
4. Use the search bar in the top right of the screen to search for a specific location.
5. To drop a Pin, enable the Pin Drop by clicking the 'Pin Drop: Off' button under the search bar. Then click on the map where you would like to place the Pin.
6. Click on the Pin and complete the form (all sections need to be completed) to upload a picture and create a Memory.
7. Click on the 'Hamburger' icon in the top left of the screen to open the sidebar. Here lists your details, information about the pins you've dropped, and your current traveler level.
8. To Logout, click the 'Logout' button in the sidebar.

***

<h2> Technologies:  </h2>

Our team decided to implement this product as a MERN stack. A MERN stack is a full on javascript built product, which uses the following
technologies ( Mongo, Express, React and Node ). More info on how we set it up => [Set Up](https://hackernoon.com/episode-43-the-art-of-setting-up-a-mern-stack-final-project-week-d554bffe2c0e)

| Front-End     | Back-End      | Testing |
| :---:         |:---:          | :---:   |
| React         | Node          | Jest    |
| Mapbox        | Express       | Mocha   |
|               | Mongo         | Chai    |

***

<h2> Our Approach: </h2>

<p float="left" align= "center">
  <img src="READMEimages/3.jpg" width="400" />
  <img src="READMEimages/standup1.jpg" width="400" />
</p>

<p float="left" align= "center">
  <img src="READMEimages/2.jpg" width="400" />
  <img src="READMEimages/retro1.jpg" width="400" />
</p>

Our collective approach was to make sure that  "everyone was on the same page in terms of understanding the code. We had StandUps and Retros everyday to check in on what tasks needed to be
done for the day and to check in how everyone was
finding the progress of each day. We always wrote
down what we achieved today to reflect upon and decide what needed to be done tomorrow.

 To strengthen our understanding of our code overall, we also switched pairs everyday so that everyone got exposure and could explore the different sections of the code. We were successful with our goals as we all got exposure to dealing with the front-end, back-end and testing frameworks.


PS: Yes, R3TRO was a thing in our team.
<br>

***

<h2> MVP & Functionalities: </h2>

MVP, otherwise known as the Minimal Viable Product is to create the basic function of an app. Metaphorically, it's like wanting to build car but starting of with a skateboard first to see whether that is achievable. By listing down our MVP, this mindset allowed us to succeed at creating the simplest form of our application before expanding into other functionalities.

```
• User can see a map when the website in loaded
• User can add the pin
• User can save the pin onto the Map
• User can refresh the page and load up the pin onto the map
```
 Our accomplished functions are listed below. We divided the functions into categories. For user interactivity functions:

```
• User can add image to a pin
• User can add a caption to a pin
  - The caption allows a user to document a place
  - The caption allows a user to write a memory
• User can see the date of the post
• User can give a rating of the post
• User can see how many memories they have made
• User can categorise the activities of the post
• User can delete a pin

```
For User details & settings:

```
• User can sign in to the application
• User can login to the application
• User can logout from the application
• User can see their name on the web app once logged in
• User can see their email on the web app once
logged out.
```

For The Interface:

```
• User can enjoy a nice interface while engaged with the app.
• User can see the bounce of the pin when a pin is dropped
• User can have a toggle to engage with the map by dropping a pin and locking the map to view changes.
• User can see details on a snazzy navigation sidebar
• User can see the level they have travelled
depending on the amount of memories one has.
```

***
## Team

- 🐱 [Dania Mah](https://github.com/thatdania)
- 🐰 [Eva Dinckel](https://github.com/evadinckel)
- 🐸 [Lewis Youl](https://github.com/LewisYoul)
- 🐨 [Tom Moir](https://github.com/tmerrr)
