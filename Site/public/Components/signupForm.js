class SignupForm 
{
    constructor() {
        this.addHeaders();
        this.render();
        this.onFocus();
        this.onBlur();
        this.checkFormValidation();
    }

    render = () => {
        const signupForm = document.getElementById("signupForm");
        signupForm.innerHTML = 
        `
            <h1>Sign Up</h1>

            <div class="textb">
                <input type="text" name="username" autocomplete="off" id="signupUsername">
                <span data-placeholder="Username"></span>
                
            </div>
            

            <div class="textb">
                <input type="email" name="email" autocomplete="off" id="signupEmail">
                <span data-placeholder="Email"></span>
            </div>

            <div class="textb">
                <input type="password" name="password" id="signupPassword">
                <span data-placeholder="Password"></span>
            </div>

            <input type="submit" class="logbtn" value="Signup" id="signupButton">
            <small id="signupError"></small>
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
        const signupError = document.getElementById("signupError");
        signupError.innerText = "";

        const signupForm = document.getElementById("signupForm");
        const signupButton = document.getElementById("signupButton");

        signupButton.addEventListener("click", event =>{
            event.preventDefault();

            const signupUsername = document.getElementById("signupUsername");
            const signupEmail = document.getElementById("signupEmail");
            const signupPassword = document.getElementById("signupPassword");

            if(signupUsername.value == "")
            {
                signupError.innerText = "Please Enter Username";
                return; 
            }
            else if(signupEmail.value == "")
            {
                signupError.innerText = "Please Enter Email";
                return; 
            }
            else if(signupPassword.value == "")
            {
                signupError.innerText = "Please Enter Password";
                return; 
            }
            else if(!this.passwordValidation(signupPassword.value))
            {
                signupError.innerHTML = "Password Must Contain A Letter and <br> A Number and <br> Should Of Of Length More Than 8";
                return;
            }
            //Check If username or email exists in database

            signupForm.submit()
        })


    }

    passwordValidation = (password) => {
        console.log(password);

        if(password.length < 8)
            return false;

        let bLetterFound = false;
        let bNumberFound = false;

        for(let i = 0; i < password.length; i++)
        {
            if((password[i] <= "z" && password[i] >= "a") || (password[i] >= "A" && password[i] <= "Z"))
                bLetterFound = true;
            if(password[i] <= "9" && password[i] >= "0")
                bNumberFound = true;

        }

        if(!bNumberFound || !bLetterFound)
            return false;
        return true;

    }  

    
}

const signupForm = new SignupForm();

//INCLUDE JQUERY IN html FILE WHEN INCLUDING THIS COMPONENET
