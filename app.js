let item = document.getElementById('item');
let temph3 = document.getElementById('temp');
// let chaosCoreInput = document.getElementById('chaosCoreInput').value;
// let chaosCoreVal = chaosCoreInput.value;
// console.log(chaosCoreInput)

let upgradeLevel = 0;
let numberOfUpgrades = 0;
let numberOfBracelets = 0;
let totalChaosCores = 0;
let totalConverterCost = 0;
let totalChaosCoreCost = 0;
let totalSafeguardsUsed = 0;
let bestUpgrade = 0;

// Uncomment this plus the if statement for the wanted result at the bottom
// to check for 
// let wantedResult = 9;
// let counter = 0;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// let converterCost = 88_000_000;
// let coreCost = 1_200_000;

let zero = 100;
let one = 95;
let two = 90;
let three = 75;
let four = 65;
let five = 60;
let six = 40;
let seven = 30;
let eight = 25;
let nine = 24;
let ten = 23;
let eleven = 22;
let twelve = 21;
let thirdteen = 20;
let fourteen = 20;

let totalCounter = document.createElement('h3');
item.appendChild(totalCounter);

let totalBracelets = document.createElement('h3');
item.appendChild(totalBracelets);

let totalCores = document.createElement('h3');
item.appendChild(totalCores);

let totalConverterCostEl = document.createElement('h3');
item.appendChild(totalConverterCostEl);

let totalCoreCostEl = document.createElement('h3');
item.appendChild(totalCoreCostEl);

let bestUpgradeEl = document.createElement('h3');
item.appendChild(bestUpgradeEl);

let totalSafeguardsEl = document.createElement('h3');
item.appendChild(totalSafeguardsEl);

// Object to be changed based on user input
let data = {
    coreCost: 1000000,
    converterCost: 70000000,
    safeguard: false,
}

// Reference the els for cores
let coreEl = document.getElementById('chaosCoreInput');
let coreVal = document.getElementById('coreValue');

// Reference the els for converters
let converterEl = document.getElementById('converterInput');
let converterVal = document.getElementById('converterValue');

// Reference the els for Safeguards
let safeguardEl = document.getElementById('safeguardInput');
let safeguardVal = document.getElementById('safeguardValue');


let button = document.getElementById('button');


// Event listeners setup
coreEl.addEventListener('input', function() {
    data.coreCost = coreEl.value;

    console.log(data.coreCost)
})

converterEl.addEventListener('input', function() {
    data.converterCost = converterEl.value;
})

safeguardEl.addEventListener('input', function() {
    data.safeguard = safeguardEl.checked;
})


let watch = function(object, property, callback) {
    //store initial value for future use
    let value = object[property];

    //remove the original property since we now want to 'spy' on it
    delete object[property];

    //define the property again
    // now using 'get' and 'set'
    Object.defineProperty(object, property, {
        configurable: false,
        enumerable: false,
        get: function() {
            //return the value
            return value;
        },
        set: function(newValue) {
            //update the value
            value = newValue;
            //call the callback with the new value
            callback(newValue);
        }
    });
} 

//2. Watch the 'data' object for changes using the watch func
watch(data, 'coreCost', function(newValue) {
    //update the input field value
    coreEl.value = newValue;

    //update the text field
    coreVal.textContent = numberWithCommas(newValue);
})

watch(data, 'converterCost', function(newValue) {
    converterEl.value = newValue;
    converterVal.textContent = numberWithCommas(newValue);
})

watch(data, 'safeguard', function(newValue) {
    safeguardEl.value = newValue;
    safeguardVal.textContent = newValue;
})

//3. Setup the 'click' event for the button
// button.addEventListener('click', function() {
//     data.coreCost = coreEl.value;
//     data.converterCost = converterEl.value;
// })

//Adding View to Model binding
//this must be after 'watch' because 'set' would not bet available before that
coreEl.addEventListener('input', function() {
    data.coreCost = coreEl.value;
})

converterEl.addEventListener('input', function() {
    data.converterCost = converterEl.value;
})

safeguardEl.addEventListener('input', function() {
    data.safeguard = safeguardEl.checked;
})

