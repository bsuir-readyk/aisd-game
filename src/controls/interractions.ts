const interractionsItemTransitionTime = 130;
const interractionsContainerSelector = "#interractions";
const interractionsContainer = document.querySelector(interractionsContainerSelector);
if (interractionsContainer === null) {
    throw new Error("interractionsContainer not found with selector: " + interractionsContainerSelector);
}

/** @description call .remove() when needed */
export const createInterractionButton = (text: string): HTMLElement => {
    const div = document.createElement("button");
    div.classList.add("item");
    div.textContent = text;
    interractionsContainer.appendChild(div);
    setTimeout(()=>{div.style.opacity = "1"}, 0);
    
    const realRemove = div.remove;
    div.remove = function() {
        div.style.opacity = "0";
        div.style.left = div.getBoundingClientRect().left + "px";
        div.style.top = div.getBoundingClientRect().top + "px";
        div.style.width = div.getBoundingClientRect().width + "px"
        div.style.position = "fixed";
        console.log(div.getBoundingClientRect().left)
        setTimeout(()=>realRemove.apply(this), interractionsItemTransitionTime);
    }

    return div;
}
