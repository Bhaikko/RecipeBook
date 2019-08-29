class LoginForm 
{
    constructor() {
        this.addHeaders();
        this.render();
        this.onFocus();
        this.onBlur();
        this.checkFormValidation();
    }

    render = () => {
        const loginForm = document.getElementById("loginForm");
        loginForm.innerHTML = 
        `
            <h1>Login</h1>

            <div class="textb">
                <input type="text" name="username" autocomplete="off" id="loginUsername">
                <span data-placeholder="Username"></span>
            </div>

            <div class="textb">
                <input type="password" id="loginPassword">
                <span data-placeholder="Password"></span>
            </div>

            <input type="submit" class="logbtn" value="Login" id="loginButton">
            <small id="loginError"></small>

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

    checkFormValidation = () => {
        const loginError = document.getElementById("loginError");
        loginError.innerText = "";

        const loginForm = document.getElementById("loginForm");
        const loginButton = document.getElementById("loginButton");

        loginButton.addEventListener("click", event =>{
            event.preventDefault();

            const loginUsername = document.getElementById("loginUsername");
            const loginPassword = document.getElementById("loginPassword");

            if(loginUsername.value == "")
            {
                loginError.innerText = "Please Enter Username";
                return; 
            }
            else if(loginPassword.value == "")
            {
                loginError.innerText = "Please Enter Password";
                return; 
            }
            //Check If username and password is correct

            loginForm.submit()
        })
    }
}

const loginForm = new LoginForm();

//INCLUDE JQUERY IN html FILE WHEN INCLUDING THIS COMPONENET
