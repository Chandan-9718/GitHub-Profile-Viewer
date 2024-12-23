let user = document.getElementById("userid"); 
// Yeh line input field ke element ko access kar rahi hai jaha user apna username enter karega.

async function fetchName(username) {
  // Yeh ek async function hai jo username ke base par API se data fetch karega.
  let response = await fetch(`https://api.github.com/users/${username}`);
  // GitHub API ko call kar raha hai aur response ko wait kar raha hai.
  let result = await response.json();
  // Response ko JSON format me convert kar raha hai.
  displayUser(result);
  // API se aaya result displayUser function me bhej raha hai.
}

document.getElementById("btn").addEventListener("click", () => {
  // Button click event ko handle kar raha hai.
  document.getElementById("userProfile").classList.add('secondDiv');
  // User profile ke element ko visible karne ke liye class add kar raha hai.
  document.getElementById("userProfile").classList.remove('secondDivHidden');
  // Hidden class ko hata raha hai taki profile visible ho jaye.

  let userid = user.value;
  // Input field se username value le raha hai.
  fetchName(userid);
  // Username ko pass karke fetchName function ko call kar raha hai.
});

function displayUser({
  avatar_url,
  name,
  bio,
  followers,
  following,
  public_repos,
  html_url
}) {
  // API response ko destructure kar raha hai taki alag-alag values ko access kiya ja sake.

  if (!avatar_url) {
    // Agar avatar_url nahi mila to error message show karega.
    document.getElementById("userProfile").innerHTML = `<h1>User Not Found </h1>`;
    return;
  }
  if (!bio) {
    bio = "";
    // Agar bio nahi mila to blank string set karega.
  }

  document.getElementById("userProfile").innerHTML = `<div class="userInfo">
          <img src= ${avatar_url} class="userimage" alt="Profile-Image">
          <!-- User ka profile image show karne ke liye. -->
          <div class="userintroduction">
              <p class="username">${name}</p>
              <!-- User ka naam show karne ke liye. -->
              <p class="userbio">${bio}</p>
              <!-- User ka bio show karne ke liye. -->
          </div>
      </div>
      <div class="userFlow">
          <div class="follower">
              <div class="repo">
                  <p>Follower</p>
                  <p>${followers}</p>
                  <!-- Followers count display karega. -->
              </div>
              <div class="repo">
                  <p>Following</p>
                  <p>${following}</p>
                  <!-- Following count display karega. -->
              </div>
              <div class="repo">
                  <p>Repo</p>
                  <p>${public_repos}</p>
                  <!-- Public repositories count display karega. -->
              </div>
          </div>
          <a href=${html_url} target='_blank' class="visit">
          <div class="visit">
              Visit Profile
          </div>
          </a>
          <!-- Profile link par click karke GitHub profile open karne ka option. -->
      </div>`;
}
