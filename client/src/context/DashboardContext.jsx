import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "sonner";
import { getDashboard } from "../api/dashboard.api";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
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

            if (res.data.success) {
                let totalClicks = res.data.data.topCountries.reduce((acc, elem) => acc += elem.clicks, 0)
                let formattedTopCountries = res.data.data.topCountries.map((elem) => {
                    let clicksPercentage = (elem.clicks * 100) / totalClicks
                    return [elem.country, clicksPercentage.toFixed(2)]
                })
                setDashboard({ ...res.data.data, topCountries: formattedTopCountries })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load dashboard");
        }
    }

    useEffect(() => {
        getDashboardDetails();
    }, [user]);


    return (
        <DashboardContext.Provider
            value={{
                dashboard,
                getDashboardDetails
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);