import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    tenant: {
        tenant_id: null,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    },
    login: false,
};

const TenantAuthReducer = createSlice({
    name: "TenantAuthReducer",
    initialState,
    reducers: {
        setTenant: (state, action) => {
            console.log("action", action.payload);
            const { tenant_id, first_name, last_name, email, phone} = action.payload;
            state.tenant = { tenant_id, first_name, last_name, email, phone};
        },
        tenantLogin: (state, action) => {
            state.login = true;
        },
        tenantLogout: (state, action) => {
            state.login = false;
            localStorage.removeItem("token");
            setTimeout(() => {
                document.location.href = "/";
            }, 1000);
        }
    }})
    
    export const tenantRegist = (values, setIsLoading, toast) => {
        return async (dispatch) => {
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("id_card", values.id_card);
            formData.append("password", values.password);
            formData.append("confirm_password", values.confirm_password);
            
            try {
                setIsLoading(true);
                const respon = await axios.post(
                    `${URL_API}/auth/tenant`, formData,
                    {headers: {
                        "Content-Type": "multipart/form-data",
                    },}
                );
                setIsLoading(false)
                toast({
                    title: 'Success',
                    description: "You're successfully registered as a Tenant!",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setTimeout(() => {
                    document.location.href = "/";
                }, 500);
            } catch (error) {
                console.log(error);
                setIsLoading(false)
                toast({
                    title: 'Error',
                    description: error.response.data.error || error.response.data.errors[0].msg,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };
    };
    
export const { userLogin, userLogout } = TenantAuthReducer.actions;
export default TenantAuthReducer.reducer;