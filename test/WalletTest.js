const {WalletModel} = require("../server/models/WalletModel");
const {WalletServices} = require("../server/services/WalletServices");
const {UserModel} = require("../server/Models/UserModel");
const {expect} = require('chai');

describe('@wallet', function () {

    let um = new UserModel;
    let uaw = new WalletModel;

    let find_user_test, find_coin_test;

    before(async function () {
          find_user_test = await um.fetch_one('id' , ['email'] , ['mehrdadsalimy1@gmail.com']);
          await uaw.delete([{name : 'id' , type : ">"}] , [0])
    });

    describe('@add balance wallet', function () {
        it('should add wallet row', function (done) {
            let ws = new WalletServices({ for_user : find_user_test.id, for_coin : 2 , balance : 1.001});
            ws.add()
            .then(data => {
                console.log('data' , data);
                expect(data.status).to.be.equal(true);
                done()
            })
            .catch(err => {
                console.log('err' , err);
                done(err)
            })
        });
    });

    describe('@subtract balance wallet', function () {
        it('should subtract wallet row', function (done) {
            let ws = new WalletServices({ for_user : find_user_test.id, for_coin : 2 , balance : 0.002});
            ws.subtract()
                .then(data => {
                    expect(data.status).to.be.equal(true);
                    done()
                })
                .catch(err => {
                    done(err)
                })
        });
    });

});
