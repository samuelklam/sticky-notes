import { uniqueId } from './utils.js';

let postits = [
    createPostit("TODO#1", "Content #1", "postit_1"),
    createPostit("TODO #2", "Content #2", "postit_2")
];

const renderPostit = (postit) => {
    return `<div class="postit" data-postit-id=${postit.uniqueId}>
        <li>
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
function createPostit(title, content, id = uniqueId()) {
    return {
        uniqueId: id,
        title: title,
        content: content
    };
};

/**
 * Creates a postit on the board
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
    let createPostitForm = document.querySelector('button')
    createPostitForm.addEventListener("click", function(e) {
        let localState = (localStorage.getItem('postits'));
        postits = (postits === null) ? [] : JSON.parse(localState);
        let newPostit = createPostit("TITLE", "CONTENT", uniqueId())
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
