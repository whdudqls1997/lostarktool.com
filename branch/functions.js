const honing = new Map();
const epicarm = new Map();
const epicwep = new Map();
const leggoarm = new Map();
const leggowep = new Map();

function calculate(){
    cleanup();
    if(paramCheck()){
        return;
    }
    makeMap();

    index = 0;
    go(document.getElementById("_rarity").value, document.getElementById("_level").value, document.getElementById("_confidence").value, parsePrice());

    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + ">>> Calculation Finished \n";
    
    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + ">>> Try manipulating target confidence rate for different results!";
}

function cleanup(){
    var table = document.getElementById("result");
    table.innerHTML = "";
}

function paramCheck(){
    if(document.getElementById("_destruction").value === "" ||
        document.getElementById("_guardian").value === "" ||
        document.getElementById("_leapstone").value === "" ||
        document.getElementById("_fusion").value === "" ||
        document.getElementById("_shard").value === "" ||
        document.getElementById("_grace").value === "" ||
        document.getElementById("_blessing").value === "" ||
        document.getElementById("_protection").value === ""){
        alert("Material prices cannot be empty.\nAt least put in 0");
        return true;
    }

    const rarity = document.getElementById("_rarity").value;
    if(rarity !== "E" && rarity !== "L" && rarity !== "e" && rarity !== "l"){
        alert("Invalid input on Rarity.\nUse E (for epic) and L (for legendary).");
        return true;
    }

    const level = document.getElementById("_level").value;
    if(level <= 6 || ((rarity === "E" || rarity === "e") && 15 < level) || 20 < level){
        alert("Invalid input on target honing level.\nEpic gear : 7 - 15\nLeggo gear : 7 - 20");
        return true;
    }

    const confidence = document.getElementById("_confidence").value;
    if(confidence === "" || confidence >= 100 || confidence < 0){
        alert("Invalid input on confidence.\nConfidence cannot exceed 100%, or be negative, or be empty.");
        return true;
    }

    return false;
}

function makeMap(){
    honing.set(7, [0.60, 12, 6, 2, 0.0167, 0.0333, 0.10]);
    honing.set(8, [0.45, 12, 6, 2, 0.0125, 0.0250, 0.075]);
    honing.set(9, [0.30, 12, 6, 2, 0.0084, 0.0167, 0.05]);
    honing.set(10, [0.30, 12, 6, 2, 0.0084, 0.0167, 0.05]);
    honing.set(11, [0.30, 12, 6, 2, 0.0084, 0.0167, 0.05]);
    honing.set(12, [0.15, 24, 12, 4, 0.0021, 0.0042, 0.0125]);
    honing.set(13, [0.15, 24, 12, 4, 0.0021, 0.0042, 0.0125]);
    honing.set(14, [0.15, 24, 12, 4, 0.0021, 0.0042, 0.0125]);
    honing.set(15, [0.10, 24, 12, 2, 0.0014, 0.0028, 0.0083]);
    honing.set(16, [0.10, 24, 12, 2, 0.0014, 0.0028, 0.0083]);
    honing.set(17, [0.10, 24, 12, 2, 0.0014, 0.0028, 0.0083]);
    honing.set(18, [0.05, 36, 18, 6, 0.0005, 0.0009, 0.0028]);
    honing.set(19, [0.05, 36, 18, 6, 0.0005, 0.0009, 0.0028]);
    honing.set(20, [0.03, 36, 18, 6, 0.0003, 0.0006, 0.0017]);

    epicarm.set(7, [156, 4, 2, 42, 70]);
    epicarm.set(8, [156, 4, 2, 42, 70]);
    epicarm.set(9, [156, 4, 2, 42, 70]);
    epicarm.set(10, [192, 6, 4, 50, 70]); 
    epicarm.set(11, [192, 6, 4, 50, 70]);
    epicarm.set(12, [192, 6, 4, 50, 70]);
    epicarm.set(13, [228, 6, 4, 60, 70]);
    epicarm.set(14, [228, 8, 4, 60, 70]);
    epicarm.set(15, [228, 8, 4, 60, 70]);

    epicwep.set(7, [258, 8, 4, 60, 120]);
    epicwep.set(8, [258, 8, 4, 60, 120]);
    epicwep.set(9, [258, 8, 4, 60, 120]);
    epicwep.set(10, [320, 10, 4, 75, 120]);
    epicwep.set(11, [320, 10, 4, 74, 120]);
    epicwep.set(12, [320, 10, 4, 74, 120]);
    epicwep.set(13, [380, 10, 6, 88, 120]);
    epicwep.set(14, [380, 12, 6, 88, 120]);
    epicwep.set(15, [380, 12, 6, 88, 120]);

    leggoarm.set(7, [404, 8, 6, 108, 170]);
    leggoarm.set(8, [404, 10, 6, 108, 170]);
    leggoarm.set(9, [404, 10, 6, 108, 170]);
    leggoarm.set(10, [498, 10, 8, 132, 170]);
    leggoarm.set(11, [498, 10, 8, 132, 170]);
    leggoarm.set(12, [498, 12, 8, 132, 170]);
    leggoarm.set(13, [592, 12, 8, 158, 170]);
    leggoarm.set(14, [592, 12, 8, 158, 170]);
    leggoarm.set(15, [592, 12, 8, 158, 180]);
    leggoarm.set(16, [686, 14, 10, 216, 210]);
    leggoarm.set(17, [686, 16, 10, 292, 250]);
    leggoarm.set(18, [686, 16, 12, 396, 280]);
    leggoarm.set(19, [780, 18, 14, 536, 320]);
    leggoarm.set(20, [780, 20, 14, 728, 530]);

    leggowep.set(7, [672, 12, 6, 156, 320]);
    leggowep.set(8, [672, 14, 8, 156, 320]);
    leggowep.set(9, [672, 14, 8, 156, 320]);
    leggowep.set(10, [830, 16, 8, 192, 320]);
    leggowep.set(11, [830, 16, 8, 192, 320]);
    leggowep.set(12, [830, 18, 8, 192, 330]);
    leggowep.set(13, [986, 18, 10, 228, 330]);
    leggowep.set(14, [986, 20, 10, 228, 330]);
    leggowep.set(15, [986, 20, 10, 228, 330]);
    leggowep.set(16, [1144, 22, 12, 310, 410]);
    leggowep.set(17, [1144, 24, 14, 422, 480]);
    leggowep.set(18, [1144, 28, 16, 572, 540]);
    leggowep.set(19, [1144, 30, 18, 776, 640]);
    leggowep.set(20, [1300, 32, 20, 1054, 730]);
}

