const axios = require('axios');
const striptags = require('striptags');
let directionList = [];

async function getResponse(message) {
    let res = '';

    let origin_addr = encodeURIComponent(message.substring(message.indexOf("from") + 5, message.lastIndexOf(" to ")).trim());
    let dest_addr = encodeURIComponent(message.substring(message.lastIndexOf(" to ") + 4, message.length).trim());

    let tranportation_mode = 'driving';

    let transport_mode = message.split(" ")[1];

    if(transport_mode == ("walk") || transport_mode == ("walking")){
        tranportation_mode = 'walking';
    } else if(transport_mode == ("bike") || transport_mode == ("biking")){
        tranportation_mode = 'bicycling';
    } else if(transport_mode == ("transit") || transport_mode == ("bus")){
        tranportation_mode = 'transit';
    } else{
        tranportation_mode = 'driving';
    }

    console.log(process.env.MAPS_API_KEY);

    return await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin_addr}&destination=${dest_addr}&mode=${tranportation_mode}&key=${process.env.MAPS_API_KEY}`)
    .then(function (response) {
        //Parse Directions
        response.data.routes[0].legs[0].steps.forEach(element => {
            let curr_step = element.html_instructions +" ("+ element.distance.text+")";
            let regex = /(&nbsp;|<([^>]+)>)/ig;
            directionList.push(striptags(curr_step,["div"]).replace(regex, " "));
            res = directionList.join('\n\n');
         });
    }).then(() =>{
        let trans_mode = tranportation_mode + " directions ";
        if(res.length > 1500){
            return trans_mode + "limited to 1500 chars...\n" + res.substr(0,1500) + "\n.....";
        }else{
            return trans_mode + "\n" + res;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    getResponse
}


