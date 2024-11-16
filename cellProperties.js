
//cellProperties.js
//storage
let collectedSheetDB = [];//contains all sheet DB
 let sheetDB =[];

 {
  let addSheetBtn = document.querySelector(".sheet-add-icon");
  addSheetBtn.click();
  //handleSheetProperties();
 }
// for(let i=0;i<row;i++){
//     let sheetRow = [];
//    for(let j=0;j<col;j++){
//     let cellProp ={
//         bold:false,
//         italic:false,
//         underline:false,
//         alingnment:'left',
//         fontFamily:'monospace',
//         fontSize:14,
//         fontColor:'#000000',
//         BGcolor:'#000000',
//         value:"",
//         formula:"",
//         children: [],

//     }
//     sheetRow.push(cellProp);
//    }
//    sheetDB.push(sheetRow);
// }
let activeColorProp ="#bdc3c7";
let inactiveColorProp="#f5f6fa"
//selector for cell properties
let bold  = document.querySelector(".bold");
let italic  = document.querySelector(".italic");
let underline  = document.querySelector(".underline");
let alignment  = document.querySelectorAll(".alignment");
let fontSize  = document.querySelector(".font-size-prop");
let fontFamily  = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".fontColor-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

let leftAlign=alignment[0];
let centerAlign = alignment[1]
let rightAlign = alignment[2]
// let addressBar = document.querySelector(".address-bar");

//attach property Listener || application of way binding

//for bold
bold.addEventListener("click" ,(e)=>{
   let address= addressBar.value;
 let [cell , cellProp] =getActiveCell(address);
 //modification 

 cellProp.bold = !cellProp.bold;///data change

 cell.style.fontWeight = cellProp.bold ?  "bold": "normal";//UI change
 bold.style.backgroundColor =cellProp.bold ? activeColorProp :inactiveColorProp;

})

//for italic
italic.addEventListener("click" ,(e)=>{
    let address= addressBar.value;
  let [cell , cellProp] =getActiveCell(address);
  //modification 
 
  cellProp.italic = !cellProp.italic;///data change
 
  cell.style.fontStyle = cellProp.italic ?  "italic": "normal";//UI change
  italic.style.backgroundColor =cellProp.italic ? activeColorProp :inactiveColorProp;
 
 })
 
//for underline
underline.addEventListener("click" ,(e)=>{
let address= addressBar.value;
let [cell , cellProp] =getActiveCell(address);
  //modification 
 
  cellProp.underline = !cellProp.underline;///data change
 
  cell.style.textDecoration = cellProp.underline ?  "underline": "none";//UI change
  underline.style.backgroundColor =cellProp.underline ? activeColorProp :inactiveColorProp;
 
 })
 

 //for font - size 
  fontSize.addEventListener("change" ,(e)=>{
    let address= addressBar.value;
    let [cell , cellProp] =getActiveCell(address);
      //modification 
    cellProp.fontSize = fontSize.value; //data change 
    cell.style.fontSize = cellProp.fontSize+"px" ;
    fontSize.value= cellProp.fontSize;
  })

  //for font family 

  fontFamily.addEventListener("change" ,(e)=>{
    let address= addressBar.value;
    let [cell , cellProp] =getActiveCell(address);
      //modification 
    cellProp.fontFamily = fontFamily.value; //data change 
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value= cellProp.fontFamily;
  })

  //font-color
  fontColor.addEventListener("change" ,(e)=>{
    let address= addressBar.value;
    let [cell , cellProp] =getActiveCell(address);
      //modification 
    cellProp.fontColor = fontColor.value; //data change 
    cell.style.color = cellProp.fontColor;
    fontColor.value= cellProp.fontColor;
  })


  //BgColor
  BGcolor.addEventListener("change" ,(e)=>{
    let address= addressBar.value;
    let [cell , cellProp] =getActiveCell(address);
      //modification 
    cellProp.BGcolor = BGcolor.value; //data change 
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value= cellProp.BGcolor;
  })
  //text alignment

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click" ,(e)=>{
        let address= addressBar.value;
        let [cell , cellProp] =getActiveCell(address);
        let alignValue = e.target.classList[0];
        cellProp.alignment =alignValue;
        cell.style.textAlign = cellProp.alignment;
        console.log(alignValue);
        switch(alignValue){
            case "left":
            leftAlign.style.backgroundColor =activeColorProp;
            centerAlign.style.backgroundColor=inactiveColorProp;
            rightAlign.style.backgroundColor=inactiveColorProp;  
            break;
            
            case "center":
            leftAlign.style.backgroundColor =inactiveColorProp;
            centerAlign.style.backgroundColor=activeColorProp;
            rightAlign.style.backgroundColor=inactiveColorProp;
                break;

            case "right":
            leftAlign.style.backgroundColor =inactiveColorProp;
            centerAlign.style.backgroundColor=inactiveColorProp;
            rightAlign.style.backgroundColor=activeColorProp;
                break;
        }

      

    })
  });
  let allCells = document.querySelectorAll(".cell");
  for(let i=0;i<allCells.length;i++){
    addListenerToAttachedCellProperties(allCells[i]);
  }

function addListenerToAttachedCellProperties(cell){
cell.addEventListener("click" , (e)=>{
  let address= addressBar.value;
  let [rid,cid] = decodeRIDCID(address)
  let cellProp =sheetDB[rid][cid];

  

  // apply cell properties
  cell.style.fontWeight = cellProp.bold ?  "bold": "normal";//UI change
  cell.style.fontStyle = cellProp.italic ?  "italic": "normal";//UI change
  cell.style.textDecoration = cellProp.underline ?  "underline": "none";//UI change
  cell.style.fontSize = cellProp.fontSize+"px" ;//for font
  cell.style.fontFamily = cellProp.fontFamily;//for the font family UI change
  cell.style.color = cellProp.fontColor;//for font color 
  cell.style.backgroundColor = cellProp.BGcolor ==="#000000" ?"transparent":cellProp.BGcolor;//cell background color 
  //ui change in cell alignment 
  cell.style.textAlign = cellProp.alignment;
  

  //ui change in container of icon
  bold.style.backgroundColor =cellProp.bold ? activeColorProp :inactiveColorProp;

  italic.style.backgroundColor =cellProp.italic ? activeColorProp :inactiveColorProp;

  underline.style.backgroundColor =cellProp.underline ? activeColorProp :inactiveColorProp;

  fontSize.value= cellProp.fontSize;
  fontFamily.value= cellProp.fontFamily;
  fontColor.value= cellProp.fontColor;
  BGcolor.value= cellProp.BGcolor;
  //alignent 
  switch(cellProp.alignment){
    case "left":
    leftAlign.style.backgroundColor =activeColorProp;
    centerAlign.style.backgroundColor=inactiveColorProp;
    rightAlign.style.backgroundColor=inactiveColorProp;  
    break;
    
    case "center":
    leftAlign.style.backgroundColor =inactiveColorProp;
    centerAlign.style.backgroundColor=activeColorProp;
    rightAlign.style.backgroundColor=inactiveColorProp;
        break;

    case "right":
    leftAlign.style.backgroundColor =inactiveColorProp;
    centerAlign.style.backgroundColor=inactiveColorProp;
    rightAlign.style.backgroundColor=activeColorProp;
        break;
  }
  let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.innerText = cellProp.value;

})
}  
   
function getActiveCell(address){
  let [rid,cid] = decodeRIDCID(address)
  //access cell and storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell,cellProp];
}
function decodeRIDCID(address){
    //address -> A1
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) -65;
    return [rid,cid]
}




