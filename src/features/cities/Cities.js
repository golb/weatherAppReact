import './cities.css';

function Cities(props) {
    const cities = props.cities;

    const chooseCity = (e, city) => {
        const tag = e.target.tagName;
        if (tag === 'SPAN') {
            props.onRemoveCity(city);
        } else {
            props.onChooseCity(city);
        }
    };

    const makeFirstLetterUp = (city) => {
        return city.charAt(0).toUpperCase() + city.toLowerCase().slice(1);
    };

    const citiesList = cities.map((city) => 
        <div
            key={city}
            className="city"
            onClick={(e) => chooseCity(e, city)}>
                {makeFirstLetterUp(city)}
                <span>X</span>
        </div>
    );

    return (
        <>
            {cities.length ? (
                <div>
                    <h4>You've Searching Weather in Cities:</h4>
                    <div className="cities">
                        {citiesList}
                    </div>
                </div>
            ) : undefined}
        </>
    );
}

export default Cities;
