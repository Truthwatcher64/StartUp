**Bold**

*Italics*

# Very Big

## Smaller

### Not So Big
HTTP
Ports
- Caddy acts as a gateway to split off of one entry port
- 80 http
- 443 https
- 22 ssh

Error
- 300 error, redirection message, address changed, or redirect
- 400 error, client problem, authentication, blocked access, bad request
- 500 error, serverside error,

Headers
- content type tells the browser what is in the body usually text/html or application/json

Express/DB
- store passwords with hash and salt, bcrypt

Cookies
- SameSite, None: cookie goes everywhere, strict: only to top-level
- HTTPOnly, only can be accessed by the server, no javscript can read or edit it
- Path, path for valid requests
- Domain, domain and subdomain of the cookies

Websockets
- asdf

Node
- allows javascript to be run outside of a browser
- adds functionality to the project, has javascript on the front and back end
- allows for easy use of node packages, from npm
- package.json, metadata, commands, required packages list
- node_modules, folder with all the dependencies
- package-lock.json, has the versions of each package

Vite
- real time code deployment
- builds projects, bundling
- toolchain
- polyfill, transpiler, minifies

CSS 
- button, all buttons
- .button, anything as a button class
- #button, anything with the id of button

From Inside to Outside
- content/object
- padding
- border
- margin
- parent

Links
- <link href="main.css" rel="stylesheet">
- <script src="game.js"></script>
- <a href="index.html">click me</a>
- <a href="imagePage.html"> <img src="smiley.jpg"> </a> 

Loops

let x;

for(x=0; x<5; x++){

//body

}

Can initiallize x in header and can increment in body as well, break will end loop

---

//for each

for(let thing in leaderList){

//body

}

//thing is a variable inside of the object/list/array leaderList

---

flex column - vertical top to bottom

flex row - left to right

justify: center, flex-start, flex-end, space around, space between

align-items: center, flex-start, flex-end, stretch*, baseline 

