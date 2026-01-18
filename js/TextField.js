import { STRINGS } from "./strings.js";

export class TextField {
    container;
    content;

    constructor() 
    {
        this.container = document.getElementById(STRINGS.CONTAINER_ID);
        this.content = "";
    }

    createTextField(id, data)
    {
        if(data != "")
        {
            this.content = `
                <div class="textField" id=${id}>
                    <textarea type="text" id="textData${id}">${data}</textarea>
                    <button id="button${id}">delete</button>
                </div>
            `
        }
        else 
        {
            this.content = `
                <div class="textField" id=${id}>
                    <textarea type="text" id="textData${id}"></textarea>
                    <button id="button${id}">delete</button>
                </div>
            `
        }
        this.container.insertAdjacentHTML("beforeend", this.content);

        document.getElementById(STRINGS.BUTTON_ID + id).onclick = () => {
            document.getElementById(id).remove();
            localStorage.removeItem(id);
        }
    }
}