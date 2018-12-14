module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "globals": {
        "document": true,
        "window": true
      },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": "module" 
        },
    "rules": {
        "no-console":0,
        "no-unused-vars":0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};