import "../styles/globals.css"
import { wrapper } from "../config/store"
import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <Analytics />
        </Provider>
    )

}