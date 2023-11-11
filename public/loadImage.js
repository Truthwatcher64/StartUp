function loadImageFile(){

    const random = Math.floor(Math.random() * 1000);
      fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
        .then((response) => response.json())
        .then((data) => {
          const imgUrl = `https://picsum.photos/id/${data[0].id}/900/300`;
          const imgEl = document.getElementById('picture')
          imgEl.setAttribute('src', imgUrl);
          imgEl.style.padding=10;
        });
}