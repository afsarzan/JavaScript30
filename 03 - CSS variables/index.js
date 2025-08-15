const myControls = document.querySelectorAll(".controles input")
function activeChange(){
    document.documentElement.style.setProperty(`--${this.name}`,this.value + this.dataset.sizing)
}
myControls.forEach(input =>input.addEventListener('change',activeChange));
myControls.forEach(input =>input.addEventListener('mousemove',activeChange));