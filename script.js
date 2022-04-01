//http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick
//http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline

const url = "https://makeup-api.herokuapp.com/api/v1/products.json";
//This is the Make-up API which I will be using in this project.

//So now i will create a async func to display the data and try-catch method to handle error.
async function makeUp() {
    try {
        let data = await apiData();
        let jsonData = await data.json();
        // console.log(jsonData);
    } catch (error) {
        console.log(error);
    }
}

makeUp();

//This func is to fetch the data.
function apiData() {
    return fetch(url);
}


//To make it things neat and tidy i used a function to create the html elements.
function createElement(elementName, attribute1, attributeValue1, content, attribute2, attributeValue2) {
    var element = document.createElement(elementName);
    element.setAttribute(attribute1, attributeValue1);
    element.setAttribute(attribute2, attributeValue2);
    element.innerHTML = content;
    return element;
}

let container = createElement('div', 'class', 'container', '', 'id', 'main');
document.body.append(container);

let homePage = createElement('a', 'class', 'home_page', 'Make Up', 'href', '#home');
container.append(homePage);

let searchContainer = createElement('div', 'class', 'search_container', '');
container.append(searchContainer);

let form = createElement('form', 'action', '', '', 'class', 'active');
searchContainer.append(form);

let searchBar = createElement('input', 'type', 'text', '', 'id', 'search_bar');
searchBar.setAttribute("placeholder", "Which Brand do u like?");
form.append(searchBar);

let button = document.createElement("button");
button.addEventListener("click", (e) => {
    //to prevent onclick reload in the website i used prevent default.
    e.preventDefault();
});
button.setAttribute("onclick", "gtData()"); //i used an onclick attribute to trigger the function which then displays the content.
button.setAttribute("class", "btn1");
button.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
form.append(button);


//This function basically takes the input value and appends at the end of the url(***result variable***) and which is then used to 
//display the data in html file.

//Everything is sorted only by brand.
async function gtData() {
    let res = document.getElementById("search_bar").value;
    console.log(res);
    let result = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${res}`);
    let final = await result.json();
    // console.log(final);

    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "main_div");
    document.body.append(mainDiv);

    //i have for loop to create the elements
    for (var i = 0; i < final.length; i++) {
        // console.log();
        let ele = document.createElement("div");
        ele.setAttribute("class", "content");
        ele.setAttribute("id", "content1")
        mainDiv.append(ele);

        let img = document.createElement("img")
        img.setAttribute("src", `${final[i].api_featured_image}`)
        ele.append(img)

        let h1 = document.createElement("h1");
        h1.innerHTML = `${final[i].brand}`;
        ele.append(h1);

        let a = document.createElement("a"); //i created a "a" to show the product name and when click on the name you will be sent to the product page.
        a.setAttribute("href", `${final[i].product_link}`);
        a.innerHTML = `${final[i].name}`;
        ele.append(a);

        let p1 = document.createElement("p");
        p1.innerHTML = `$${final[i].price}`;
        ele.append(p1);

        let p2 = document.createElement("p");
        p2.innerHTML = `${final[i].description}`;
        ele.append(p2);



    }
}

//That's it, i have also done some designing to make it look good.