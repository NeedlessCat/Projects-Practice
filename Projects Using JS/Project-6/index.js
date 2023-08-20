const generateBtnEl = document.getElementById("generateBtn");

const hexColor = () => {
	const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
	let color = "#";

	for(let i=0;i<6;i++) {
		let rand = Math.floor(Math.random() * hex.length);
		color += hex[rand];
	}
	return color;
};

const colorPalette = () => {

	const colorSet = [];

	for(let i=0;i<4;i++) {
		colorSet.push(hexColor());
	}
	return colorSet;
};


const renderColorPalette = () => {
	// console.log("color Btn");

	const colorContainerEl = document.getElementById("colorContainer");
	colorContainerEl.innerHTML = "";

	const colors = colorPalette();
	colors.forEach((color,i) => {
		const colorDiv = document.createElement("div");
		colorDiv.id = `color${i+1}`;
		colorDiv.style.background = color;
		colorDiv.className = "colorBox";

		const colorTag = document.createElement("p");
		colorTag.id = `color${i+1}Tag`;
		colorTag.innerHTML = color
		colorTag.className = "colorText";

		colorDiv.append(colorTag);
		colorContainerEl.append(colorDiv);
		
	});

	const copytoClipBoard = (id) => {
    const el = document.getElementById(id);

    navigator.clipboard.writeText(el.innerText).then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        alert("Could not copy");
      });
  };

  const colorTags = document.querySelectorAll(".colorBox");
  colorTags.forEach((colorTag, i) => {
    colorTag.addEventListener("click", () =>
      copytoClipBoard(`color${i + 1}Tag`)
    );
  });
};
renderColorPalette();
generateBtnEl.addEventListener("click", renderColorPalette);