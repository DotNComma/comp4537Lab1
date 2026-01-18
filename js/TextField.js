export class TextField {
    container;
    content;

    constructor() 
    {
        this.container = document.getElementById("data");
        this.content = "";
    }

    createTextField(id, data)
    {
        if(data != "")
        {
            this.content = `
            <div class="textField" id=${id}>
                <input type="text" id="textData${id}" value=${data}>
                <button id="button${id}">delete</button>
            </div>
            `;
        }
        else 
        {
            this.content = `
            <div class="textField" id=${id}>
                <input type="text" id="textData${id}">
                <button id="button${id}">delete</button>
            </div>
            `;
        }
        this.container.insertAdjacentHTML("beforeend", this.content);

        document.getElementById("button" + id).onclick = () => {
            document.getElementById(id).remove();
            localStorage.removeItem(id);
        }
    }
}