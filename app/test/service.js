const chai = require("chai");
let chaiHttp = require('chai-http');
const app = require("../index");
const User = require("../models/user.js");
const Service = require("../models/service.js");
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
let token;

describe('Service', () => {
    beforeEach(async () => { //Before each test we empty the database
        Service.deleteAll((err,res) => {
        });
        let savedUser =  new User({
            email: "femi@gmail.com",
            name: "femi bamidele",
            password: await bcrypt.hash("password", 10)
        });
        
        User.create(savedUser, (err,res) => {})
    });

    beforeEach((done) => {
        let user = {
            email: "femi@gmail.com",
            password: "password"
        }
        chai.request(app)
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                console.log('token')
                console.log(res.body.data.token)
                token = res.body.data.token;
                res.should.have.status(200);
                done()
            });
    })
    after((done) => {
        Service.deleteAll((err,res) => {});
        User.deleteAll((err,res) => {});
        done();
    });

    /*
    * Test the /POST route
    */
    describe('/POST Service', () => {
        it('should create a service', (done) => {
            let service = {
                name: "femi",
                description: "sample description",
                promocode: "abcds"
            }
            chai.request(app)
                .post('/service')
                .set({"promo-access-token": token})
                .send(service)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.should.have.status(201);
                    done();
                });
        });
    })

    describe('/GET Service', () => {
        it('should get all the services', (done) => {
            chai.request(app)
                .get('/service')
                .set({"promo-access-token": token})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.data.length.should.be.eql(0);
                    res.should.have.status(200);
                    done();
                });
        })

        it('should return 403 when no token is passed', (done) => {
            chai.request(app)
                .get('/service')
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        })

        it('should return 401 when an invalid token is passed', (done) => {
            chai.request(app)
                .get('/service')
                .set({"promo-access-token": "token"})
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        })
    })

    describe('/POST Activate bonus', () => {
        it('should active a bonus for current user', (done) => {
            chai.request(app)
                .post('/activate/bonus')
                .set({"promo-access-token": token})
                .send({service_id: 123})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('service_id').eql(123);
                    res.body.data.should.have.property('active').eql('1');
                    res.should.have.status(201);
                    done();
                });
        })
    })
});