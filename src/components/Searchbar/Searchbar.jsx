import { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';


export function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('');

    const handleOnChang = (e) => {
        const query = e.currentTarget.value;
        setQuery(query);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
        setQuery('')
    };

    return (
        <header className={css.Searchbar} >
            <form onSubmit={handleOnSubmit} className={css.SearchForm}>
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                    onChange={handleOnChang}
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}


// export class Searchbar extends Component {
//     state = { query: " " };

//     handleOnChang = (e) => {
//         this.setState({
//             query: e.currentTarget.value
//         });
//     };

//     handleOnSubmit = (e) => {
//         e.preventDefault();
//         this.props.onSubmit(this.state.query);
//         this.setState({ query: " " });
//     };

//     render() {
//         return (
// <header className={css.Searchbar} >
//     <form onSubmit={this.handleOnSubmit} className={css.SearchForm}>
//         <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//         </button>
//         <input
//             onChange={this.handleOnChang}
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//         />
//     </form>
// </header>
//         )
//     }
// }

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};