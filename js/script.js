class TextField {
    container;
    content;

    constructor() 
    {
        this.container = document.getElementById("data");
        this.content = ""
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
            `
        }
        else 
        {
            this.content = `
            <div class="textField" id=${id}>
                <input type="text" id="textData${id}">
                <button id="button${id}">delete</button>
            </div>
            `
        }
        this.container.insertAdjacentHTML("beforeend", this.content);

        document.getElementById("button" + id).onclick = () => {
            document.getElementById(id).remove()
            localStorage.removeItem(id)
        }
    }
}

class WriterSystem {
    container;
    textField;
    count;

    constructor()
    {
        this.container = document.getElementById("data");
        this.textField = new TextField();
        this.count = 0;
    }

    initialize()
    {
        if(localStorage.length != 0)
        {
            for(let i = 0; i < localStorage.length; i++)
            {
                const data = localStorage.getItem(i);
                this.addNewTextField(data)
            }
            
        }

        document.getElementById("add").addEventListener("click", () => {
            writerSystem.addNewTextField("")
        })
    }
    
    addNewTextField(data)
    {
        this.textField.createTextField(this.count, data);
        this.count++;
    }

    dataCheck()
    {
        for(let i = 0; i < localStorage.length; i++)
        {
            const data = document.getElementById("textData" + i).value;
            if(data != "")
            {   
                localStorage.setItem(i, data)
            }
        }
    }
}

const writerSystem = new WriterSystem()
writerSystem.initialize()
setInterval(writerSystem.dataCheck, 2000)
