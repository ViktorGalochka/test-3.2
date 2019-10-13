
let input = document.querySelector('input');
let result = document.querySelector('.book-search-result');
input.value = '';

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
 
let myEfficientFn = debounce(function() {
    let val = this.value;
    if(val.length > 3 ) {
        while (result.hasChildNodes()) {
            result.removeChild(result.firstChild);
        }
            fetch("https://www.googleapis.com/books/v1/volumes?q=" +val)
            .then(res => res.json())
            .then(data => {
                data.items.forEach(item => {
                    console.log(item);
                    let book = document.createElement('a');
                    book.textContent = item.volumeInfo.title;
                    book.setAttribute('href', item.volumeInfo.infoLink);
                    book.setAttribute('title', 'Info');
                    result.appendChild(book);
                });
            })
            .catch(() => console.log("some error..."));
    }
}, 3000);
input.addEventListener('keyup', myEfficientFn);