function parsePrice(){
    const temp = new Array();
    temp.push(document.getElementById("_destruction").value);
    temp.push(document.getElementById("_guardian").value);
    temp.push(document.getElementById("_leapstone").value);
    temp.push(document.getElementById("_fusion").value);
    temp.push(document.getElementById("_shard").value / 500);
    temp.push(document.getElementById("_grace").value);
    temp.push(document.getElementById("_blessing").value);
    temp.push(document.getElementById("_protection").value);
    console.log(temp[4] + " / " + temp[4] * 500);
    return temp;
}

function go(rarity, level, confidence, prices){
    var lvl = honing.get(Number(level));
    var conf = 1.0 - (confidence/100.0);
    var arm; var wep; 
    if(rarity === "e" || rarity === "E"){ 
        arm = epicarm.get(Number(level));
        wep = epicwep.get(Number(level)); 
    }else{ 
        arm = leggoarm.get(Number(level));
        wep = leggowep.get(Number(level));
    }

    var baseArm = prices[1] * arm[0] + prices[2] * arm[1] + prices[3] * arm[2] + prices[4] * arm[3] + arm[4];
    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + ">>> Searching for best armor honing method" + "\n";
    scan(baseArm, prices, lvl, conf);

    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + "\n";

    var baseWep = prices[0] * wep[0] + prices[2] * wep[1] + prices[3] * wep[2] + prices[4] * wep[3] + wep[4];
    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + ">>> Searching for best weapon honing method" + "\n";
    scan(baseWep, prices, lvl, conf);

    var data = document.getElementById("result").value;
    document.getElementById("result").innerHTML = data + "\n";
}

function scan(base, prices, lvl, conf){
    var min = Number.MAX_VALUE;

    for(i = 0; i < lvl[3]; i++){
        for(j = 0; j < lvl[2]; j++){
            for(k = 0; k < lvl[1]; k++){
                var attempt = scanHelper(0, 1, lvl, conf, (k * lvl[4] + j * lvl[5] + i * lvl[6]));
                const total = attempt * ((k * prices[5] + j * prices[6] + i * prices[7]) + base);
                if(total < min){
                    var data = document.getElementById("result").value;
                    document.getElementById("result").innerHTML = data + 
                            "Expected Attempts : " + attempt + " | Total Cost : " + Math.round(total) + " G | " + "Grace (" + k + ") , Blessing (" + j + ") , Protection (" + i + ")"
                            + "\n";
                    min = total;
                }
            }
        }
    }
}

function scanHelper(attempt, prob, lvl, conf, added){
    if(prob <= conf){
        return attempt;
    }
    return scanHelper(attempt + 1, prob * (1 - (lvl[0] + (attempt * lvl[0] / 10) + added)), lvl, conf, added);
}