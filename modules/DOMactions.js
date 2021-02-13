const _getDOMElem = id => {  // take every element which has id
return document.getElementById(id) 
}   

export const mapListToDOMElements = listOfId => { // map to viewElems object
    const _viewElems = {}

    for (const id of listOfId) { 
        _viewElems[id] = _getDOMElem(id); 

    }
    return _viewElems;
}

