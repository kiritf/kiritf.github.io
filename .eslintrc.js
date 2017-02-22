module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "import"
    ],
    "settings": {
        "import/resolver": "webpack"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "react/require-extension": "off",
    }
};