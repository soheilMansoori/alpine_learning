import Alpine from 'alpinejs'

window.Alpine = Alpine
// alpine store
Alpine.store('user', {
    isLogin: false,
    username: null,
    password: null,
    userToken: null,
    login(username, password, token) {
        // localStorageData
        const userData = {
            username,
            password,
            token,
        };
        // change states
        this.username = username;
        this.password = password;
        this.userToken = token;
        this.isLogin = true;
        // set localStorageData 
        localStorage.setItem("user", JSON.stringify(userData));
    },
    logout() {
        this.username = null;
        this.password = null;
        this.userToken = null;
        this.isLogin = false;
        localStorage.removeItem("user");
    },
    checkLogin() {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        if (localStorageData) {
            this.username = localStorageData.username;
            this.password = localStorageData.password;
            this.userToken = localStorageData.token;
            this.isLogin = true;
        } else {
            this.logout()
        }
    }
});

// alpine data
Alpine.data("dropdown", (defaultOpenMenuID = null) => ({
    menuID: defaultOpenMenuID,
    openMainMenu(menuId) {
        this.menuID = menuId;
    }
}));

// alpine bind 
Alpine.bind('myBind', () => ({
    type: 'button',
    'x-data': `
            {
                btnTitle: 'show in element',
                clickHandler() {
                    this.btnTitle = 'change form app.js'
                }
            }
        `,
    'x-text': "btnTitle",
    'x-on:click': 'clickHandler',
}))

// check refresh token
let userStore = Alpine.store("user");
userStore.checkLogin();

Alpine.start()




// here i test alpine without webpack and work with cdn
// document.addEventListener('alpine:init', () => {
//     // start alpine 
//     console.log('run alpine => ', Alpine);

//     // alpine store
//     Alpine.store('user', {
//         isLogin: false,
//         username: null,
//         password: null,
//         userToken: null,
//         login(username, password, token) {
//             // localStorageData
//             const userData = {
//                 username,
//                 password,
//                 token,
//             };
//             // change states
//             this.username = username;
//             this.password = password;
//             this.userToken = token;
//             this.isLogin = true;
//             // set localStorageData 
//             localStorage.setItem("user", JSON.stringify(userData));
//         },
//         logout() {
//             this.username = null;
//             this.password = null;
//             this.userToken = null;
//             this.isLogin = false;
//             localStorage.removeItem("user");
//         },
//         checkLogin() {
//             const localStorageData = JSON.parse(localStorage.getItem("user"));
//             if (localStorageData) {
//                 this.username = localStorageData.username;
//                 this.password = localStorageData.password;
//                 this.userToken = localStorageData.token;
//                 this.isLogin = true;
//             } else {
//                 this.logout()
//             }
//         }
//     });

//     // alpine data
//     Alpine.data("dropdown", (defaultOpenMenuID = null) => ({
//         menuID: defaultOpenMenuID,
//         openMainMenu(menuId) {
//             this.menuID = menuId;
//         }
//     }));

//     // alpine bind 
//     Alpine.bind('myBind', () => ({
//         type: 'button',
//         'x-data': `
//             {
//                 btnTitle: 'show in element',
//                 clickHandler() {
//                     this.btnTitle = 'change form app.js'
//                 }
//             }
//         `,
//         'x-text': "btnTitle",
//         'x-on:click': 'clickHandler',
//     }))

//     // check refresh token
//     let userStore = Alpine.store("user");
//     userStore.checkLogin();
// });
