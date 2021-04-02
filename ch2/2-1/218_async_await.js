const findAndSaveUser = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'Azimut';
        user = await user.save();
        user = await Users.findOne({getnder: 'male'});
    } catch (err) {
        console.error(err);
    }
};

findAndSaveUser();
