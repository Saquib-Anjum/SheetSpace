//cutcopypaste.js
let ctrlKey ;
let copyBtn =  document.querySelector(".copy");
let cutBtn  =  document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
document.addEventListener("keydown", (e) =>{
 ctrlKey=e.ctrlKey;
})
document.addEventListener("keyup", (e) =>{
    ctrlKey=e.ctrlKey;
});
for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
       handleSelectedCell(cell);
    }
}
let  rangeStorage=[];
function handleSelectedCell(cell){
  cell.addEventListener("click" , (e)=>{
      if(!ctrlKey){
        return;
      }
      if(rangeStorage.length >= 2){
        handleSelectedCellUI()
        rangeStorage=[];
      } 
     // UI
     cell.style.border = "3px solid #05c46b";
    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));
    rangeStorage.push([rid ,cid]);
    console.log("Selected cells:", rangeStorage);
  })
}

function handleSelectedCellUI(){
    for(let i=0;i<rangeStorage.length;i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid #7f8c8d"
    }
}
let copyData = [];
copyBtn.addEventListener("click" , (e)=>{
    //console.log("clicked")
    if(rangeStorage.length<2) return;
    copyData = [];
 let strow = rangeStorage[0][0];
 let stcol = rangeStorage[0][1];
 let endrow = rangeStorage[1][0];
 let endcol =rangeStorage[1][1];
 for(let i=strow;i<=endrow;i++){
    let copyRow =[];
    for(let j=stcol;j<=endcol;j++){
        let cellProp = sheetDB[i][j];
        copyRow.push(cellProp);
    }
    copyData.push(copyRow);
 }
 console.log("copy data", copyData)
 handleSelectedCellUI()
})
//cut button
let cutData = [];
cutBtn.addEventListener("click" , (e)=>{
  if(rangeStorage.length<2) return;
 cutData = [];
 let strow = rangeStorage[0][0];
 let stcol = rangeStorage[0][1];
 let endrow = rangeStorage[1][0];
 let endcol =rangeStorage[1][1];
 for(let i=strow;i<=endrow;i++){
  let  cutRow =[];
    for(let j=stcol;j<=endcol;j++){
       
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp = sheetDB[i][j];
        cutRow.push(cellProp);
        //DB
        cellProp.value = "";
        cellProp.bold = false;
        cellProp.italic = false;
        cellProp.underline = false;
        cellProp.fontSize = 14;
        cellProp.fontFamily = "monospace";
        cellProp.fontColor = "#000000";
        cellProp.BGcolor = "#000000";
        cellProp.alignment = "left";
        //UI
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = `${cellProp.fontSize}px`;
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
        cell.innerText = cellProp.value;
    }
    cutData.push(cutRow);    
 }
 handleSelectedCellUI()
})
//paste button 
pasteBtn.addEventListener("click" , (e)=>{
    //paste
    console.log("clicked")
    if(rangeStorage.length<2) return;
    let rowDiff = Math.abs(rangeStorage[0][0]-rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    let address = addressBar.value;
    let [stRow , stCol] =decodeRIDCID(address);
    for (let i = stRow,r = 0;i <= stRow+rowDiff;i++,r++) {
      for (let j = stCol,c = 0;j <= stCol+colDiff;j++,c++) {
          let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
          console.log(cell);
          if (!cell) continue;

          // DB
          let data = copyData[r][c];
          let cellProp = sheetDB[i][j];

          cellProp.value = data.value;
          cellProp.bold = data.bold;
          cellProp.italic = data.italic;
          cellProp.underline = data.underline;
          cellProp.fontSize = data.fontSize;
          cellProp.fontFamily = data.fontFamily;
          cellProp.fontColor = data.fontColor;
          cellProp.BGcolor = data.BGcolor;
          cellProp.alignment = data.alignment;

          // UI
          cell.style.fontWeight = data.bold ? "bold" : "normal";
          cell.style.fontStyle = data.italic ? "italic" : "normal";
          cell.style.textDecoration = data.underline ? "underline" : "none";
          cell.style.fontSize = `${data.fontSize}px`;
          cell.style.fontFamily = data.fontFamily;
          cell.style.color = data.fontColor;
          cell.style.backgroundColor = data.BGcolor === "#000000" ? "transparent" : data.BGcolor;
          cell.style.textAlign = data.alignment;
          cell.innerText = data.value;
        }
    }
})



