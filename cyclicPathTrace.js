//cyclicPathTrace.js
async function isGraphTracePath(graphComponentMatrix,cycleResponse) {
    let[ srcr,srcc] = cycleResponse;
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
    // for (let i = 0; i < row; i++) {
    //   for (let j = 0; j < col; j++) {
    //     let response=dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
    //     if(response==true) return true;
    //   }
      
    // }
        let response= await dfsCycleTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
        if(response===true) return Promise.resolve(true);
  
    return Promise.resolve(false); 
  }
function colorPromise(){
 return new Promise((resolve ,reject)=> {
      setTimeout(()=>{
        resolve();

      },1000)
 })
}

//coloring cells for tracking
  async function dfsCycleTracePath(
    graphComponentMatrix,srcr,srcc,visited,dfsVisited
  ) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;
  
    
    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    
          cell.style.backgroundColor="lightblue";
       
        await colorPromise()
    for (let i = 0; i < graphComponentMatrix[srcr][srcc].length; i++) {
    
      let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][i];
      
      if(visited[nbrr][nbrc]==false){
          let response = await dfsCycleTracePath( graphComponentMatrix,nbrr,nbrc,visited,dfsVisited
            ) 
      if(response==true){
       
          cell.style.backgroundColor="transparent";
      await colorPromise()
        
          return Promise.resolve(true);// no need to explore more path 
      }          
      }
      else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc]===true){
        let cyclicCell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
        
           cyclicCell.style.backgroundColor="lightsalmon"
            await colorPromise();
        
        cyclicCell.style.backgroundColor="transparent";
        await colorPromise()
       
        return Promise.resolve(true);
                   
      }
    }
    dfsVisited[srcr][srcc] =false;
    return Promise.resolve(false);
  
  }