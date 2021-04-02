const relationship = {
    name : "Azimut",
    heros : ['superman', 'wonderwoman', 'ironman'],
    logFriends() {
        this.heros.forEach(hero => {
            console.log(`${this.name} vs ${hero}  ${this.name}`);
        });
    },
};
relationship.logFriends();