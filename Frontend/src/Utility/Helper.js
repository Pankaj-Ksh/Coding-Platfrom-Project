
export const toggleClass = (id, property1) => {
    let element = document.querySelector(id);
    element.classList.toggle(property1);
}