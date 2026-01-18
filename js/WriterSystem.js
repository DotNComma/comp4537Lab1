import { TextField } from "./TextField.js";

class WriterSystem {
    container;
    textField;
    count;

    constructor()
    {
        this.time = document.getElementById("time");
        this.container = document.getElementById("data");
        this.textField = new TextField();
        this.count = parseInt(localStorage.getItem("textFieldCounter")) || 0;
    }

    initialize()
    {
        this.time.innerHTML = new Date();
        this.loadTextFields();

        window.addEventListener('storage', (e) => {
            this.loadTextFields();
        })

        document.getElementById("add").addEventListener("click", () => {
            this.addNewTextField(this.count, "");
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
        this.count++;
        localStorage.setItem("textFieldCounter", this.count);
    }

    dataCheck()
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

const writerSystem = new WriterSystem();
writerSystem.initialize();
setInterval(writerSystem.dataCheck, 2000);