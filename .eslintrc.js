module.exports = {
    "env": {
      "browser": true
    },
    "plugins": [ "react" ],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "rules": {
      "react/prop-types": "off",
      "semi": [ 1, "never" ],
      "comma-dangle": [ 1, "never" ],
      "comma-spacing": [ 1, { "before": false, "after": true } ],
      "brace-style": [ 1, "stroustrup", { "allowSingleLine": true } ],
      "object-curly-spacing": [ 1, "always" ],
      "no-sparse-arrays": 1,
      "eqeqeq": 1
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }   
};