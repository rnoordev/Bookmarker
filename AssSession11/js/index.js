var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkURLInput = document.getElementById("bookmarkURLInput");
var bookmarksArr = [];
if (localStorage.getItem("bookmarks") != null) {
    bookmarksArr = JSON.parse(localStorage.getItem("bookmarks"))
    disblyBookmarks();
}


function addBookmark() {
    var bookmark = {
        name: bookmarkNameInput.value,
        url: bookmarkURLInput.value,
    }
    if (!bookmark.name || !bookmark.url) {
        alert('Please fill in both fields');
        return;
    }

    if (!isValidUrl(bookmark.url)) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
    }
    bookmarksArr.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArr))

    disblyBookmarks();
}

function isValidUrl(url) {
    try {
        new URL(url.startsWith('http') ? url : `https://${bookmark.url}`);
        return true;
    } catch (e) {
        return false;
    }
}


function disblyBookmarks() {
    var cartoona = ""
    for (var i = 0; i < bookmarksArr.length; i++) {
        cartoona += ` <tr>
                        <td>${i}</td>
                        <td>${bookmarksArr[i].name}</td>
                        <td>
                          <button class="btn btn-visit" onclick="visitBookmark(${i})">
                             <i class="fa-solid fa-eye pe-2"></i>Visit
                          </button>
                        </td>
                         <td>
                              <button class="btn btn-delete pe-2" onclick="deleteBookmark(${i})" >
                                    <i class="fa-solid fa-trash-can"></i>
                                     Delete
                              </button>
                         </td>
                        
                    </tr>`;
    }
    document.getElementById("tbody").innerHTML = cartoona;
}

function deleteBookmark(indexBookmark) {
    bookmarksArr.splice(indexBookmark, 1);
    disblyBookmarks();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArr))

}


function visitBookmark(indexBookmark) {
    var url = bookmarksArr[indexBookmark].url;
    window.open(url, '_blank');
}
