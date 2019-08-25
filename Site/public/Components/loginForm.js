class LoginForm 
{
    constructor() {
        this.addHeaders();
        this.render();
        this.onFocus();
        this.onBlur();
    }

    render = () => {
        const loginForm = document.getElementById("loginForm");
        loginForm.innerHTML = 
        `
            <h1>Login</h1>

            <div class="textb">
                <input type="text" name="username" autocomplete="off">
                <span data-placeholder="Username"></span>
            </div>

            <div class="textb">
                <input type="password">
                <span data-placeholder="Password"></span>
            </div>

            <input type="submit" class="logbtn" value="Login">

        `
    }

    onFocus = () => {
        $(".textb input").on("focus", function() {
            $(this).addClass("focus");
        });
    }

    onBlur = () => {
        $(".textb input").on("blur", function() {

            if($(this).val() == "")
                $(this).removeClass("focus");
        });
    }

    addHeaders = () => {
        const head = document.getElementsByTagName("head")[0];
        head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Lexend+Zetta&display=swap" rel="stylesheet">`;
        head.innerHTML += `<link rel="stylesheet" href="./Components/form.css">`;
    }
}

const loginForm = new LoginForm();

//INCLUDE JQUERY IN html FILE WHEN INCLUDING THIS COMPONENET
