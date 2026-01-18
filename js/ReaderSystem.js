import { TextField } from "./TextField.js";
import { STRINGS } from "./strings.js";

/**
 * Used chatgpt to help fix some logic behind updating the localstorage every 2 seconds or if another page made a change.
 */

class ReaderSystem {
    container;
    textField;
    
    constructor()
    {
        this.time = document.getElementById(STRINGS.TIME_ID);
        this.container = document.getElementById(STRINGS.CONTAINER_ID);
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
        document.getElementById(STRINGS.TEXTFIELD_ID + id).readOnly = true;
    }

    dataRead()
    {
        const textFields = document.querySelectorAll(STRINGS.TEXTFIELD_ID_QUERY);

        textFields.forEach(field => {
            const id = field.id.replace(STRINGS.TEXTFIELD_ID, "");
            const value = field.value;

            if(value !== "" 
                && value !== localStorage.getItem(id))
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

const readerSystem = new ReaderSystem();
readerSystem.initialize();
setInterval(readerSystem.dataRead, 2000);