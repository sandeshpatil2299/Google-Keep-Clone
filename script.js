let addNotes= document.getElementById("addNotes");
let parentNote= document.getElementById("parentNote");

const saveToLocal= () =>
{
   let textAreaData= document.querySelectorAll("textarea");
   const notes= [];

   textAreaData.forEach((element) =>
   {
      return notes.push(element.value);
   })

   localStorage.setItem("notes", JSON.stringify(notes));
}

const createNotes= (text= "") =>
{
   let nDiv= document.createElement("div");
   nDiv.className= "notes container";

   nDiv.innerHTML=
   `  <div class="takeNotes ">
         <div class="main ${text ? "" : "hidden"}"></div>
         <textarea class="${text ? "hidden" : ""}"></textarea>
      </div>

      <div class="noteButtons">
         <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
         <button id="delete"><i class="fa-solid fa-trash"></i></button>
      </div>`

   parentNote.appendChild(nDiv);

   let main= nDiv.querySelector(".main");
   let textArea= nDiv.querySelector("textarea");
   let edit= nDiv.querySelector("#edit");
   let del= nDiv.querySelector("#delete");

   //deleting notes
   del.addEventListener("click", () =>
   {
      nDiv.remove();
      saveToLocal();
   })

   textArea.value= text;
   main.innerHTML= text;
   //edit toggle
   edit.addEventListener("click", () =>
   {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
   })

   //text save
   textArea.addEventListener("change", (event) =>
   {
      let userText= event.target.value;
      main.innerHTML= userText;

      //saving to local storage  
      saveToLocal();
   } )
}

//getting data from local storage
const getData= JSON.parse(localStorage.getItem("notes"));
if(getData)
{
   getData.forEach((element) =>{
      createNotes(element);
   })
}

addNotes.addEventListener("click", () => createNotes());