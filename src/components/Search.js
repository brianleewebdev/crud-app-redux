import React from 'react';
import styles from '../css/module/search.module.scss';

const Search = props => {
    
    return(
        <input type="text" name="search" className={styles.searchBar} placeholder="Search by name..." onChange={props.handleSearch} />
    )
}

export default Search;