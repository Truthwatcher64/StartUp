function loadImageFile(){

  const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const imgUrl = `https://picsum.photos/id/${data[0].id}/900/300`;
        const imgHolder = document.getElementById('holder');
        const imgEl=document.createElement('img');
        imgEl.setAttribute('src', imgUrl);
        imgEl.style.padding=10;
        imgHolder.appendChild(imgEl)
      
      });
}
loadImageFile()
