import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../express';
import { initUserModel } from '../src/library/models/user';

chai.use(chaiHttp);
// should();
before(async()=>{
  const User = await initUserModel();
await User.destroy({where:{user_name:`rama123`}})
})

describe('Init', function() {
  it('fetch user detail', function(done) {
    chai.request(app)
      .get('/user/detail?user_id=2')
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.property(`responseData`);
        res.body.responseData.should.have.property(`user_detail`);
        done();
      });
  });

  it('fetch user detail by id param', function(done) {
    chai.request(app)
      .get('/user/detailById/3')
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.property(`responseData`);
        res.body.responseData.should.have.property(`user_detail`);
        done();
      });
  });


  it('user register', function(done) {
    chai.request(app)
      .post('/user/register')
      .send({user_name:'rama123'})
      .end((err, res) => {
        should().not.exist(err);
        res.should.have.status(200);
        res.body.should.have.property(`responseData`);
        res.body.responseData.should.have.property(`user_id`);
        done();
      });
  });

});
