const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const currencyRates = (RatesBoard) => {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            RatesBoard.clearTable();
            RatesBoard.fillTable(response.data);
        }
    });
};
currencyRates(ratesBoard);
setInterval(() => {
    currencyRates(ratesBoard);
}, 60000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (response) => {
    ApiConnector.addMoney(response, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс пополнен успешно.")
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (response) => {
    ApiConnector.convertMoney(response, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация выполнена успешно.")
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    ApiConnector.transferMoney({ to, currency, amount}, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод средств выполнен успешно.")
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();

const updateFavorites = (response) => {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
};

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        updateFavorites(response);
    }
});

favoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, (response) => {
        if (response.success === true) {
            updateFavorites(response);
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен.")
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success === true) {
            updateFavorites(response);
            favoritesWidget.setMessage(true, "Пользователь успешно удален.")
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};



