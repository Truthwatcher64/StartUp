function loginHomePage() {
  const name = document.querySelector("#name");
  const password=document.querySelector("#password");
  localStorage.setItem("userName", name.value);
  localStorage.setItem("password", password.value);
  window.location.href = "game.html";

}

function loginScoresPage() {
    const name = document.querySelector("#name");
    const password=document.querySelector("#password");
    localStorage.setItem("userName", name.value);
    localStorage.setItem("password", password.value);
    loadScores();
  }

function logout(){
    localStorage.clear();
    loadScores();
}