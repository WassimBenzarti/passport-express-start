var agent = require('./init').agent;
var Form = require('../models/Form');
var formId = '';

var options ={
    before:false,

}

describe.skip('Forms', () => {
    before((done) => {
        if(options.before){
            Form.remove((err, result) => {
                done();
            })
        }else{
            done();
        }

    })

    describe('/POST create', () => {
        it('should create form', (done) => {
            var newForm = {
                name:'myForm',
                title:'Form Title',
                description:'Form description',
                logo:'https://kimevents.herokuapp.com/images/ziyara/logokim.png',
                coverPhoto:'https://kimevents.herokuapp.com/images/ziyara/background.jpg',
                inputs:[],
            }
            agent
                .post('/api/form/create')
                .send(newForm)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(1);
                    res.body.should.have.property('data').to.be.an('object');
                    res.body.data.should.have.property('name').to.be.a('string');
                    res.body.data.should.have.property('owner').to.be.a('string');
                    formId = res.body.data._id;
                    done();
                })
        })
    });

    describe('/GET get', () => {
        it('should get all my forms', (done) => {
            agent
                .get('/api/form/')
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(1);
                    res.body.should.have.property('data').to.be.an('array');
                    done();
                })
        })
    });

    describe('/POST get', () => {
        it('should get form', (done) => {
            var formInfo = {
                formId:formId
            }
            agent
                .post('/api/form/')
                .send(formInfo)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(1);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('inputs');
                    done();
                })
        })
    })

    describe('/POST create fails',()=>{
        it('should not create a form',(done)=>{
            var newForm = {
                _id:'599e8f475db41d2590482d8d',
                owner:'599e8f475db41d2590482d8d',
                title:'Form Title',
                description:'Form description',
                logo:'https://kimevents.herokuapp.com/images/ziyara/logokim.png',
                coverPhoto:'https://kimevents.herokuapp.com/images/ziyara/background.jpg',
                inputs:[],
            }
            agent
                .post('/api/form/create')
                .send(newForm)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(500);
                    res.body.should.have.property('success').equal(0);
                    res.body.should.have.property('msg').to.be.a('string');
                    res.body.should.have.property('details').to.be.a('string');
                    done();
                })
        })
    })

})