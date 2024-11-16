//grid.js
let row = 100;
let col =26;
let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");

let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar")

for(let i=0;i<row;i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class" ,"addressCol");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<col;i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class" ,"addressRow");
    let char=i+65
    addressRow.innerText=String.fromCharCode(char);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<row;i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class" , "row-cont")
    for(let j=0;j<col;j++){
      let cell = document.createElement("div");
      cell.setAttribute("class" ,"cell")
      cell.setAttribute("contenteditable" , "true")
      rowCont.appendChild(cell);
      addListenerForAddressBarDispaly(cell ,i, j);
      //for cell identifiction
      cell.setAttribute("rid" ,i)
      cell.setAttribute("cid", j);
    //   cell.setAttribute("spellingcheck" ,true)
     
    }
    cellsCont.appendChild(rowCont);
}
function addListenerForAddressBarDispaly(cell,i,j){
 cell.addEventListener("click" , (e)=>{
let rowId = i+1;
let colId = String.fromCharCode(j+65);
addressBar.value =`${colId}${rowId}`;
 })
}
//by default click first cell via dom

let firstCell = document.querySelector(".cell");
firstCell.click();