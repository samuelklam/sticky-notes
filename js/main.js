import { uniqueId, randColor } from './utils.js';

let postits = [
    createPostit("TODO#1", "Content #1"),
    createPostit("TODO #2", "Content #2")
];

const renderPostit = (postit) => {
    return `<div class="postit" data-postit-id=${postit.uniqueId}>
        <li style="color:${postit.color}">
            <div class="postit-animation">
                <h2>${postit.title}</h2>
                <p>${postit.content}</p>
                <div class="delete-postit">
                    <img src="./img/delete-postit.png">
                    CLICK TO DELETE
                </div>
            </div>
        </li>
    </div>`;
};

const renderPostits = (postits) => {
    // get the posts element
    let postitsElm = document.querySelector('.postits');

    // render postits inside postitsElm
    postitsElm.innerHTML = postits.map(p => renderPostit(p)).join('');

    let deletePostitElms = document.querySelectorAll('.delete-postit');

    deletePostitElms.forEach(el => el.addEventListener('click', function() {
        let postitId = this.parentNode.parentNode.parentNode.getAttribute('data-postit-id');
        deletePostit(postits, postitId);
    }));
};

/**
 * Constructor to create a new postit
 */
function createPostit(title, content, color = randColor(), id = uniqueId()) {
    return {
        uniqueId: id,
        title: title,
        color: color,
        content: content
    };
};

/**
 * Add a postit on the board
 */
function addPostit(postits, postit) {
    postits.push(postit);
    localStorage.setItem('postits', JSON.stringify(postits));
    renderPostits(postits);
}

function deletePostit(postits, postitId) {
    postits = postits.filter(p => p.uniqueId !== postitId);
    localStorage.setItem('postits', JSON.stringify(postits));
    renderPostits(postits);
}

function initCreatePostitButton() {
    let newPostit = document.querySelector('button')
    newPostit.addEventListener("click", function(e) {
        let localState = localStorage.getItem('postits');
        postits = (postits === null) ? [] : JSON.parse(localState);

        let title = prompt("Please enter a title for the postit");
        let content = prompt("Please enter the content for the postit");
        let newPostit = createPostit(title, content);

        addPostit(postits, newPostit);
    });
}

const initialize = () => {
    let initState = localStorage.getItem('postits');
    if (initState != null) {
        // JSON: 
        postits = JSON.parse(initState); 
    }
    renderPostits(postits);
    initCreatePostitButton();
};

initialize();
