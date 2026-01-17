const container = document.getElementById("data");
const content = `
    <div class="textfield"><input type="text" id="textData"></div>
`
container.insertAdjacentHTML("beforeend", content);

function dataCheck()
{
    console.log("1")
    if(document.getElementById("textData").value != "")
    {
        console.log("Data read correctly " + document.getElementById("textData").value)
    }
}

setInterval(dataCheck, 2000)