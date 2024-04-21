const token = ``;

// DOM elements
const userImage = document.querySelector("#userImage");
const userName = document.querySelector("#userName");
const userBio = document.querySelector("#userBio");
const userEmail = document.querySelector("#email");
const totalRepo = document.querySelector("#repoCount");
const userId = document.querySelector("#userId");
const userID2 = document.querySelector("#userID2");
const repoList = document.querySelector("#right");
const languageList = document.querySelector("#languageList");
const totalCommit = document.querySelector("#commit");
// Prompt for username
const username = prompt('Enter username');

//variables 
let commits = 0;


// Fetch user data and update UI
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

// Update UI with user data
function updateUI(userData) {
  userImage.src = userData.avatar_url;
  userName.innerText = userData.name || "Name not provided";
  userBio.innerText = userData.bio || "Bio not provided";
  userEmail.innerText = userData.email || "Email not provided";
  userId.innerText = userData.login || "username is incorrect";
  userID2.innerText = userData.login || "username is incorrect";
  
}

// Update repository list
function updateRepoList(repositories) {
  repositories.forEach(repo => {
    const repoBox = document.createElement("div");
    repoBox.classList.add("repoBox");
    
    const repoName = document.createElement("p");
    repoName.classList.add("repoName");
    repoName.innerText = repo.name || "Name is not provided";
    
    const repoDesc = document.createElement("p");
    repoDesc.classList.add("repoDescription");
    repoDesc.innerText = repo.description || "Description is not provided";
    
    const repoVisibility = document.createElement("p");
    repoVisibility.classList.add("repoDescription");
    repoVisibility.style.color = "white";
    repoVisibility.innerText = `Visibility: ${repo.visibility || "Not provided"}`;
    
    repoList.appendChild(repoBox);
    repoBox.appendChild(repoName);
    repoBox.appendChild(repoDesc);
    repoBox.appendChild(repoVisibility);
    
    repoName.addEventListener("click", () => {
      window.open(repo.html_url, "_blank");
    });
  });
}

// Fetch total number of repositories
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
    updateRepoCount(reposData.length);
    updateRepoList(reposData);
    commits=0;
    for(repo of reposData){
      let promise = await fetch(`${repo.url}/commits`,{
        headers: {
          'Authorization': `token ${token}`
        }
      });
      let data = await promise.json();
      console.log(data);
      commits += data.length;
      totalCommit.innerText = `Total commit : ${commits}`;
    }
    
    
    return reposData;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

// Fetch languages for each repository
async function analyzeUserLanguages(username) {
  try {
    const repositories = await fetchRepositories();
    const languages = {};
    for (const repo of repositories) {
      const repoLanguages = await fetchRepositoriesLanguges(repo.name);
      for (const lang in repoLanguages) {
        languages[lang] = (languages[lang] || 0) + repoLanguages[lang];
      }
    }
    return languages;
  } catch (error) {
    console.error('Error analyzing user languages:', error);
    throw error;
  }
}

// Fetch repository languages
async function fetchRepositoriesLanguges(repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch repository languages');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    throw error;
  }
}

// Update language list in UI
async function updateLanguageList() {
  try {
    const languages = await analyzeUserLanguages();
    document.querySelector("#loading").style.display = 'none';
    for (const lang in languages) {
      const listItem = document.createElement('li');
      listItem.innerText = lang;
      languageList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error updating language list:', error);
  }
}

// Update repository count in UI
function updateRepoCount(count) {
  totalRepo.innerText = `Total Repo : ${count}`;
}

// Initialize the application
async function init() {
  try {
    await fetchUserData();
    await fetchRepositories();
    await updateLanguageList();
  } catch (error) {
    console.error}}

    init();
