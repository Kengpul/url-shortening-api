const text = document.querySelector("#shorten-text")
const submit = document.querySelector("#shorten-submit")
const errorIndication = document.querySelector("#error-indication");

const shorten = async(originalLink) => {
    const link = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalLink}`);
    const data = await link.json();
    displayShortenLink(data.result.original_link, data.result.short_link);
    text.value = "";
}

submit.addEventListener("click", () => {
    if (text.value.indexOf(".com") !== -1 
        || text.value.indexOf(".org") !== -1 
        || text.value.indexOf(".tk") !== -1
        || text.value.indexOf(".net") !== -1
        || text.value.indexOf(".de") !== -1
        || text.value.indexOf(".uk") !== -1
        || text.value.indexOf(".cn") !== -1
        || text.value.indexOf(".ru") !== -1
        || text.value.indexOf(".info") !== -1
        || text.value.indexOf(".io") !== -1
        || text.value.indexOf(".ph") !== -1
        ) {
        errorIndication.style.display = "none";
        text.style.border = "none";
        shorten(text.value);
    } else if (text.value === ""){
        error("Please enter a link");
    } else {
        error("Invalid link");
    }
})

const error = (message) => {
    errorIndication.innerText = message;
    errorIndication.style.display = "block";
    text.style.border = "3px solid hsl(0, 87%, 67%)";
}

const displayShortenLink = (original, short) => {
    const column = document.querySelector(".mini-card-column");
    const miniCard = document.createElement("div");
    const originalLink = document.createElement("div");
    const shortenLink = document.createElement("div");
    const button = document.createElement("button");
    const shortenLinkParagraph = document.createElement("p");
    const originalLinkParagraph = document.createElement("p");
    
    miniCard.classList.add("mini-card");
    originalLink.classList.add("original-link");
    shortenLink.classList.add("shorten-link");
    button.classList.add("btn", "btn-primary");
    
    column.append(miniCard);
    shortenLink.append(shortenLinkParagraph, button);
    originalLink.append(originalLinkParagraph);
    miniCard.append(originalLink, shortenLink);
    
    originalLinkParagraph.innerText = original;
    shortenLinkParagraph.innerText = short;
    button.innerText = "Copy";

    button.addEventListener("click", function() {
        navigator.clipboard.writeText(shortenLinkParagraph.innerText)
        button.innerText = "Copied";
        setTimeout(() => {
            button.innerText = "Copy";
        }, 1000)
    })
}