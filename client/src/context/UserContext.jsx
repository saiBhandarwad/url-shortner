import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "sonner";
import { getDashboard } from "../api/dashboard.api";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    const [dashboard, setDashboard] = useState({
        totalLinks: 0,
        activeLinks: 0,
        expiredLinks: 0,
        totalClicks: 0,
        todayClicks: 0,
        clicksOverTime: [],
        topCountries: [],
        recentLinks: [],
        topLinks: [],
    });

    async function getDashboardDetails() {
        if(!user){
            return
        }
        try {
            const res = await getDashboard();
            console.log({ res });

            if (res.data.success) {
                setDashboard(res.data.data);
                console.log({ res: res.data.data });

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load dashboard");
        }
    }

    useEffect(() => {
        getDashboardDetails();
    }, []);


    return (
        <UserContext.Provider
            value={{
                dashboard
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useDashboard = () => useContext(UserContext);