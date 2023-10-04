const {Sequelize}= require('sequelize')
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect:'postgres'
    }
)
// التأكد من الإتصال 
 sequelize.authenticate().then(
    ()=>{
        console.log('connection has been estabilashed successefuly')
    }
).catch(err=>{
    console.error('unabel to connect ',err)
})

export {sequelize}
