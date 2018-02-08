const utils = require('./utils.js');

let postits = [
	createPostit("postit_1", "TODO #1", "Content #1"),
	createPostit("postit_2", "TODO #2", "Content #2")
];

const createPostit = (id = utils.uniqueId(), title, content) => {
	return {
		uniqueId: id,
		title: title,
		content: content,
	};
};

const renderPostit = (postit) => {
    return `<div class="postit" id=${postit.uniqueId}>
	    <li>
		    <div class="postit-animation">
		    	<h2>${postit.title}</h2>
		        <p>${postit.content}</p>
		    </div>
	    </li>
	</div>`;
};

const renderPostits = (postits) => {
    // get the posts element
    let postitsElm = document.querySelector('.postits');

    // render postits inside postitsElm
    postitsElm.innerHTML = postits.map(p => renderPostit(p)).join('');

    // let imageElms = document.querySelectorAll('.post .content .image');

    // imageElms.forEach(el => el.addEventListener('dblclick', function () {
    //     *
    //      * TODO 8: Print 'this' keyword to the developer console and explain what's contained in 'this'
    //      *  hint: who is calling this function and when
         

    //     let postId = this.parentNode.parentNode.getAttribute('data-post-id');
    //     increaseLike(posts, postId);
    // }));
};

const initialize = () => {
    let initState = localStorage.getItem('postits');
    if (initState !== null) {
        postits = JSON.parse(initState);
    }
    renderPostits(postits);
    console.log("got in here");
};

initialize();
