async function getData() {
    let url = '../../apart-hotel-props.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderData() {
    let data = await getData();

    let navigation = [];
    console.log('Array before push: ' + navigation);
    let containName = document.querySelector('#nav');

    let cities = '';
    cities += `<option value="">Choose</option>`;
    data.forEach(city => {
        cities += `<option value="${city.name}">${city.name}</option>`;
    });

    let containCities = document.querySelector('#cities');
    containCities.innerHTML = cities;

    let appts = '';
    const selectCities = document.querySelector("#cities");
    selectCities.addEventListener('change', (event) => {
        const {
            value,
            text
        } = event.target.options[event.target.selectedIndex]
        appts = `<option value="">Choose</option>`;
        // city names
        data.forEach(city => {
            // check city name
            if (city.name === text) {
                if (navigation.lastIndexOf(value) == -1) {
                    navigation.splice(0,4)
                    navigation.push(value);
                    containName.innerHTML = navigation;
                }
                
                for (i in city.properties) {
                    appts += `<option value="${city.properties[i].name}">${city.properties[i].name}</option>`;
                };
            }
        });
        let containAppts = document.querySelector('#appts');
        containAppts.innerHTML = appts;
    });

    const selectAppts = document.querySelector("#appts");
    selectAppts.addEventListener('change', (event) => {
        const {
            value,
            text
        } = event.target.options[event.target.selectedIndex]

        if (navigation.lastIndexOf(value) == -1) {
            navigation.splice(1, 1)
            navigation.push(value);
            containName.innerHTML = navigation;
        }
    });
    
    let checkin = document.querySelector('input[name=start]');
    let checkout = document.querySelector('input[name=end]');
    const selectSearch = document.querySelector("#search");
    
    selectSearch.addEventListener('click', () => {
        if (navigation.lastIndexOf(checkin.value) == -1) {
            navigation.splice(2, 1)
            navigation.push(checkin.value);
            navigation.splice(3, 2)
            navigation.push(checkout.value);
            containName.innerHTML = navigation;
        }

        let citieNames = '';
        data.forEach(city => {
            citieNames = city.name;
            for (i in city.properties) {
                result.innerHTML += "";
                if (navigation[0] === citieNames && navigation[1] === city.properties[i].name) {
                    const result = document.querySelector("#result");
                    result.innerHTML = 
                        '<ul class="" id="result">' +
                        '<img src="./img/appt-rent.jpg" alt="">' +
                        '<h2>Yahoo!</h2>' +
                        '<li> City: ' + citieNames + '</li>' +
                        '<li>Appt: ' + city.properties[i].name + '</li>' +
                        '<li>Open Date: ' + city.properties[i]['opening-date'] + '</li></ul>';
                }
            };
        });
        
    });
}

renderData();

