import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props){
    const [people, setPeople] = useState(null);

    const URL = "https://peeps101.herokuapp.com/people/";

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async person => {
        console.log(person)
        //Make a post request to create people
        await fetch (URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        //Update the list of people
        getPeople();
    };

    const updatePeople = async (person, id) => {
        // Make the put request to update a person 
        await fetch(URL + id, {
            method: "put",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        }) 
        // Update list of people
        getPeople()
    };

    const deletePeople = async id => {
        // Make a delete request
        await fetch(URL + id, {
            method: "delete",
        }) 
        // Update list of people
        getPeople()
    };
    
    useEffect(() => getPeople(), []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index people={people} createPeople={createPeople}/>
                </Route>
                <Route
                    path="/people/:id"
                    render={(rp) => (
                        <Show
                            people={people}
                            updatePeople={updatePeople}
                            deletePeople={deletePeople}
                            {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    );
  } 
  export default Main