import * as actions from './actionTypes';

export default function redux(state={},action)
{
    switch(action.type)
    {
        case actions.update_store:
            return action.payload; //obiect deja aranjat in formatul corespunzator de state
        default:
            return state;
    }
}

//Object format:
// local_time: ''
// location: ''
// humidity: ''
// country: ''
// main: ex 'Clouds'
// description: ex "scattered clouds"



