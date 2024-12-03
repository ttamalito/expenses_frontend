import {BACKEND_URL} from "../../constants";

export const fetchUserDataPath = (username: string) => `${BACKEND_URL}/user/${username}`;