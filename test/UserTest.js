"use strict";

const UserActions = require('../server/src/users/Actions');
const {UserModel , UserAtmModel , UserDocumentModel} = require('../server/Models/UserModel');
const {UserTokens} = require("../server/src/users/UserMongo");
const {expect} = require('chai');

describe('@user', function () {
    let ua = new UserActions();
    let um = new UserModel();
    let uam = new UserAtmModel();
    let udm = new UserDocumentModel();

    let user_email = 'mehrdadsalimy1@gmail.com',
        user_pass = '123';

    describe('@register', function () {

        before(async function () {
            await um.delete(['email'] , [user_email]);
        });

        describe('@ add account', function () {
            it('should Register User', function (done) {
                ua.addAccount({email: user_email, password: user_pass})
                    .then(value => {
                        expect(value.status).to.equal(true);
                        expect(value.is_email_send).to.equal(true);
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    });

            });
        });

        describe('@ validate email', function () {
            let u_token = null;
            before(async function () {
                let u = await UserTokens.findOne({email_address: user_email}, null, {sort: {user: -1}});
                u_token = u.token;
            });

            it('should return status true and valid email', function (done) {
                ua.validate_email_by_token(u_token)
                    .then(value => {
                        console.log(value);
                        expect(value.status).to.equal(true);
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    });
            });
        });
    });

    describe('@login', function () {

        before(async function () {
            await um.delete(['email'] , [user_email]);
        });

        before(async function () {
            await ua.addAccount({email: user_email, password: user_pass});
        });

        describe('@send email', function () {
            it('should check user and if email_not valid send email validate', function (done) {
                ua.loginToAccount(user_email, user_pass)
                    .then(data => {
                        expect(data.status).to.equal(true);
                        expect(data.is_email_send).to.equal(true)
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        });

        describe('@ email password error', function () {
            it('should callback result email and password error', function (done) {
                ua.loginToAccount('mehrdadsalimy2@gmail.com', '123')
                    .then(data => {
                        expect(data.status).to.equal(false);
                        expect(data.msg).to.exist
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        });

        describe('@ login successfully', function () {

            before(async function () {
                let u = await UserTokens.findOne({email_address: user_email}, null, {sort: {user: -1}});
                await ua.validate_email_by_token(u.token)
            });

            it('should callback status true and usr id', function (done) {
                ua.loginToAccount(user_email, user_pass)
                    .then(data => {
                        expect(data.status).to.equal(true);
                        expect(data.data.id).to.exist
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        });
    });

    describe('@forgetPassword', function () {
        describe('@checkUser', function () {
            it('should check user and getter device users', function (done) {
                ua.FindUserDeviceForForgetPassword('mehrdadsalimy1@gmail.com')
                    .then(data => {
                        expect(data.status).to.equal(true);
                        expect(data.values).to.be.exist;
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });

            it('should check user and return user not find', function (done) {
                ua.FindUserDeviceForForgetPassword('mehrdadsalimy2@gmail.com')
                    .then(data => {
                        expect(data.status).to.equal(false);
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });
        });
        describe('@checkTokenDeviceAndSendEmail', function () {
            let devices = null;
            before( async function () {
                devices = await ua.FindUserDeviceForForgetPassword('mehrdadsalimy1@gmail.com');
            });

            it('should send email link forget password', function (done) {
                ua.CheckDeviceTokenSendLinkForgetPassword(devices.values[0].id , '::1')
                    .then(data => {
                        expect(data.status).to.equal(true)
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });

            it('should return status false and exist msg', function (done) {
                ua.CheckDeviceTokenSendLinkForgetPassword("123" , '::1')
                    .then(data => {
                        expect(data.status).to.equal(false);
                        expect(data.msg).to.exist;
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });
        });
        describe('@validTokenEmail', function () {
            let token_last_send = {};

            before( async function () {
               token_last_send = await  UserTokens.findOne({email_address : 'mehrdadsalimy1@gmail.com' , mode : "VALID_PASSWORD"} , null , {sort : {created_at : -1}})
            });

            it('should status false and return code 404', function (done) {
                ua.ValidTokenAllowChangePassword({token : "token_last_send.token" , ip : "::1"})
                .then(data => {
                    expect(data.status).to.equal(false);
                    expect(data.code).to.equal(404);
                    done()
                })
                .catch(err => {
                    done(err);
                })
            });

            it('should status false and return code 403 for ip', function (done) {
                ua.ValidTokenAllowChangePassword({token : token_last_send.token , ip : "::2"})
                    .then(data => {
                        expect(data.status).to.equal(false);
                        expect(data.code).to.equal(403);
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });

            it('should status true and return token change password', function (done) {
                ua.ValidTokenAllowChangePassword({token : token_last_send.token , ip : "::1"})
                    .then(data => {
                        expect(data.status).to.equal(true);
                        expect(data.token).to.be.exist;
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });
        });
        describe('@changePasswordByToken', function () {
            let token_last_send = null;
            before(async function () {
                token_last_send = await  UserTokens.findOne({email_address : 'mehrdadsalimy1@gmail.com' , mode : "VALID_CHANGE_PASSWORD"} , null , {sort : {created_at : -1}})
            });

            it('should change password user and return status true', function (done) {
                UserActions.change_password_by_token({token : token_last_send.token , password : '321' , ip : "::1"})
                    .then(data => {
                       expect(data.status).to.equal(true)
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });

        });
    });

    describe('@editUser', function () {
        let fetch_user;
        before(async function () {
            fetch_user = await um.fetch_one('id', ['email'], [user_email]);
        });

        it('should edit name and family user ', function (done) {
            UserActions.editUser({name: 'مهرداد', family: "سلیمی"}, ['id'], [fetch_user.id])
                .then(data => {
                    expect(data.status).to.equal(true);
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });

        it('should edit mobile status ', function (done) {
            UserActions.editUser({mobile: '09189772330', mobile_status: true}, ['id'], [fetch_user.id])
                .then(data => {
                    expect(data.status).to.equal(true);
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });
    });

    describe('@ATM', function () {
        describe('@add atm user', function () {
            let fetch_user = {};
            before(async function () {
                await uam.delete([{name: 'id', type: '>'}], [0]);
                fetch_user = await um.fetch_one('id' , ['email'] , [user_email]);
            });

            it('should create atm number for user', function (done) {
                UserActions.addAtmNumber({atm : '1111-1111-1111-1111' , for_user: fetch_user.id , role : "USER" })
                    .then(data => {
                        expect(data.status).to.be.equal(true)
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });

            it('should return message exist atm', function (done) {
                UserActions.addAtmNumber({atm : '1111-1111-1111-1111' , for_user: fetch_user.id , role : "USER" })
                    .then(data => {
                        expect(data.status).to.be.equal(false);
                        expect(data.msg).to.be.exist;
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });

            before(async function () {
                await UserActions.addAtmNumber({atm : '2111-1111-1111-1111' , for_user: fetch_user.id , role : "USER" });
                await UserActions.addAtmNumber({atm : '3111-1111-1111-1111' , for_user: fetch_user.id , role : "USER" });
            });

            it('should return message limit atm', function (done) {
                UserActions.addAtmNumber({atm : '4111-1111-1111-1111' , for_user: fetch_user.id , role : "USER" })
                    .then(data => {
                        expect(data.status).to.be.equal(false);
                        expect(data.msg).to.be.exist;
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });

            it('should add atm with admin', function (done) {
                UserActions.addAtmNumber({atm : '5111-1111-1111-1111' , for_user: fetch_user.id , role : "ADMIN" })
                    .then(data => {
                        expect(data.status).to.be.equal(true);
                        done()
                    })
                    .catch(err => {
                        done(err);
                    })
            });

        });
        describe('@edit', function () {
            let fetch_atm;
            before(async function () {
                fetch_atm = await uam.fetch_one('id', ['atm'], ['1111-1111-1111-1111']);
            });

            describe('@edit atm', function () {
                it('should edit atm number', function (done) {
                    UserActions.editAtmNumber({atm : "2222"} , ['id'] , [fetch_atm.id])
                        .then(data => {
                            expect(data.status).to.be.equal(true)
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                });

                it('should edit status', function (done) {
                    UserActions.editAtmNumber({status : true} , ['id'] , [fetch_atm.id])
                        .then(data => {
                            expect(data.status).to.be.equal(true)
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                });

                it('should remove card', function (done) {
                    UserActions.removeAtmNumber({atm_id : fetch_atm.id})
                        .then(data => {
                            expect(data.status).to.be.equal(true)
                            done()
                        })
                        .catch(err => {
                            done(err)
                        })
                });
            });
        });
    });

    describe('@UserDocument', function () {
        let fetch_user;
        before(async function () {
            await udm.delete([{name: 'id', type: '>'}], [0]);
            fetch_user = await um.fetch_one('id' , ['email'] , [user_email]);
        });

        describe('@add document', function () {
            it('should add document file', function (done) {
                ua.addFile({file : { id : "5d481a7a569c477a46f068b8" , filename : "321312" , mimetype : 'jpg' , size : 123 } , for_user : fetch_user.id})
                .then(data => {
                    expect(data.status).to.be.equal(true);
                    done()
                })
                .catch(err => {
                    done(err)
                })
            });
        });

        describe('@change status', function () {
            let file;
            before(async function () {
                file = await udm.fetch_one('id' , ['user_id'] , [fetch_user.id]);
            });

            it('should change status', function (done) {
                ua.updateStatusFile({ doc_id : file.id , status : 'ACCEPT' })
                    .then(data => {
                        expect(data.status).to.be.equal(true);
                        done()
                    })
                    .catch(err => {
                        done(err)
                    })
            });
        });

        describe('@remove doc', function () {
            let file;
            before(async function () {
                file = await udm.fetch_one('id' , ['user_id'] , [fetch_user.id]);
            });

            it('should remove file', function (done) {
                ua.removeFile({ doc_id : file.id })
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
});
