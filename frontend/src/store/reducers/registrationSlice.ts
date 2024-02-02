import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IInputChanges } from "../../interfaces";

export interface RegistrationState {
	login: string;
	password: string;
	firstName: string;
	secondName: string;
	// email:string
}

const initialState: RegistrationState = {
	login: "",
	password: "",
	firstName: "",
	secondName: "",
};

export const registrationSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		changeUserRegData(state, action: PayloadAction<IInputChanges>) {
			state[action.payload.name as keyof RegistrationState] = action.payload.value;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeUserRegData } = registrationSlice.actions;

export default registrationSlice.reducer;
