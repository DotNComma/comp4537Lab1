import { TextField } from "./TextField.js";

class ReaderSystem {
    container;
    textField;
    
    constructor()
    {
        this.time = document.getElementById("time");
        this.container = document.getElementById("data");
        this.textField = new TextField();
    }

    initialize()
    {
        this.time.innerHTML = new Date();
        this.loadTextFields();

        window.addEventListener('storage', (e) => {
            this.loadTextFields();
        })
    }

    loadTextFields()
    {
        this.time.innerHTML = new Date();
        this.container.innerHTML = '';

        for(let i = 0; i < localStorage.length; i++)
        {
            const key = localStorage.key(i);
           
            if(key != "textFieldCounter")
            {
                const data = localStorage.getItem(key);
                this.addNewTextField(key, data);
            }
        }
    }

    addNewTextField(id, data)
    {
        this.time.innerHTML = new Date();
        this.textField.createTextField(id, data);
        document.getElementById("textData" + id).readOnly = true;
    }

    dataRead()
    {
        const textFields = document.querySelectorAll("[id^='textData'");

        textFields.forEach(field => {
            const id = field.id.replace("textData", "");
            const value = field.value;

            if(value !== "" && value !== localStorage.getItem(id))
            {
                this.time.innerHTML = new Date();
                localStorage.setItem(id, value);
            }
            else if(value === "")
            {
                this.time.innerHTML = new Date();
                localStorage.removeItem(id);
            }
        })
    }
}

const readerSystem = new ReaderSystem();
readerSystem.initialize();
setInterval(readerSystem.dataRead, 2000);