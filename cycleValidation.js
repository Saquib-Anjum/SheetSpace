//cycleValidation.js
//storage
let collectedGraphComponent=[];
 let graphComponentMatrix = [];

// for (let i = 0; i < row; i++) {
//   let row = [];
//   for (let j = 0; j < col; j++) {
//     //more than children ho sakta hai
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }

//true denotes cycle
function isGraphCyclic(graphComponentMatrix) {
  //dependency ->visited array and DFS visited array (2d) array
  let visited = []; //node track
  let dfsVisited = []; //stack track
  for (let i = 0; i < row; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow)
    dfsVisited.push(dfsVisitedRow);
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let response=dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
      if(response==true) return [i,j];
    }
    
  }

  return null; // No cycle detected
}
// start -> visited should be true and dfsvisited also should be true
// if vis[[i][j] -> already explored path so go back no use to explore
// cycle detection if visited[i][j] is true && dfsVisited[i][j]==true cycle detected
// return value will be true 
function dfsCycleDetection(
  graphComponentMatrix,srcr,srcc,visited,dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  //A1 => [0,1] [1,0] ......multiple child  present
  for (let i = 0; i < graphComponentMatrix[srcr][srcc].length; i++) {
  
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][i];
    
    if(visited[nbrr][nbrc]==false){
        let response =dfsCycleDetection( graphComponentMatrix,nbrr,nbrc,visited,dfsVisited
          ) 
    if(response==true){
        return true;// no need to explore more path 
    }          
    }
    else if(visited[nbrr][nbrc] == true && dfsVisited[nbrr][nbrc]==true){
        return true;
        // no need to explore more path           
    }
  }
  dfsVisited[srcr][srcc] =false;
  return false;

}
