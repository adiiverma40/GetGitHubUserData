// Provide your GitHub token in the token variable
const token = `your github token`;

// DOM variable declarations
const userImage = document.querySelector("#userImage");
const userName = document.querySelector("#userName");
const userBio = document.querySelector("#userBio");
const userEmail = document.querySelector("#email");
const totalRepo = document.querySelector("#repoCount");

// Variables declaration
let username = prompt('Enter username');

// Function to fetch user data and update UI
async function fetchUserData() {
  try {
    const userDataResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${token}` 
      }
    });
    if (!userDataResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await userDataResponse.json();
    updateUI(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Function to update UI with user data
function updateUI(userData) {
  userImage.src = userData.avatar_url;
  userName.innerText = userData.name || "Name not provided";
  userBio.innerText = userData.bio || "Bio not provided";
  userEmail.innerText = userData.email || "Email not provided";
}

// Function to fetch total number of repositories
async function fetchRepositories() {
  try {
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const reposData = await reposResponse.json();
    const totalRepositories = reposData.length;
    updateRepoCount(totalRepositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

// Function to update repository count in UI
function updateRepoCount(count) {
  totalRepo.innerText = `Total Repo : ${count}`;
}

// Initialize the application
async function init() {
  try {
    await fetchUserData();
    await fetchRepositories();
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Call init function to start the application
init();
