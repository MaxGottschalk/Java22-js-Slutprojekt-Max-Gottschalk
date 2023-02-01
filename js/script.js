
//Initializes all DOM elements
const apiKey = "e88258294e0d72ea3d35ddf5c77e4480";
const textInput = document.querySelector("#textInput");
const imgAmountInput = document.querySelector("#imgAmountInput");
const imgSize = document.querySelector("#imgSize");
const imgContainer = document.querySelector("#imgContainer");
const sortby = document.querySelector("#sortby");

//Checks if button is pressed 
document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();
    imgContainer.innerHTML = "";
    getApiImg();
});

//Gets the information from the Api and the users input to get a result 
function getApiImg() {

    const textValue = textInput.value;
    const amountValue = imgAmountInput.value;
    const sortbyValue = sortby.value;

    console.log(textValue);
    console.log(sortbyValue);
    const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${textValue}&sort=${sortbyValue}&per_page=${amountValue}&format=json&nojsoncallback=1`;

    //Checks if input value is empty
    if (textValue === "") {
        const errorMessage = document.createElement("h1");

        errorMessage.innerText = "Please fill in all search fields";
        imgContainer.append(errorMessage);

    } else {
        fetch(apiUrl)
            .then(response => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw "Error"
                }
            }).then(displayImg)
            .catch(error => {
                const errorMessage = document.createElement("h1");

                errorMessage.innerText = "There was an internet probelm";
                imgContainer.append(errorMessage);
                console.log(error);
            });
    }
}

//Takes the provided information and displays the result 
function displayImg(apiInfo) {
    const sizeValue = imgSize.value;
    imgContainer.innerHTML = "";

    //Checks if input is equal to something that does not exist 
    if (apiInfo.photos.photo.length === 0) {
        const errorMessage = document.createElement("h1");

        errorMessage.innerText = "There is no images of " + textInput.value;
        imgContainer.append(errorMessage);
    } else { //Creates an image and puts a link on it
        apiInfo.photos.photo.forEach(photo => {
            const img = document.createElement("img");
            const a = document.createElement("a");

            img.src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sizeValue}.jpg`;

            a.href = img.src;
            a.target = "_blank";

            imgContainer.append(a);
            a.append(img);
        });
    }
}