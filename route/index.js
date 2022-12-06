const authMW = require('../middleware/auth/authMW');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/common/renderMW');
const checkInDogMW = require('../middleware/dog/checkInDogMW');
const checkOutDogMW = require('../middleware/dog/checkOutDogMW');
const delDogMW = require('../middleware/dog/delDogMW');
const getDogMW = require('../middleware/dog/getDogMW');
const getAllDogsHereMW = require('../middleware/dog/getAllDogsHereMW');
const getAllDogsMW = require('../middleware/dog/getAllDogsMW');
const getDogsFromOwners = require('../middleware/dog/getDogsFromOwnerMW');
const saveDogMW = require('../middleware/dog/saveDogMW');
const delOwnerMW = require('../middleware/owner/delOwnerMW');
const getOwnerMW = require('../middleware/owner/getOwnerMW');
const getOwnerFromDogMW = require('../middleware/owner/getOwnerFromDogMW');
const getOwnersMW = require('../middleware/owner/getOwnersMW');
const saveOwnerMW = require('../middleware/owner/saveOwnerMW');

const DogModel = require('../models/dog');
const OwnerModel = require('../models/owner');

module.exports = function (app) {
    const objRepo = {
        DogModel: DogModel,
        OwnerModel: OwnerModel
    };

    app.get('/home',
        authMW(objRepo),
        getAllDogsHereMW(objRepo),
        renderMW(objRepo, 'home'));

    app.get('/dog/view/:dogid',
        authMW(objRepo),
        getDogMW(objRepo),
        getOwnerFromDogMW(objRepo),
        renderMW(objRepo, 'dog_details'));

    app.use('/dog/new',
        authMW(objRepo),
        getOwnersMW(objRepo),
        saveDogMW(objRepo),
        renderMW(objRepo, 'dog_editnew'));

    app.use('/dog/edit/:dogid',
        authMW(objRepo),
        getDogMW(objRepo),
        getOwnersMW(objRepo),
        saveDogMW(objRepo),
        renderMW(objRepo, 'dog_editnew'));

    app.get('/dog/checkin/:dogid',
        authMW(objRepo),
        getDogMW(objRepo),
        checkInDogMW(objRepo));

    app.get('/dog/checkout/:dogid',
        authMW(objRepo),
        getDogMW(objRepo),
        checkOutDogMW(objRepo));

    app.get('/dog/del/:dogid',
        authMW(objRepo),
        getDogMW(objRepo),
        delDogMW(objRepo));

    app.get('/dog',
        authMW(objRepo),
        getAllDogsMW(objRepo),
        renderMW(objRepo, 'dogs'));

    app.get('/owner/view/:ownerid',
        authMW(objRepo),
        getOwnerMW(objRepo),
        getDogsFromOwners(objRepo),
        renderMW(objRepo, 'owner_details'));

    app.use('/owner/new',
        authMW(objRepo),
        saveOwnerMW(objRepo),
        renderMW(objRepo, 'owner_editnew'));

    app.use('/owner/edit/:ownerid',
        authMW(objRepo),
        getOwnerMW(objRepo),
        getAllDogsMW(objRepo),
        saveOwnerMW(objRepo),
        renderMW(objRepo, 'owner_editnew'));

    app.get('/owner/del/:ownerid',
        authMW(objRepo),
        getOwnerMW(objRepo),
        delOwnerMW(objRepo));  

    app.get('/owner',
        authMW(objRepo),
        getOwnersMW(objRepo),
        renderMW(objRepo, 'owners'));

    app.use('/logout',
        logoutMW(objRepo));
        
    app.use('/',
        checkPasswordMW(objRepo),
        renderMW(objRepo, 'index'));
};