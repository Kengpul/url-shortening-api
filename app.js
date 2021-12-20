const text = document.querySelector("#shorten-text")
const submit = document.querySelector("#shorten-submit")

const shorten = async(originalLink) => {
    const link = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalLink}`);
    const data = await link.json();
    displayShortenLink(data.result.original_link, data.result.short_link);
}

submit.addEventListener("click", () => {
    shorten(text.value);
})

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
    button.innerText = "Copy!";
}