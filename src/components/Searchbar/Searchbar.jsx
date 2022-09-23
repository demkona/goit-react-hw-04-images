import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = () => {
    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm}>
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                    className={css.SearchFormInput}
                    type="text"
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}