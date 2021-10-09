async function getUsers() {
    let url = '../../users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.forEach(user => {
        let htmlSegment = `
            <div class="user">
                <img src="${user.profileURL}">
                <p>${user.firstname} ${user.lastname}</p>
                <p class="email"><a href="mail:${user.email}">${user.email}</a></p>
            </div>`;
        html += htmlSegment;
    });

    let container = document.querySelector('#containUsers');
    container.innerHTML = html;
}

renderUsers();
