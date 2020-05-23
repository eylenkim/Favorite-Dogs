const randomURL = "https://dog.ceo/api/breeds/image/random";
const breedListURL = "https://dog.ceo/api/breeds/list";
const collection = document.querySelector(".collection");

//add breed to collection function
async function addDog(breedType) {
	var breedName, result, resultJson;

	if (breedType === "random") {
		url = "https://dog.ceo/api/breeds/image/random";
		result = await fetch(url);
		resultJson = await result.json();
		data = resultJson.message;

		//omit sub-breed and only display main breed
		function indexSymbol() {
			//if there is a sub breed, end of the index is - before it starts
			if (data.slice(0, data.indexOf("/", 30)).includes("-")) {
				return "-";
				//else, if there isn't a sub breed AND there is a - after breedName/, end of index is the fifth /
			} else if (
				!(
					data.slice(0, data.indexOf("/", 30)).includes("-") &&
					data.includes("-", data.indexOf("/", 31))
				)
			) {
				return "/";
			} else {
				return "/";
			}
		}

		var lastIndex = data.indexOf(indexSymbol(), 30);
		var slicedName = data.slice(30, lastIndex);
		breedName = slicedName.toUpperCase();

		//remove duplicate random. If duplicate, run random function again
		let pChild = collection.querySelectorAll("p");
		for (let i = 0; i < pChild.length; i++) {
			if (pChild[i].textContent === breedName) {
				return addDog("random");
				breedName.remove();
			}
		}
	} else {
		url = `https://dog.ceo/api/breed/${breedType}/images/random`;
		breedName = breedType.toUpperCase();
		result = await fetch(url);
		resultJson = await result.json();
		data = resultJson.message;
	}

	const img = document.createElement("img");
	const p = document.createElement("p");
	const div = document.createElement("div");
	const deleteBtn = document.createElement("button");

	img.src = data;
	img.alt = `Picture of ${breedName}`;
	div.className = "dog-entry";
	deleteBtn.className = "delete-btn";

	p.textContent = breedName.toUpperCase();
	deleteBtn.textContent = '⊗';

	collection.appendChild(div);
	div.appendChild(p);
	div.appendChild(deleteBtn);
	div.appendChild(img);

	//remove breed
	let deleteLink = collection.querySelectorAll(".delete-btn");
	for (var i = 0; i < deleteLink.length; i++) {
		deleteLink[i].addEventListener("click", function() {
			this.parentElement.remove();
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
		option.text = data[i].toUpperCase();
		option.value = data[i];
		dropdown.add(option);
	}

	dropdown.addEventListener("change", function() {
		//duplicate breed alert
		let pChild = collection.querySelectorAll("p");
		for (let i = 0; i < pChild.length; i++) {
			if (pChild[i].textContent === this.value.toUpperCase()) {
				alert("This breed is already in your collection.");
				this.value.remove();
			}
		}
		//add breed to collection
		return addDog(this.value);
	});
}

selectDog();