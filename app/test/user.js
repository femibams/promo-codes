const chai = require("chai");
let chaiHttp = require('chai-http');
const app = require("../index");
let should = chai.should();
const User = require("../models/user.js");
const bcrypt = require('bcryptjs');


chai.use(chaiHttp);

describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.deleteAll((err,res) => {
           done();
        });
    });
    after((done) => {
        User.deleteAll((err,res) => {
            done();
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST user', () => {
        it('should create a user', (done) => {
            let user = {
                email: "femibams@gmail.com",
                name: "femi bamidele",
                password: "password"
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.should.have.status(201);
                    done();
                });
        });

        it('should return a 400 when missing paramters', (done) => {
            let user = {
                email: "femibams@gmail.com",
                name: "femi bamidele"
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(400);
                    done();
                });
        });

    });

    describe('/POST login', () => {
        it('should NOT log a user in', (done) => {
            let user = {
                email: "femibams@gmail.com",
                password: "password"
            }
            chai.request(app)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('No account exists with this email! Please signup')
                    res.should.have.status(400);
                    done();
                });
        });

        it('should successfully log a user in', async () => {
            let savedUser =  new User({
                email: "bams@gmail.com",
                name: "femi bamidele",
                password: await bcrypt.hash("password", 10)
            });
            let user = {
                email: "bams@gmail.com",
                password: "password"
            }
            User.create(savedUser, (err,res) => {})
            chai.request(app)
                .post('/user/login')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Logged in successfully')
                    res.should.have.status(200);
                });
        });

    })
});
