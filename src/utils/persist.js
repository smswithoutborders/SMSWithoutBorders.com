// functions to save and update redux store on refresh
import { getLocalState, setLocalState } from "services";
import { store, saveAuth, saveProfile, saveValidationCreds } from "features";

// save current state to local storage
export async function persistState() {
  setLocalState(store.getState());
}

/*
dispatch actions to rehydrate store
all apiSlice is ommited intentionally
*/
export async function hydrateState() {
  const localState = await getLocalState();
  const { auth, profile, validation } = localState;
  store.dispatch(saveAuth(auth));
  store.dispatch(saveProfile(profile));
  store.dispatch(saveValidationCreds(validation));
}
