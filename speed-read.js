var elements = document.querySelectorAll(`p, h1, h2, h3, h4, h5, h6, ul`);
var hyperlinks = document.getElementsByTagName(`a`);

// Edit all text in elements
for (let i=0; i<elements.length; i++) {
    var text = elements[i].innerText;
    if (text !== ``) {
        const words = text.match(/(?<!')\b[^\d\W]+\b/g);
        for (let j in words) {
            var pattern = `(?<!<|")\\b` + words[j] + `\\b(?!>)`;
            var regex = new RegExp(pattern, `g`);
            elements[i].innerHTML = elements[i].innerHTML.replace(regex, boldString(words[j]));
        }
    }
}

// Fix broken hyperlinks
for (let i=0; i<hyperlinks.length; i++) {
    var regex = /<b>|<\/b>/g;
    var href = hyperlinks[i].getAttribute(`href`);
    var title = hyperlinks[i].getAttribute(`title`); 
    hyperlinks[i].href = href.replace(regex, ``);
    if (title !== null) {
        hyperlinks[i].title = title.replace(regex, ``);
    }
}

// Bold beginning of each string
function boldString(str){
    switch(str.length){
        case 1:
        case 2:
        case 3:
            return str.slice(0, 1).bold() + str.slice(1);
        case 4:
            return str.slice(0, 2).bold() + str.slice(2);
        default:
            var lengthBold = Math.round(str.length * 0.6);
            return str.slice(0, lengthBold).bold() + str.slice(lengthBold);
    }
}
