
import { useEffect } from "react"
import { useRouter } from "next/router"
import localStorageServices from "../../helpers/local-storage-services"

const RouteAuthGuard = (WrappedComponent) => {

    const wrapper = (props) => {
        const router = useRouter();
        
        useEffect(() => {
            const user = localStorageServices.getValue()
            if (!user) {
                router.push("/login")
            }
        }, [])

        return <WrappedComponent {...props} />

    }
    return wrapper;
}

export default RouteAuthGuard;