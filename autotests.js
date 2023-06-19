// автотест для запроса: https://api.hh.ru/employers

const jsonData = pm.response.json();
pm.test("Test data type of the response", () => {
  pm.expect(jsonData).to.be.an("object");
  pm.expect(jsonData.items[0].name).to.be.a("string");
  pm.expect(jsonData.items[0].open_vacancies).to.be.a("number");
  pm.expect(jsonData.items).to.be.an("array");
    pm.expect(jsonData.page).to.be.a("number");
});

// автотесты для запроса: https://api.hh.ru/employers/6017235

const jsonData = pm.response.json();

pm.test("Test array properties", () => {
  pm.expect(jsonData.relations).to.be.empty;
  pm.expect(jsonData.trusted).to.be.true
  });

pm.test("Value is in valid list", () => {
  pm.expect(jsonData.type).to.be.oneOf(["company", "employee"]);
});

pm.test("Object is contained", () => {
  const expectedObject = {
    "trusted": true,
    "relations": []
  };
  pm.expect(pm.response.json()).to.deep.include(expectedObject);
});

// автотесты для запроса: https://swapi.py4e.com/api/people/10

pm.environment.set("email", "anastasia.andruseva@gmail.com");
pm.globals.get("email");

pm.environment.unset("name");

pm.test("Person is Obi-Wan", () => {
  const responseJson = pm.response.json();
  pm.expect(responseJson.name).to.eql("Obi-Wan Kenobi");
  pm.expect(responseJson.homeworld).to.eql("https://swapi.py4e.com/api/planets/20/");
});

pm.test("Content-Type header is present", () => {
  pm.response.to.have.header("Content-Type");
});

pm.test("Content-Type header is application/json", () => {
  pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
});

// автотесты для запроса: https://swapi.py4e.com/api/planets/7

var schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        rotation_period: {
            type: 'string'
        },
        orbital_period: {
            type: 'string'
        },
        diameter: {
            type: 'string'
        },
        climate: {
            type: 'string'
        },
        gravity: {
            type: 'string'
        },
        terrain: {
            type: 'string'
        },
        surface_water: {
            type: 'string'
        },
        population: {
            type: 'string'
        },
        residents: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        films: {
            type: 'array',
            items: {
                type: 'string'
            },
        created: {
            type: 'string'
        },
        edited: {
            type: 'string'
        },
        url: {
            type: 'string'
        }
        }
    }
    
};

const jsonData = pm.response.json();

pm.test('Schema is valid', function () {
    pm.expect(tv4.validate(schema, schema)).to.be.true;
});

// автотесты для запроса: https://swapi.py4e.com/api/starships/5

pm.test("The response has all properties", () => {
    const responseJson = pm.response.json();
    pm.expect(responseJson.name).to.eql('Sentinel-class landing craft');
    pm.expect(responseJson.model).to.be.a('string');
    pm.expect(responseJson.pilots).to.be.a('array');
});

const responseJson = pm.response.json();
pm.test("Body contains string",() => {
  pm.expect(pm.response.text()).to.include("manufacturer");
});

pm.test("Response property matches environment variable", function () {
  pm.expect(pm.response.json().passengers).to.eql(pm.environment.get("passengers"));
});
