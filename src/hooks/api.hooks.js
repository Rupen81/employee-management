import { useMutation } from "react-query"
import { addToFavCharacters, addToLikedCharacters } from "../services/api.services"

export const useAddToFavCharacters = (options) => {
    return useMutation(addToFavCharacters, options);
}
export const useAddtoLikeCharacters = (options) => {
    return useMutation(addToLikedCharacters, options);
}