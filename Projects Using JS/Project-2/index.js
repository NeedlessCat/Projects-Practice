const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const ProfileContentEl = document.getElementById("ProfileContent");
const loadingEl = document.getElementById("loading")

const generateProfile = (profile) => {
	return `
		<div class="profile-box">
    		<div class="top-section">
    			<div class="left">
    				<div class="avatar">
    					<img src="${profile.avatar_url}" alt="avatar">
    				</div>
    				<div class="self">
    					<h1>"${profile.name}"</h1>
    					<h1>@"${profile.login}"</h1>
    				</div>
    			</div>
    			<a href="${profile.repos_url}">
    				<button class="primary-btn"> Check Profile</button>
    			</a>
    		</div>
    		<div class="about">
    			<h2>About</h2>
    			<p>"${profile.bio}"</p>
    		</div>
    		<div class="status">
    			<div class="status-item">
    				<h3>Followers</h3>
    				<p>"${profile.followers}"</p>
    			</div>
    			<div class="status-item">
    				<h3>Followings</h3>
    				<p>"${profile.following}"</p>
    			</div>
    			<div class="status-item">
    				<h3>Repos</h3>
    				<p>"${profile.public_repos}"</p>
    			</div>
    		</div>
    	</div>
		`;
};

const fetchProfile = async () => {
	const username = searchInputEl.value;

	loadingEl.innerText = "loading....";
	loadingEl.style.color = "black";

	try {
		const res = await fetch(`${url}/${username}`);
		const data = await res.json();

		if(data.name) {
			loadingEl.innerText = "";
			ProfileContentEl.innerHTML = generateProfile(data);
		}
		else {
			loadingEl.innerHTML = data.message;
			loadingEl.style.color = "red";
			ProfileContentEl.innerText = "";
		}
		console.log("data: ",data);
	}
	catch(error) {
		console.log({error});
		loadingEl.innerText = "";
	}
};

searchBtnEl.addEventListener("click", fetchProfile);

