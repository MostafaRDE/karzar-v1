const {OrderModel} = require("../server/models/OrderModel");
const {OrderServices} = require("../server/services/OrderServices");
const {OrderActions} = require('../server/Actions/OrderActions');
const {UserModel} = require('../server/Models/UserModel');
const {PairsCoinsRelationModel} = require('../server/models/CoinModel');
const {WalletServices} = require('../server/services/WalletServices');
const {expect} = require('chai');

describe('Order Testing', function () {
    let uo = new OrderActions;
    let om = new OrderModel;
    let um = new UserModel;
    let pm = new PairsCoinsRelationModel();
    let user_a_id = 0;
    let user_b_id = 0;
    let user_c_id = 0;


    describe('NewOrderPriceEqual', async () => {
        before(async function () {
            await um.delete(['email'], ['a@a.com']);
            await um.delete(['email'], ['b@b.com']);
            await um.delete(['email'], ['c@c.com']);

            /* get user  */
            let user_a = await um.insertSync(['name', 'family', 'email'], ['user_a', 'salimi', 'a@a.com']);
            let user_b = await um.insertSync(['name', 'family', 'email'], ['user_b', 'salimi', 'b@b.com']);

            user_a_id = user_a.id;
            user_b_id = user_b.id;

            /* add balance for user */
            let find_symbol_data = await pm.fetch_one('*', ['symbol'], ['BTCUSDT']);
            let ws = new WalletServices({});
            ws.des = "اضافه شده برای تست";

            /* add wallet for user a */
            ws.for_user = user_a_id;
            ws.for_coin = find_symbol_data.coin;
            ws.balance = 10;
            await ws.add();

            /* add wallet for user b */
            ws.for_user = user_b_id;
            ws.for_coin = find_symbol_data.pair;
            ws.balance = 10000;
            await ws.add();

        });
        describe('#newOrderB3', function () {
            it('should insert new order b 2 ', function (done) {
                uo.newOrder({coin: 'BTCUSDT', price: 1501, quantity: 1, side: "BUY", type: "LIMIT", user: user_b_id})
                    .then(data => {
                        expect(data.status).to.equal(true);
                        done();
                    })
                    .catch(err => {
                        console.log('err', err);
                        done(err);
                    })
            });

            after(async function () {
                await start_sell_and_buy(user_b_id);
            });
        });
        describe('#newOrderB3', function () {
            it('should insert new order b 2 ', function (done) {
                uo.newOrder({coin: 'BTCUSDT', price: 1501, quantity: 1, side: "BUY", type: "LIMIT", user: user_b_id})
                    .then(data => {
                        expect(data.status).to.equal(true);
                        done();
                    })
                    .catch(err => {
                        console.log('err', err);
                        done(err);
                    })
            });

            after(async function () {
                await start_sell_and_buy(user_b_id);
            });
        });
        describe('#newOrderB3', function () {
            it('should insert new order b 2 ', function (done) {
                uo.newOrder({coin: 'BTCUSDT', price: 1501, quantity: 1.5, side: "BUY", type: "LIMIT", user: user_b_id})
                    .then(data => {
                        expect(data.status).to.equal(true);
                        done();
                    })
                    .catch(err => {
                        console.log('err', err);
                        done(err);
                    })
            });

            after(async function () {
                await start_sell_and_buy(user_b_id);
            });
        });
        describe('#newOrderA', function () {
            it('should new Order A', function (done) {
                uo.newOrder({coin: 'BTCUSDT', price: 1500, quantity: 2.5, side: "SELL", type: "LIMIT", user: user_a_id})
                    .then(data => {
                        expect(data.status).to.equal(true);
                        done();
                    })
                    .catch(err => {
                        console.log('err', err);
                        done(err);
                    })
            });
            after(async function () {
                await start_sell_and_buy(user_a_id)
            });
        });

    });
});


async function start_sell_and_buy(user) {
    let om = new OrderModel;
    let user_order = {};
    user_order = await om.fetch_one('id', ['user_id'], [user], undefined, [{column: 'id', sort: 'desc'}]);
    let os = new OrderServices({order_id: user_order.id});
    let bot = await os.start_buy_and_sell();
    console.log(`bot order ${user_order.id}`, bot);
}
