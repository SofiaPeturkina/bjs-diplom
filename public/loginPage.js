"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage("Произошла ошибка при входе.");
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage("Произошла ошибка при регистрации.");
        }
    });
};