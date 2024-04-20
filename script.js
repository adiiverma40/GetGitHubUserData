// provide your github token in the token variable
const token = `your_github_token`;

//DOM vaariable declarations
let userImage = document.querySelector("#userImage");
let userName = document.querySelector("#userName");
let userBio = document.querySelector("#userBio");
let userEmail = document.querySelector("#email");
let totalRepo = document.querySelector("#repoCount");

//variables declaration
let username = prompt('Enter username');
let newData;
let totalRepositories;
// function to change html
async function repoCount() {
  try {
    const totalRepositories = await getUserRepo();
    console.log("Total number of repositories:", totalRepositories);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
repoCount();
function changeUserData(x){
  userImage.src = x.avatar_url;
  userId.innerText = x.login;
  userName.innerText = x.name;
  userBio.innerText = x.bio;
  userEmail.innerText = x.email;
  // try{
  totalRepo.innerText = totalRepositories;
  // } catch (error) {console.log('Error:', error);}
}

//API calling
async function fetchUserData(){
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${token}` 
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    changeUserData(data);
  } catch (err) { console.log(err); }
}
let userData = fetchUserData();

async function getUserRepo() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
    const newData = await response.json(); // Add await here to wait for JSON parsing
    
    // Count the total number of repositories
    const repoCount = newData.length; // Assuming newData is an array of repositories
    
    return repoCount;
  } catch (err) { 
    console.error(err); 
    throw err;
  }
}


// // Object { login: "adiiverma40", id: 146183407, node_id: "U_kgDOCLaU7w", avatar_url: "https://avatars.githubusercontent.com/u/146183407?v=4", gravatar_id: "", url: "https://api.github.com/users/adiiverma40", html_url: "https://github.com/adiiverma40", followers_url: "https://api.github.com/users/adiiverma40/followers", following_url: "https://api.github.com/users/adiiverma40/following{/other_user}", gists_url: "https://api.github.com/users/adiiverma40/gists{/gist_id}", … }
