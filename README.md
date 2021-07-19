# Instructions

## Prerequisite

1. Node
2. Mysql

## Steps to start api

1. Pull project from github
2. Cd into root dir of project folder
3. Create a `.env` file, copy content of `sample.env` and replace the values
4. Create databases on your mysql instance with names `promo` and `promo_test`
5. RUN `npm i`
6. RUN `node app/index.js`

## Steps to run test

1. Replace the value of `NODE_ENV` in `.env` file to `"test"`
2. RUN `npm test`