function upgrade() {
    //core cost from user input
    let coreCost = parseInt(data.coreCost);

    //converter cost from user input
    let converterCost = parseInt(data.converterCost);

    let randomNum = Math.floor(Math.random() * 100);
    
    totalCounter.innerHTML = `Total Upgrades: ${numberOfUpgrades}`;
    totalBracelets.innerHTML = `Total Bracelets: ${numberOfBracelets}`;
    totalCores.innerHTML = `Total Cores: ${totalChaosCores}`;
    totalConverterCostEl.innerHTML = `Total Cores: ${totalConverterCost}`;
    totalCoreCostEl.innerHTML = `Total Cores: ${totalChaosCoreCost}`;
    
    if (upgradeLevel == 0) {
        let isLower = randomNum <= zero;
        if (isLower) {
            upgradeLevel = 1;
            // numberOfUpgrades++;
            numberOfBracelets++;
            totalConverterCost = totalConverterCost + converterCost;
            temph3.innerHTML = 'Chaos Upgrade (1/15)';
            temph3.style.color = '#03adfc';
            if (bestUpgrade > 1) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            upgradeLevel = 0;
            temph3.innerHTML = 'Chaos Upgrade (0/15)';
            // numberOfBracelets++;
        }
    }

    else if (upgradeLevel == 1) {
        let isLower = randomNum <= one;
        if (isLower) {
            upgradeLevel = 2;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (2/15)';
            temph3.style.color = '#03adfc';
            totalChaosCores = totalChaosCores + 1;
            totalChaosCoreCost = totalChaosCoreCost + coreCost;
            if (bestUpgrade > 2) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 1;
                temph3.innerHTML = 'Chaos Upgrade (1/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + coreCost;
                totalChaosCores = totalChaosCores + 1;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + coreCost;
                totalChaosCores = totalChaosCores + 1;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 2) {
        let isLower = randomNum <= two;
        if (isLower) {
            upgradeLevel = 3;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (3/15)';
            temph3.style.color = '#03adfc';
            totalChaosCores = totalChaosCores + 1;
            totalChaosCoreCost = totalChaosCoreCost + coreCost;
            if (bestUpgrade > 3) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 2;
                temph3.innerHTML = 'Chaos Upgrade (2/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + coreCost;
                totalChaosCores = totalChaosCores + 1;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + coreCost;
                totalChaosCores = totalChaosCores + 1;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 3) {
        let isLower = randomNum <= three;
        if (isLower) {
            upgradeLevel = 4;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (4/15)';
            temph3.style.color = '#03adfc';
            totalChaosCores = totalChaosCores + 2;
            totalChaosCoreCost = totalChaosCoreCost + coreCost * 2;
            if (bestUpgrade > 4) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 3;
                temph3.innerHTML = 'Chaos Upgrade (3/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 4) {
        let isLower = randomNum <= four;
        if (isLower) {
            upgradeLevel = 5;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (5/15)';
            temph3.style.color = '#03adfc';
            totalChaosCores = totalChaosCores + 2;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
            if (bestUpgrade > 5) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 4;
                temph3.innerHTML = 'Chaos Upgrade (4/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 5) {
        let isLower = randomNum <= five;
        if (isLower) {
            upgradeLevel = 6;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (6/15)';
            temph3.style.color = '#03adfc';
            totalChaosCores = totalChaosCores + 2;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
            if (bestUpgrade > 6) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 5;
                temph3.innerHTML = 'Chaos Upgrade (5/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 2);
                totalChaosCores = totalChaosCores + 2;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 6) {
        let isLower = randomNum <= six;
        if (isLower) {
            upgradeLevel = 7;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (7/15)';
            temph3.style.color = '#fc0380';
            totalChaosCores = totalChaosCores + 3;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
            if (bestUpgrade > 7) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 6;
                temph3.innerHTML = 'Chaos Upgrade (6/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 7) {
        let isLower = randomNum <= seven;
        if (isLower) {
            upgradeLevel = 8;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (8/15)';
            temph3.style.color = '#fc0380';
            totalChaosCores = totalChaosCores + 3;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
            if (bestUpgrade > 8) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 7;
                temph3.innerHTML = 'Chaos Upgrade (7/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                totalSafeguardsUsed = totalSafeguardsUsed + 1;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 8) {
        let isLower = randomNum <= eight;
        if (isLower) {
            upgradeLevel = 9;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (9/15)';
            temph3.style.color = '#fc0380';
            totalChaosCores = totalChaosCores + 3;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
            if (bestUpgrade > 9) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 8;
                temph3.innerHTML = 'Chaos Upgrade (8/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                totalSafeguardsUsed = totalSafeguardsUsed + 2;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 3);
                totalChaosCores = totalChaosCores + 3;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 9) {
        let isLower = randomNum <= nine;
        if (isLower) {
            upgradeLevel = 10;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (10/15)';
            temph3.style.color = '#fcc203';
            totalChaosCores = totalChaosCores + 4;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
            if (bestUpgrade > 10) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 9;
                temph3.innerHTML = 'Chaos Upgrade (9/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                totalSafeguardsUsed = totalSafeguardsUsed + 4;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 10) {
        let isLower = randomNum <= ten;
        if (isLower) {
            upgradeLevel = 11;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (11/15)';
            temph3.style.color = '#fcc203';
            totalChaosCores = totalChaosCores + 4;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
            if (bestUpgrade > 11) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 10;
                temph3.innerHTML = 'Chaos Upgrade (10/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                totalSafeguardsUsed = totalSafeguardsUsed + 8;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 11) {
        let isLower = randomNum <= eleven;
        if (isLower) {
            upgradeLevel = 12;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (12/15)';
            temph3.style.color = '#fcc203';
            totalChaosCores = totalChaosCores + 4;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
            if (bestUpgrade > 12) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 11;
                temph3.innerHTML = 'Chaos Upgrade (11/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                totalSafeguardsUsed = totalSafeguardsUsed + 16;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 4);
                totalChaosCores = totalChaosCores + 4;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 12) {
        let isLower = randomNum <= twelve;
        if (isLower) {
            upgradeLevel = 13;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (13/15)';
            temph3.style.color = '#fc9d03';
            totalChaosCores = totalChaosCores + 5;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
            if (bestUpgrade > 13) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 12;
                temph3.innerHTML = 'Chaos Upgrade (12/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                totalSafeguardsUsed = totalSafeguardsUsed + 32;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 13) {
        let isLower = randomNum <= thirdteen;
        if (isLower) {
            upgradeLevel = 14;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (14/15)';
            temph3.style.color = '#fc9d03';
            totalChaosCores = totalChaosCores + 5;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
            if (bestUpgrade > 14) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 13;
                temph3.innerHTML = 'Chaos Upgrade (13/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                totalSafeguardsUsed = totalSafeguardsUsed + 64;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                numberOfUpgrades++;
            }
        }
    }

    else if (upgradeLevel == 14) {
        let isLower = randomNum <= fourteen;
        if (isLower) {
            upgradeLevel = 15;
            numberOfUpgrades++;
            temph3.innerHTML = 'Chaos Upgrade (15/15)';
            temph3.style.color = '#fc6f03';
            totalChaosCores = totalChaosCores + 5;
            totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
            if (bestUpgrade > 15) {
                bestUpgrade = bestUpgrade;
            } else {
                bestUpgrade = upgradeLevel;
            }
        } else {
            if (data.safeguard) {
                upgradeLevel = 14;
                temph3.innerHTML = 'Chaos Upgrade (14/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                totalSafeguardsUsed = totalSafeguardsUsed + 128;
                numberOfUpgrades++;
            } else {
                upgradeLevel = 0;
                temph3.innerHTML = 'Chaos Upgrade (0/15)';
                // numberOfBracelets++;
                // totalConverterCost = totalConverterCost + converterCost;
                totalChaosCoreCost = totalChaosCoreCost + (coreCost * 5);
                totalChaosCores = totalChaosCores + 5;
                numberOfUpgrades++;
            }
        }
    }

    // Check how many wanted results appear in the final result in the while statement
    // Uncomment this with the counter and wantedResult variables at the top
    // if (upgradeLevel == wantedResult) {
    //     counter++;
    // }

    totalCounter.innerHTML = `Total upgrades: ${numberOfUpgrades}`;
    totalBracelets.innerHTML = `Total Bracelets: ${numberOfBracelets}`;
    totalCores.innerHTML = `Total Cores: ${totalChaosCores}`;
    totalConverterCostEl.innerHTML = `Total Converter Cost: ${numberWithCommas(totalConverterCost)}`;
    totalCoreCostEl.innerHTML = `Total Chaos Core Cost: ${numberWithCommas(totalChaosCoreCost)}`;
    bestUpgradeEl.innerHTML = `Best Upgrade: ${bestUpgrade}`;
    totalSafeguardsEl.innerHTML = `Total Safeguards Used: ${totalSafeguardsUsed}`;
    // setTimeout(() => {upgrade()}, 50)
}

// while (totalConverterCost < 500_000_000) {
//     upgrade();
// }
// console.log(counter);
