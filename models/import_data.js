require('dotenv').config();

const sequelize = require("./connection");
const {
  Equipment,
  Invoice,
  Role,
  Use,
  InvoiceDetail
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

    const member = await Role.create({
        name: "Member",
        permission: "read",
    });

    const in1 = await Invoice.create({
        num: "1",
        date: "2021-04-13",
        amount_total: 23.90,
        userId:1
    });

    const in2 = await Invoice.create({
        num: "2",
        date: "2021-04-24",
        amount_total: 14.26,
        userId:1
    });

    const grDecoupLaser = await Equipment.create({
        name: "LA GRANDE DÉCOUPEUSE LASER",
        image: "../../images/découpeuselaser1.png",
        price_minute: 0.33,
        reserved: false,
    });

    const imp3Dgrand = await Equipment.create({
        name: "IMPRIMANTES 3D GRAND FORMAT",
        image: "../../images/imprimante3D1.JPG",
        price_minute: 0.40,
        reserved: false,
    });

    const grFraisNum = await Equipment.create({
        name: "LA GRANDE FRAISEUSE NUMÉRIQUE",
        image: "../../images/grandefraiseusenum1.JPG",
        price_minute: 0.36,
        reserved: false,
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

    const ind1=InvoiceDetail.create({
        equipmentId:grDecoupLaser.id,
        equipment_name: grDecoupLaser.name,
        equipment_tarif: grDecoupLaser.price_minute,
        duration_M: use1.durating_M,
        amount_total: use1.amount_to_be_paid,
        facturation: true,
        useId: use1.id,
        invoiceId: in1.id,
        userId:hatim.id,
        date: in1.date
    });

    const ind2=InvoiceDetail.create({
        equipmentId:grFraisNum.id,
        equipment_name: grFraisNum.name,
        equipment_tarif: grFraisNum.price_minute,
        duration_M: use2.durating_M,
        amount_total: use2.amount_to_be_paid,
        facturation: true,
        useId: use2.id,
        invoiceId: in1.id,
        userId:hatim.id,
        date: in2.date
    });

    await grFraisNum.setUses(use1);
    await hatim.setUses(use1);

    await grDecoupLaser.setUses(use2);
    await soufian.setUses(use2);
    

    await sequelize.close();
})();

