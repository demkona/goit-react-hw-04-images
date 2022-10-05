import { Oval } from 'react-loader-spinner'
import css from '../Loader/Loader.module.css'

export const Loader = () => {
    return (
        <div className={css.loader}>
            <Oval
                height={80}
                width={80}
                color="#3f51b5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#3f51b5"
                strokeWidth={5}
                strokeWidthSecondary={5}
            /></div>
    )
}
