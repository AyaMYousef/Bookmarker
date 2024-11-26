//CRUD

var siteName = document.getElementById('bookMarkName');
var siteURL = document.getElementById('bookMarkURL');


var bookmarksList = [];
// check if there is items added before
if (localStorage.getItem('sites') !== null) {
    bookmarksList = JSON.parse(localStorage.getItem('sites'));
    displaySites();
}


// ADD Function To List

function addSite() {
    console.log('Add');
    if (validation(siteName) && validation(siteURL) && regexValidation(bookMarkName) && regexValidation(bookMarkURL)) {
        var siteObj = {
            id: Date.now(),
            sName: siteName.value,
            siteURL: siteURL.value
        }

        // if (validation()) {
        bookmarksList.push(siteObj);
        localStorage.setItem('sites', JSON.stringify(bookmarksList));
        console.log(bookmarksList);
        clearInputs();
        displaySites();
    }

    else {
        var modal = new bootstrap.Modal(document.getElementById('validationModal'));

        modal.show();
    }


}

//clear Inputs

function clearInputs() {
    siteName.value = null;
    siteURL.value = null;
}


//display
function displaySites() {
    console.log(bookmarksList);
    var box = ``;
    for (var i = 0; i < bookmarksList.length; i++) {

        box += `<tr>
                    <td>${i + 1}</td>
                    <td>${bookmarksList[i].sName}</td>
                    <td>
                    <a href="${bookmarksList[i].siteURL}" class="btn btn-outline-info btn-sm  pe-2" target="_blank">
                    <i class="fa-solid fa-eye"></i>
                       Visit
                    </a>
                    </td>
                    <td>
                    <button class="btn btn-outline-danger btn-sm  pe-2" data-index="0" onclick="deleteItem(${bookmarksList[i].id})">
                    <i class="fa-solid fa-trash"></i>
                        Delete
                            </button>
                    </td>
                </tr>`
    }
    document.getElementById('tableContent').innerHTML = box;
}

//Delete Item

function deleteItem(id) {

    var index = bookmarksList.findIndex(item => item.id === id);

    if (index !== -1) {
        bookmarksList.splice(index, 1);
    }
    displaySites();
    localStorage.setItem('sites', JSON.stringify(bookmarksList));

}



//Validation
function validation() {

    // Check if the bookmark name already exists
    var isNameExists = bookmarksList.some(bookmark => bookmark.sName.toLowerCase() === siteName.value.toLowerCase());

    if (isNameExists) {
        alert("This bookmark name already exists. Please choose a different name.");
        return false;
    }

    else {
        return true;
    }
}



// Regex validation

function regexValidation(input) {
    var Regex = {
        bookMarkName: /^.{3,}$/,
        bookMarkURL: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}([\/\w.-]*)*\/?$/

    }

    if (Regex[input.id].test(input.value)) {
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        input.nextElementSibling.classList.replace('d-block', 'd-none')
        console.log('true');
        return true;
    }
    else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        input.nextElementSibling.classList.replace('d-none', 'd-block')
        console.log('false');
        return false;
    }
}