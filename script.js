'use strict';


const searchBar = document.querySelector('.search-bar-card');
const searchBarBtn = document.getElementById('shorten-it-btn');
const searchBarInput = document.querySelector('.search-bar-input');
const emailInput = document.querySelector('.email-input');
const emailError = document.querySelector('.email-input p');
const sectionsPageIntro = document.querySelector('.sections-page-intro');

let copyButton;
let buttonCount = 0;

searchBar.addEventListener('submit', async function (event) {
    event.preventDefault();

    let userURL = event.target.querySelector('.search-bar-input').value;

    if (userURL === '') {
        console.error("Email Input invalid!");
        emailError.textContent = "Please add a link";
        emailInput.style.display = 'block';
    } else {
        emailInput.style.display = 'none';

        const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '79daedce06mshfcb6ef29c1bc9b4p10dfdejsn2ab759b13e85',
                'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
            },
            body: new URLSearchParams({
                url: 'https://google.com/'
            })
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const parsedResult = JSON.parse(result);
            const link = parsedResult.result_url;

            createNewElement(userURL, link);
        } catch (error) {
            console.error(error);
        }
        searchBarInput.value = '';
        console.log(searchBarInput);
    }

});

searchBarBtn.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Buttn clicked!");
});


const createNewElement = function (url, link) {
    let html = `
        <div class="user-link-card">
            <div class="link-container">
                <p class="website-link">${url}</p>
                <a href="${link}">${link}</a>
            </div>
            <button id="${buttonCount}" class="btn">Copy</button>
        </div>
        `;
    sectionsPageIntro.insertAdjacentHTML('beforebegin', html);
    let button = document.getElementById(`${buttonCount}`);

    button.addEventListener('click', async function() {
        /* Select the text field */
        try {
            await navigator.clipboard.writeText(link);
            button.style.background = 'hsl(257, 27%, 26%)';
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.style.background = 'hsl(180, 66%, 49%)';
                button.textContent = 'Copy';
            }, 2000)
        } catch (err) {
            console.error('Failed to copoy text: ', err);
        }
    })
    buttonCount++;
};
