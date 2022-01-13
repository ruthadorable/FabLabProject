require('dotenv').config();

const sequelize = require("./connection");
const {
  Equipment,
  Invoice,
  Role,
  Use
  } = require("./schema");
const User = require("./user");
(async () => {
    await sequelize.sync({ force: true });
   
    
    const hatim = await User.create({
        first_name: "Hatim",
        last_name: "Naimi",
        email: "hatimnaimi@gmail.be",
        password: "12345",
        role_id: 2,
        uses_id: null
    });

    const soufian = await User.create({
        first_name: "Soufian",
        last_name: "Haidour",
        email: "soufhaidour@gmail.be",
        password: "54321",
        role_id: 2,
        uses_id: null
    });

    const ruth = await User.create({
        first_name: "Ruth Ann",
        last_name: "ADORABLE",
        email: "adorableruthann@gmail.com",
        password: "5698",
        role_id: 1,
        
    })

    const alfred = await User.create({
        first_name: "Alfred",
        last_name: "Lemonnier",
        email: "alfredlemonnier@gmail.com",
        password: "1234",
        role_id: 3
    }) 
    const admin = await Role.create({
        name: "Admin",
        permission: "all",
    });

    const comptable = await Role.create({
        name: "Comptable",
        permission: "all",
    });

    const member = await Role.create({
        name: "Member",
        permission: "read",
    });

    const in1 = await Invoice.create({
        num: 001,
        date: "2021-04-13",
        amount_total: 23.90,
        userId:1,
        payé: false
    });

    const in2 = await Invoice.create({
        num: 002,
        date: "2021-04-24",
        amount_total: 14.26,
        userId:1,
        payé: false
    });

    const grDecoupLaser = await Equipment.create({
        name: "LA GRANDE DÉCOUPEUSE LASER",
        image: "../../images/découpeuselaser1.png",
        price_minute: 0.33,
        
    });

    const imp3Dgrand = await Equipment.create({
        name: "IMPRIMANTES 3D GRAND FORMAT",
        image: "../../images/imprimante3D1.JPG",
        price_minute: 0.40,
        
    });

    const grFraisNum = await Equipment.create({
        name: "LA GRANDE FRAISEUSE NUMÉRIQUE",
        image: "../../images/grandefraiseusenum1.JPG",
        price_minute: 0.36,
        
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

