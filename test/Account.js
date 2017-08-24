var agent = require('./init').agent;
let Account = require('../models/Account');

describe('Minimal Accounts', ()=>{
    describe('/POST logout user', () => {
        it('should loggout', (done) => {
            agent.post('/api/account/logout')
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data').to.be.a('string');
                    done();
                })

        })
    })
    describe('/POST login', () => {
        it('should login user', (done) => {
            var user = {
                username: 'admin',
                password: '123',
            }
            agent.post('/api/account/login')
                .send(user)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('username');
                    res.body.data.should.have.property('email');
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('salt');
                    res.body.data.should.not.have.property('hash');
                    done();
                })
        })
    })
    describe('/POST user', () => {
        it('should be logged in', (done) => {
            agent
                .post('/api/account')
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('username');
                    res.body.data.should.have.property('email');
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('salt');
                    res.body.data.should.not.have.property('hash');
                    done();
                })
        })
    })
})

describe.skip('Accounts', () => {
    before((done) => {
        Account.remove((err, result) => {
            done();
        })
    })

    describe('/POST logout user', () => {
        it('should loggout', (done) => {
            agent.post('/api/account/logout')
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data').to.be.a('string');
                    done();
                })

        })
    })

    describe('/POST register', () => {
        it('should not register user', (done) => {
            var newUser = {
                username: 'admin',
                password: '123',
                email: 'wass11121996@gmailcom',
                tel: '1234567'
            }
            agent
                .post('/api/account/register')
                .send(newUser)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(500);
                    res.body.should.have.property('success').equal(0);
                    res.body.should.not.have.property('data');
                    done();
                })
        })
        it('should register user', (done) => {
            var newUser = {
                username: 'admin',
                password: '123',
                email: 'wass11121996@gmail.com',
                tel: '12345678'
            }
            agent
                .post('/api/account/register')
                .send(newUser)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(1);
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('username');
                    res.body.data.should.have.property('email');
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('salt');
                    res.body.data.should.not.have.property('hash');
                    done();
                })
        })
    })

    describe('/POST login', () => {
        it('should not login user', (done) => {
            var user = {
                username: 'admin',
                password: '123aaa',
            }
            agent.post('/api/account/login')
                .send(user)
                .end((err, res) => {
                    console.log('my res body = ',res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(-1);
                    res.body.should.have.property('msg').to.be.a('string')
                    done();
                })
        })
        it('should login user', (done) => {
            var user = {
                username: 'admin',
                password: '123',
            }
            agent.post('/api/account/login')
                .send(user)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('username');
                    res.body.data.should.have.property('email');
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('salt');
                    res.body.data.should.not.have.property('hash');
                    done();
                    // return agent;
                })
        })
    })

    describe('/POST user', () => {
        it('should be logged in', (done) => {
            agent
                .post('/api/account')
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('username');
                    res.body.data.should.have.property('email');
                    res.body.data.should.not.have.property('password');
                    res.body.data.should.not.have.property('salt');
                    res.body.data.should.not.have.property('hash');
                    done();
                })
        })
    })

})