//  formula.js
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCell(address);
      let enteredData = activeCell.innerText;
      if(enteredData === cellProp.value) return;
      cellProp.value = enteredData;
      // if data modified update 
      removeChildFromParent(cellProp.formula);
      cellProp.formula="";
      updateChildrenCell(address);
      //console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown",async (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && formulaBar.value) {
    let address = addressBar.value;
    let[cell,cellProp] = getActiveCell(address);
    if(inputFormula !==cellProp.formula){
        removeChildFromParent(cellProp.formula);
    }

    //check for cycle hai ki nhi
    //addChildToGraphComponent
    
    addChildToGraphComponent(inputFormula,address);
    let cycleResponse = isGraphCyclic(graphComponentMatrix);
    if(cycleResponse){
      //alert("Your Formula is Cyclic");
      let response = confirm("Your Formula is Cyclic. Do youwant to trace your path ?")
      while(response===true){
        //keep on tracking color until user will satisfied
        await isGraphTracePath(graphComponentMatrix,cycleResponse);
        let response = confirm("Your Formula is Cyclic. Do youwant to trace your path ?");
        console.log(response)
        if(response===false){
          break;
        }
       
      }
      
      removeChildFromGraphComponent(inputFormula,address);
      return;
    }
    //for the formula evaluation
    let evaluatedValue = evaluateFormula(inputFormula);
    
    //for the UI change
    cellUIandCellProp(evaluatedValue, inputFormula,address);
    addChildToParent(inputFormula);
    updateChildrenCell(address);
    console.log(sheetDB);
  }
});
//function to add graph
function addChildToGraphComponent(formula , childAddress ){
  let [crid ,ccid]=decodeRIDCID(childAddress);
  let encodedFormula = formula.split(" ");
  for(let i=0;i<encodedFormula.length;i++){
     let asciiValue = encodedFormula[i].charCodeAt(0);
     if(asciiValue>=65 && asciiValue<=90){
        let [prid ,pcid]=decodeRIDCID(encodedFormula[i]);
        graphComponentMatrix[prid][pcid].push([crid ,ccid]);
     }
      
  }
}
function removeChildFromGraphComponent(formula , childAddress){
  let [crid ,ccid]=decodeRIDCID(childAddress);
  let encodedFormula = formula.split(" ");
  for(let i=0;i<encodedFormula.length;i++){
     let asciiValue = encodedFormula[i].charCodeAt(0);
     if(asciiValue>=65 && asciiValue<=90){
        let [prid ,pcid]=decodeRIDCID(encodedFormula[i]);
        graphComponentMatrix[prid][pcid].pop();
     }
      
  }

}
function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
        let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
        parentCellProp.children.push(childAddress);
      }
    }
}
function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
      let asciiValue = encodedFormula[i].charCodeAt(0);
      if (asciiValue >= 65 && asciiValue <= 90) {
        let [parentCell, parentCellProp] = getActiveCell(encodedFormula[i]);
       let idx = parentCellProp.children.indexOf(childAddress);
       parentCellProp.children.splice(idx,1);
      }
    }
}

function updateChildrenCell(parentAddress){
    let [parentCell , parentCellProp] = getActiveCell(parentAddress);
    let children = parentCellProp.children;
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        let [childCell,childCellProp] = getActiveCell(childAddress);
        let childFormula  = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);

        cellUIandCellProp(evaluatedValue ,childFormula,childAddress);
        updateChildrenCell(childAddress);

    }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getActiveCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");

  return eval(decodedFormula);

  //return eval(formula);
}
function cellUIandCellProp(evaluatedValue, formula ,address) {
  //let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);
  cell.innerText = evaluatedValue; //UI change
  //DB update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
  //console.log(cellProp.formula)
}
