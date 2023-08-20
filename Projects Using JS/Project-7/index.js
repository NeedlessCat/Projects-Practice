const qrFormEl =document.getElementById("qrForm");
const qrImageEl = document.getElementById("qrImage");
const qrContainerEl = document.getElementById("qrContainer");
const qrInputEl = document.getElementById("qrInput")
const generateBtnEl = document.getElementById("generateBtn");

const renderQRCode = (url) => {
	if(!url) return;
	generateBtnEl.innerText = "Generating QR Code ...";
	qrImageEl.src = url;
	//qrContainerEl.classList.add("show");

	const onImageLoad = () => {
		
		const interval = setInterval(() => {
			qrContainerEl.classList.add("show");
			clearInterval(interval);
			generateBtnEl.innerText = "Generate QR Code";
		}, 500);

	};
	// qrImageEl.addEventListener("load",() => {
	// 	generateBtnEl.innerText = "Generate QR Code";
	// });
	qrImageEl.addEventListener("load", onImageLoad);
}; 

qrFormEl.addEventListener("submit",(event) => {
	event.preventDefault();

	const formData = new FormData(qrFormEl);
	const text = formData.get("qrtext"); 

	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;

	console.log("text",text);
	renderQRCode(qrCodeUrl);
});

qrInputEl.addEventListener("keyup",(event) => {
	event.preventDefault();

	if(!qrInputEl.value.trim()) {
		qrContainerEl.classList.remove("show");
	}
});