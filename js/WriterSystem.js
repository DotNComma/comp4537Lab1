import { TextField } from "./TextField.js";
import { STRINGS } from "./strings.js";

/**
 * Used chatgpt to help fix some logic behind updating the localstorage every 2 seconds or if another page made a change.
 * Also used chatgpt to help make each data entry have a unique id while still being update accordingly
 */

class WriterSystem {
    container;
    textField;
    count;

    constructor()
    {
        this.time = document.getElementById(STRINGS.TIME_ID);
        this.container = document.getElementById(STRINGS.CONTAINER_ID);
        this.textField = new TextField();
        this.count = parseInt(localStorage.getItem(STRINGS.LOCALSTORAGE_COUNTER_ID)) || 0;
    }

    initialize()
    {
        this.time.innerHTML = new Date();
        this.loadTextFields();

        window.addEventListener('storage', (e) => {
            this.loadTextFields();
        })

        document.getElementById(STRINGS.ADD_ID).addEventListener("click", () => {
            this.addNewTextField(this.count, "");
        })
    }

    loadTextFields()
    {
        this.time.innerHTML = new Date();
        this.container.innerHTML = "";

        for(let i = 0; i < localStorage.length; i++)
        {
            const key = localStorage.key(i);
                
            if(key != STRINGS.LOCALSTORAGE_COUNTER_ID)
            {
                    const data = localStorage.getItem(key);
                    const parsedData = JSON.parse(data)
                    this.addNewTextField(key, parsedData.text);
            }
        }
    }
    
    addNewTextField(id, data)
    {
        this.time.innerHTML = new Date();
        this.textField.createTextField(id, data);
        this.count++;
        localStorage.setItem(STRINGS.LOCALSTORAGE_COUNTER_ID, this.count);
    }

    dataCheck()
    {
        const textFields = document.querySelectorAll(STRINGS.TEXTFIELD_ID_QUERY);

        textFields.forEach(field => {
            const id = field.id.replace(STRINGS.TEXTFIELD_ID, "");
            const value = field.value;

            if(value !== "" && 
                value !== localStorage.getItem(id))
            {
                this.time.innerHTML = new Date();
                const noteObject = { text: value }
                localStorage.setItem(id, JSON.stringify(noteObject));
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