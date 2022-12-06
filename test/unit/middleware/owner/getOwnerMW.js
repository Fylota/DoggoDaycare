var expect = require('chai').expect;
var getOwnerMW = require('../../../../middleware/owner/getOwnerMW');

describe('getOwnerMW middleware ', function () {

    it('should set res.locals.owner with an owner object from db', function (done) {
        const mw = getOwnerMW({
            OwnerModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    cb(null, 'mockOwner');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
                params: {
                    ownerid: '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ owner: 'mockOwner' });
                done();
            }
        );
    });

    it('should call next with error in case of db problem', function (done) {
        const mw = getOwnerMW({
            OwnerModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    cb('dbError', null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
                params: {
                    ownerid: '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql('dbError');
                done();
            }
        );
    });

    it('should call next when owner is not found in the db', function (done) {
        const mw = getOwnerMW({
            OwnerModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: '1' });
                    cb(undefined, null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
                params: {
                    ownerid: '1'
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            }
        );
    });
});