class Warning {
    static class_hidden = 'hidden'
    static error_message = document.getElementById('error-message')

    static show() {
        if (this.error_message.classList.contains(this.class_hidden)) {
            this.error_message.classList.remove(this.class_hidden);
        }
    }

    static hide() {
        if (!this.error_message.classList.contains(this.class_hidden)) {
            this.error_message.classList.add(this.class_hidden);
        }
    }
}

function warning_clean_up() {
    const answer = document.getElementById('answer')
    const solution = document.getElementById('solution')

    answer.innerText = ""
    solution.innerText = ""
}

function calculate() {
    Warning.hide()
    const multiplier_element = document.getElementById('multiplier')
    const multiplicand_element = document.getElementById('multiplicand')
    const print_description = document.getElementsByName('print_description')
    const answer = document.getElementById('answer')
    const solution = document.getElementById('solution')
    const error_text = document.getElementById('error-text')

    const multiplier = parseInt(multiplier_element.value)
    const multiplicand = parseInt(multiplicand_element.value)

    if (isNaN(multiplier)) {
        error_text.innerText = "The multiplier is required. Please, fill the field."
        Warning.show()
        warning_clean_up()
        multiplier_element.focus()
        return
    }

    if (isNaN(multiplicand)) {
        error_text.innerText = "The multiplicand is required. Please, fill the field."
        Warning.show()
        warning_clean_up()
        multiplicand_element.focus()
        return
    }

    let is_print_description;
    for (let i = 0; i < print_description.length; i++) {
        if (print_description[i].checked) {
            is_print_description = print_description[i].value
        }
    }

    const url = "asset/bash/init.sh?" +
        multiplier + "," +
        multiplicand +
        ",plain," +
        is_print_description + "," +
        new Date().getTime()

    let xml_http_request = new XMLHttpRequest()
    xml_http_request.open("GET", url, true)
    xml_http_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xml_http_request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const result = multiplier * multiplicand
            answer.innerText = result.toLocaleString('en')

            solution.innerText = this.responseText
        }
        if (this.status !== 200) {
            error_text.innerText = "Fatal Error in the Ajax request. Failed trying to call the `asset/bash/init.sh`."
            Warning.show()
            warning_clean_up()

        }
    }
    xml_http_request.send()
}

function enter_emulation() {
    if (event.key === "Enter") {
        calculate()
    }
}
