async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#name')?.value;
    console.log("Check name: "+userName);
    const password = document.querySelector('#password')?.value;
    console.log("Check password: "+password);
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        window.location.href = 'game.html';
    } else {
    console.log(body.msg);
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    // const msgModal = new bootstrap.Modal(modalEl, {});
    // msgModal.show();
    modalEl.innerHTML=body.msg;
    }
}

    function logout() {
        localStorage.removeItem('userName');
        localStorage.removeItem('scores');
        fetch(`/api/auth/logout`, {
          method: 'delete',
        }).then(() => (window.location.href = '/'));
    }

    async function getUser(username) {
        let scores = [];
        // See if we have a user with the given email.
        const response = await fetch(`/api/user/${username}`);
        //200 is ok code
        if (response.status === 200) {
            return response.json();
        }
        
        return null;
    }