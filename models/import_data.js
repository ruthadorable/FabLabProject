require('dotenv').config();

const sequelize = require("./connection");
const {
  Equipment,
  Invoice,
  Role,
  Use,
  } = require("./schema");
const User = require("./user");

(async () => {
    await sequelize.sync({ force: true });

    const hatim = await User.create({
        first_name: "Hatim",
        last_name: "Naimi",
        email: "hatimnaimi@gmail.be",
        password: "12345",
    });

    const soufian = await User.create({
        first_name: "Soufian",
        last_name: "Haidour",
        email: "soufhaidour@gmail.be",
        password: "54321",
    });

    const admin = await Role.create({
        name: "Admin",
        permission: "all",
    });

    const member = await Role.create({
        name: "Member",
        permission: "read",
    });

    const in1 = await Invoice.create({
        num: "1",
        date: "2021-04-13",
        amount_total: 23.90,
    });

    const in2 = await Invoice.create({
        num: "2",
        date: "2021-04-24",
        amount_total: 14.26,
    });

    const grDecoupLaser = await Equipment.create({
        name: "LA GRANDE DÉCOUPEUSE LASER",
        price_minute: 0.33,
        model_machine: "ML-W1290",
        reserved: false,
        out_of_order: false,
    });

    const imp3Dgrand = await Equipment.create({
        name: "IMPRIMANTES 3D GRAND FORMAT",
        price_minute: 0.40,
        model_machine: "Big Builder",
        reserved: false,
        out_of_order: false,
    });

    const grFraisNum = await Equipment.create({
        name: "LA GRANDE FRAISEUSE NUMÉRIQUE",
        price_minute: 0.36,
        model_machine: "ML6090",
        reserved: false,
        out_of_order: false,
    });

    const use1 = await Use.create({
        durating_M: 125,
        amount_to_be_paid: 14.26,
        date: "2021-04-24",
    });
    
    const use2 = await Use.create({
        durating_M: 137,
        amount_to_be_paid: 19.23,
        date: "2021-04-12",
    });

    await grFraisNum.setUses(use1);
    await hatim.setUses(use1);

    await grDecoupLaser.setUses(use2);
    await soufian.setUses(use2);
    

    await sequelize.close();
})();