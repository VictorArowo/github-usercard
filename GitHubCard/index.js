/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

let rawData = axios.get("https://api.github.com/users/VictorArowo")

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
rawData
    .then(data => cardCreator(data.data))
    .then(card => document.querySelector(".cards").append(card));



/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
function appendFollowers() {
    followersArray.forEach(a => {
        axios.get(`https://api.github.com/users/${a}`)
        .then(data => cardCreator(data.data))
        .then(card => document.querySelector(".cards").append(card));
    })
}

let followersArray = [];

axios.get("https://api.github.com/users/VictorArowo/followers")
    .then(data => data.data.forEach(a => followersArray.push(a.login)))
    .then(() => appendFollowers());




/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
cardCreator = ({avatar_url, name, login, location,
     html_url, followers, following, bio}) => {
    const outerDiv = document.createElement("div");
    const img = document.createElement("img");
    const innerDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    const pUserName = document.createElement("p");
    const pLocation = document.createElement("p");
    const pProfie = document.createElement("p");
    const a = document.createElement("a");
    const pFollowers = document.createElement("p");
    const pFollowing = document.createElement("p");
    const pBio = document.createElement("p");
    const button = document.createElement("button");

    outerDiv.classList.add("card");
    innerDiv.classList.add("card-info");
    h3.classList.add("name");
    pUserName.classList.add("username");

    img.setAttribute("src", avatar_url);
    a.setAttribute("href", html_url);

    h3.textContent = name;
    pUserName.textContent = login;
    pLocation.textContent = `Location: ${location}`;
    pProfie.textContent = "Profile: "
    a.textContent = html_url;
    pFollowers.textContent = `Followers: ${followers}`;
    pFollowing.textContent = `Following: ${following}`;
    pBio.textContent = `Bio: ${bio}`;
    button.textContent = "Less Info";

    button.addEventListener("click", () => {
        outerDiv.classList.toggle("reduce");
        img.classList.toggle("contract");
        pUserName.classList.toggle("contract");
        pProfie.classList.toggle("contract");
        pFollowing.classList.toggle("contract");
        pFollowers.classList.toggle("contract");
        pBio.classList.toggle("contract");
        
        button.textContent === "More Info" ? button.textContent = "Less Info": button.textContent = "More Info";
    });

    pProfie.append(a);

    innerDiv.append(h3);
    innerDiv.append(pUserName);
    innerDiv.append(pLocation);
    innerDiv.append(pProfie);
    innerDiv.append(pFollowers);
    innerDiv.append(pFollowing);
    innerDiv.append(pBio);
    innerDiv.append(button);    

    outerDiv.append(img);
    outerDiv.append(innerDiv);

    return outerDiv;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
