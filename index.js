const randomURL = "https://dog.ceo/api/breeds/image/random";
const breedListURL = "https://dog.ceo/api/breeds/list";
const collection = document.querySelector(".collection");

//add breed to collection function
async function addDog(breedType) {
	if (breedType === "random") {
		url = "https://dog.ceo/api/breeds/image/random";
	} else {
		url = `https://dog.ceo/api/breed/${breedType}/images/random`;
	}

	const result = await fetch(url);
	const resultJson = await result.json();
	const data = resultJson.message;

	const img = document.createElement("img");
	const p = document.createElement("p");
	const div = document.createElement("div");
	const deleteBtn = document.createElement("button");

	img.src = data;
	img.alt = `Picture of ${breedType}`;
	div.className = "dog-entry";
	deleteBtn.className = "delete-btn";

	p.textContent = breedType;
	collection.appendChild(div);
	div.appendChild(p);
	div.appendChild(img);
	div.appendChild(deleteBtn);

	//remove breed
	let deleteLink = collection.querySelectorAll(".delete-btn");
	for (var i = 0; i < deleteLink.length; i++) {
		deleteLink[i].addEventListener("click", function() {
			alert("Remove dog function worked!");
		});
	}
}

document.querySelector(".add-random").addEventListener("click", function() {
	addDog("random");
});

//Dropdown breed menu
async function selectDog() {
	const result = await fetch(breedListURL);
	const resultJson = await result.json();
	const data = resultJson.message;

	let option;

	let dropdown = document.querySelector(".add-breed");
	dropdown.length = 0;

	let defaultOption = document.createElement("option");
	defaultOption.text = "Choose a breed";

	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;
	for (let i = 0; i < data.length; i++) {
		option = document.createElement("option");
		option.text = data[i];
		option.value = data[i];
		dropdown.add(option);
	}

	dropdown.addEventListener("change", function() {
		//duplicate breed alert
		let pChild = collection.querySelectorAll("p");
		for (let i = 0; i < pChild.length; i++) {
			if (pChild[i].textContent === this.value) {
				alert("You have already added this breed");
			}
		}
		//add breed to collection
		return addDog(this.value);
	});
}

selectDog();