//opensave.js
let downloadBtn = document.querySelector(".download");
let uploadBtn = document.querySelector(".upload");

downloadBtn.addEventListener("click" , (e)=>{
    let jsonData =JSON.stringify([sheetDB,graphComponentMatrix]);
    let file = new Blob([jsonData] ,{type:"application/json"});
    const a = document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="sheetData.json";
    a.click();

})

uploadBtn.addEventListener("click" , (e)=>{
    let input = document.createElement("input");
    input.setAttribute("type" ,"file");
    input.click();

    input.addEventListener("change" , (e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            // Basic sheet with default data will be created
            addSheetBtn.click();

            // SheetDB, graphComponent
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];

            collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;

            handleSheetProperties();
        })

    })
})