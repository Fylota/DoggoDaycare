var expect = require('chai').expect;
var getAllDogsMW = require('../../../../middleware/dog/getAllDogsMW');

describe('getAllDogsMW middleware ', function () {

    it('should return dogs from db', function (done) {
        const mw = getAllDogsMW({
            DogModel: {
                find: ({}, cb) => {
                    cb(undefined, ['dog1', 'dog2']);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {},
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ dogs: ['dog1', 'dog2'] });
                done();
            }
        );
    });

    it('should call next with error in case of db problem', function (done) {
        const mw = getAllDogsMW({
            DogModel: {
                find: ({}, cb) => {
                    cb('dbError', null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {},
            resMock,
            (err) => {
                expect(err).to.be.eql('dbError');
                done();
            }
        );
    });

});