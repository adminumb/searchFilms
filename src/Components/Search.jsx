import React, { useState } from "react";


const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");
//e.target-clicked element
 //e.currentTarget - parent element
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value); //устанавливаем значение поиска в searchValue
    }

    const resetInputField = () => {
        setSearchValue("") //очищаем поиск
    }

    const callSearchFunction = (e) => {
        e.preventDefault(); // отмена действия по умолчанию
        props.search(searchValue); //поиск
        resetInputField(); //очищение поля
    }

    return (
        <form className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    );
}

export default Search;